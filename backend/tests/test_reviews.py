import pytest
from fastapi.testclient import TestClient
from app.models.user import User
from app.models.provider import Provider


class TestReviewsCreate:
    """Testes para POST /reviews"""

    def test_create_review_success(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Criação de avaliação válida deve retornar 200."""
        response = client.post(
            "/reviews",
            json={
                "provider_id": test_provider.id,
                "rating": 5,
                "comment": "Excelente profissional!",
            },
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Avaliação criada com sucesso."
        assert "review" in data
        assert data["review"]["provider_id"] == test_provider.id
        assert data["review"]["rating"] == 5
        assert data["review"]["comment"] == "Excelente profissional!"
        assert "id" in data["review"]

    def test_create_review_nonexistent_provider(self, client: TestClient, auth_headers: dict):
        """Avaliação para prestador inexistente deve retornar 400."""
        response = client.post(
            "/reviews",
            json={
                "provider_id": 99999,
                "rating": 5,
                "comment": "Comentário",
            },
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert response.json()["detail"] == "Prestador de serviço não encontrado."

    def test_create_review_duplicate(self, client: TestClient, auth_headers: dict, test_provider: Provider, test_user: User, db_session):
        """Usuário não pode avaliar o mesmo prestador duas vezes."""
        # Cria primeira avaliação
        from app.models.review import Review
        review = Review(
            provider_id=test_provider.id,
            user_id=test_user.id,
            rating=4,
            comment="Primeira avaliação",
        )
        db_session.add(review)
        db_session.commit()

        # Tenta criar segunda avaliação
        response = client.post(
            "/reviews",
            json={
                "provider_id": test_provider.id,
                "rating": 5,
                "comment": "Segunda avaliação",
            },
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "já avaliou" in response.json()["detail"].lower()

    def test_create_review_invalid_rating_high(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Rating acima de 5 deve retornar 422."""
        response = client.post(
            "/reviews",
            json={
                "provider_id": test_provider.id,
                "rating": 6,
                "comment": "Comentário",
            },
            headers=auth_headers,
        )
        assert response.status_code == 422

    def test_create_review_invalid_rating_low(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Rating abaixo de 1 deve retornar 422."""
        response = client.post(
            "/reviews",
            json={
                "provider_id": test_provider.id,
                "rating": 0,
                "comment": "Comentário",
            },
            headers=auth_headers,
        )
        assert response.status_code == 422

    def test_create_review_missing_fields(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Avaliação sem campos obrigatórios deve retornar 422."""
        response = client.post(
            "/reviews",
            json={
                "provider_id": test_provider.id,
                # rating faltando
                "comment": "Comentário",
            },
            headers=auth_headers,
        )
        assert response.status_code == 422

    def test_create_review_unauthorized(self, client: TestClient, test_provider: Provider):
        """Avaliação sem autenticação deve retornar 401."""
        response = client.post(
            "/reviews",
            json={
                "provider_id": test_provider.id,
                "rating": 5,
                "comment": "Comentário",
            },
        )
        assert response.status_code == 401


class TestReviewsGetMyReviews:
    """Testes para GET /reviews/me"""

    def test_get_my_reviews_success(self, client: TestClient, auth_headers: dict, test_user: User, test_provider: Provider, db_session):
        """Listagem das próprias avaliações deve funcionar."""
        # Cria uma avaliação primeiro
        from app.models.review import Review
        review = Review(
            provider_id=test_provider.id,
            user_id=test_user.id,
            rating=5,
            comment="Minha avaliação",
        )
        db_session.add(review)
        db_session.commit()

        response = client.get("/reviews/me", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        assert data[0]["provider_id"] == test_provider.id
        assert data[0]["rating"] == 5
        assert data[0]["comment"] == "Minha avaliação"
        assert "id" in data[0]

    def test_get_my_reviews_empty(self, client: TestClient, auth_headers: dict):
        """Usuário sem avaliações deve receber lista vazia."""
        response = client.get("/reviews/me", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data == []

    def test_get_my_reviews_unauthorized(self, client: TestClient):
        """Listagem sem autenticação deve retornar 401."""
        response = client.get("/reviews/me")
        assert response.status_code == 401


class TestReviewsGetByProvider:
    """Testes para GET /reviews/provider/{provider_id}"""

    def test_get_reviews_by_provider_success(self, client: TestClient, test_provider: Provider, test_user: User, db_session):
        """Listagem de avaliações de um prestador deve funcionar (público)."""
        # Cria uma avaliação
        from app.models.review import Review
        review = Review(
            provider_id=test_provider.id,
            user_id=test_user.id,
            rating=4,
            comment="Avaliação pública",
        )
        db_session.add(review)
        db_session.commit()

        response = client.get(f"/reviews/provider/{test_provider.id}")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        # A API retorna user_id, não provider_id
        assert data[0]["user_id"] == test_user.id
        assert data[0]["rating"] == 4
        assert data[0]["comment"] == "Avaliação pública"
        assert "user_id" in data[0]

    def test_get_reviews_by_provider_empty(self, client: TestClient, test_provider: Provider):
        """Prestador sem avaliações deve retornar lista vazia."""
        response = client.get(f"/reviews/provider/{test_provider.id}")
        assert response.status_code == 200
        data = response.json()
        assert data == []

    def test_get_reviews_by_nonexistent_provider(self, client: TestClient):
        """Avaliações de prestador inexistente devem retornar lista vazia (não 404)."""
        response = client.get("/reviews/provider/99999")
        assert response.status_code == 200
        data = response.json()
        assert data == []


# Import necessário para type hints
from app.models.user import User
from app.models.provider import Provider