import pytest
from fastapi.testclient import TestClient
from app.models.user import User
from app.models.provider import Provider


class TestFavoritesCreate:
    """Testes para POST /favorites"""

    def test_add_favorite_success(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Adicionar prestador aos favoritos deve retornar 200."""
        response = client.post(
            "/favorites",
            json={"provider_id": test_provider.id},
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Prestador de serviço adicionado aos favoritos."

    def test_add_favorite_nonexistent_provider(self, client: TestClient, auth_headers: dict):
        """Adicionar prestador inexistente aos favoritos deve retornar 404."""
        response = client.post(
            "/favorites",
            json={"provider_id": 99999},
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert response.json()["detail"] == "Prestador de serviço não encontrado."

    def test_add_favorite_duplicate(self, client: TestClient, auth_headers: dict, test_provider: Provider, test_user: User, db_session):
        """Não deve permitir duplicar favorito."""
        # Cria primeiro favorito
        from app.models.favorite import Favorite
        favorite = Favorite(user_id=test_user.id, provider_id=test_provider.id)
        db_session.add(favorite)
        db_session.commit()

        # Tenta adicionar novamente
        response = client.post(
            "/favorites",
            json={"provider_id": test_provider.id},
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "já está nos favoritos" in response.json()["detail"].lower()

    def test_add_favorite_missing_provider_id(self, client: TestClient, auth_headers: dict):
        """Adicionar favorito sem provider_id deve retornar 422."""
        response = client.post("/favorites", json={}, headers=auth_headers)
        assert response.status_code == 422

    def test_add_favorite_unauthorized(self, client: TestClient, test_provider: Provider):
        """Adicionar favorito sem autenticação deve retornar 401."""
        response = client.post("/favorites", json={"provider_id": test_provider.id})
        assert response.status_code == 401


class TestFavoritesList:
    """Testes para GET /favorites"""

    def test_list_favorites_success(self, client: TestClient, auth_headers: dict, test_user: User, test_provider: Provider, db_session):
        """Listagem de favoritos deve retornar dados completos."""
        # Cria favorito
        from app.models.favorite import Favorite
        favorite = Favorite(user_id=test_user.id, provider_id=test_provider.id)
        db_session.add(favorite)
        db_session.commit()

        response = client.get("/favorites", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        fav = data[0]
        assert "favorite_id" in fav
        assert "provider_id" in fav
        assert "nome" in fav
        assert "categoria" in fav
        assert "cidade" in fav
        assert "estado" in fav
        assert "status" in fav
        assert fav["provider_id"] == test_provider.id

    def test_list_favorites_empty(self, client: TestClient, auth_headers: dict):
        """Usuário sem favoritos deve receber lista vazia."""
        response = client.get("/favorites", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data == []

    def test_list_favorites_unauthorized(self, client: TestClient):
        """Listagem sem autenticação deve retornar 401."""
        response = client.get("/favorites")
        assert response.status_code == 401

    def test_list_favorites_isolated_per_user(self, client: TestClient, auth_headers: dict, auth_headers_user2: dict, test_user: User, test_user2: User, test_provider: Provider, db_session):
        """Favoritos devem ser isolados por usuário."""
        # Usuário 1 adiciona favorito
        from app.models.favorite import Favorite
        favorite = Favorite(user_id=test_user.id, provider_id=test_provider.id)
        db_session.add(favorite)
        db_session.commit()

        # Usuário 1 deve ver o favorito
        response1 = client.get("/favorites", headers=auth_headers)
        assert response1.status_code == 200
        assert len(response1.json()) == 1

        # Usuário 2 não deve ver o favorito do usuário 1
        response2 = client.get("/favorites", headers=auth_headers_user2)
        assert response2.status_code == 200
        assert response2.json() == []


class TestFavoritesDelete:
    """Testes para DELETE /favorites/{favorite_id}"""

    def test_delete_favorite_success(self, client: TestClient, auth_headers: dict, test_user: User, test_provider: Provider, db_session):
        """Remoção de favorito deve funcionar."""
        # Cria favorito
        from app.models.favorite import Favorite
        favorite = Favorite(user_id=test_user.id, provider_id=test_provider.id)
        db_session.add(favorite)
        db_session.commit()
        db_session.refresh(favorite)

        response = client.delete(f"/favorites/{favorite.id}", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["message"] == "Prestador de serviço removido dos favoritos."

        # Verifica se foi removido
        response_list = client.get("/favorites", headers=auth_headers)
        assert response_list.json() == []

    def test_delete_favorite_not_found(self, client: TestClient, auth_headers: dict):
        """Remoção de favorito inexistente deve retornar 404."""
        response = client.delete("/favorites/99999", headers=auth_headers)
        assert response.status_code == 404
        assert response.json()["detail"] == "Favorito não encontrado."

    def test_delete_favorite_forbidden(self, client: TestClient, auth_headers_user2: dict, test_user: User, test_provider: Provider, db_session):
        """Usuário não pode remover favorito de outro usuário."""
        # Cria favorito para test_user
        from app.models.favorite import Favorite
        favorite = Favorite(user_id=test_user.id, provider_id=test_provider.id)
        db_session.add(favorite)
        db_session.commit()
        db_session.refresh(favorite)

        # test_user2 tenta remover
        response = client.delete(f"/favorites/{favorite.id}", headers=auth_headers_user2)
        assert response.status_code == 404  # Não encontra porque filtra por user_id
        assert response.json()["detail"] == "Favorito não encontrado."

    def test_delete_favorite_unauthorized(self, client: TestClient, test_user: User, test_provider: Provider, db_session):
        """Remoção sem autenticação deve retornar 401."""
        from app.models.favorite import Favorite
        favorite = Favorite(user_id=test_user.id, provider_id=test_provider.id)
        db_session.add(favorite)
        db_session.commit()
        db_session.refresh(favorite)

        response = client.delete(f"/favorites/{favorite.id}")
        assert response.status_code == 401


# Import necessário para type hints
from app.models.user import User
from app.models.provider import Provider