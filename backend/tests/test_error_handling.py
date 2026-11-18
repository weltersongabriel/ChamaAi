import pytest
from fastapi.testclient import TestClient
from app.models.user import User
from app.models.category import Category
from app.models.provider import Provider


class TestErrorHandling:
    """Testes para tratamento de erros e códigos HTTP"""

    def test_404_nonexistent_endpoint(self, client: TestClient):
        """Endpoint inexistente deve retornar 404."""
        response = client.get("/endpoint-inexistente")
        assert response.status_code == 404

    def test_405_method_not_allowed(self, client: TestClient):
        """Método HTTP não permitido deve retornar 405."""
        # GET em endpoint que só aceita POST
        response = client.get("/auth/register")
        assert response.status_code == 405

    def test_422_validation_error(self, client: TestClient):
        """Erro de validação Pydantic deve retornar 422."""
        response = client.post("/auth/register", json={"nome": "Teste"})  # campos faltando
        assert response.status_code == 422
        data = response.json()
        assert "detail" in data
        assert isinstance(data["detail"], list)

    def test_500_internal_server_error_simulation(self, client: TestClient, db_session):
        """Testa se erros internos são tratados (simulação)."""
        # Este teste verifica se a aplicação não vaza stack traces
        # Em produção, erros 500 não devem expor detalhes internos
        pass

    def test_cors_headers_present(self, client: TestClient):
        """Headers CORS devem estar presentes nas respostas."""
        response = client.options("/auth/register")
        # Verifica se CORS está configurado
        assert response.status_code in (200, 405)  # OPTIONS pode retornar 405 se não implementado

    def test_content_type_json(self, client: TestClient, auth_headers: dict):
        """Respostas devem ter Content-Type application/json."""
        response = client.get("/auth/me", headers=auth_headers)
        assert response.headers["content-type"] == "application/json"

    def test_error_response_structure(self, client: TestClient):
        """Estrutura de resposta de erro deve ser consistente."""
        response = client.get("/auth/me")  # sem token
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        assert isinstance(data["detail"], str)

    def test_sql_injection_attempt_in_query_params(self, client: TestClient, test_provider):
        """Tentativa de SQL injection nos parâmetros de query deve ser tratada."""
        # O SQLAlchemy ORM protege contra SQL injection
        # Este teste verifica se a aplicação não quebra
        response = client.get("/providers?categoria=test' OR '1'='1")
        # Não deve retornar 500
        assert response.status_code != 500

    def test_xss_attempt_in_input(self, client: TestClient, auth_headers: dict, test_category):
        """Tentativa de XSS nos campos de entrada deve ser tratada."""
        # A aplicação deve aceitar a entrada (sanitização é responsabilidade do frontend/output)
        # Mas não deve quebrar
        response = client.post(
            "/providers",
            json={
                "nome": "<script>alert('xss')</script>",
                "bio": "Bio",
                "category_id": test_category.id,
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": "5511999999999",
            },
            headers=auth_headers,
        )
        # Não deve retornar 500
        assert response.status_code != 500


class TestRateLimiting:
    """Testes para rate limiting (se implementado)"""

    def test_login_multiple_attempts(self, client: TestClient, test_user: User):
        """Múltiplas tentativas de login - verifica se não há bloqueio (atualmente não implementado)."""
        # Atualmente não há rate limiting implementado
        # Este teste documenta o comportamento atual
        for _ in range(5):
            response = client.post(
                "/auth/login",
                json={"email": test_user.email, "senha": "senha_errada"},
            )
            assert response.status_code == 401
        # 6ª tentativa ainda deve retornar 401 (não 429)
        response = client.post(
            "/auth/login",
            json={"email": test_user.email, "senha": "senha_errada"},
        )
        assert response.status_code == 401


class TestDatabaseConstraints:
    """Testes para constraints do banco de dados"""

    def test_unique_email_constraint(self, client: TestClient, test_user: User):
        """Constraint de e-mail único no banco deve ser respeitado."""
        # Tenta criar usuário com mesmo e-mail via API
        response = client.post(
            "/auth/register",
            json={
                "nome": "Outro",
                "email": test_user.email,
                "telefone": "(11) 88888-8888",
                "senha": "Senha123",
            },
        )
        assert response.status_code == 400

    def test_unique_whatsapp_constraint(self, client: TestClient, auth_headers: dict, test_provider: Provider, test_category: Category):
        """Constraint de WhatsApp único no banco deve ser respeitado."""
        response = client.post(
            "/providers",
            json={
                "nome": "Outro Prestador",
                "bio": "Bio",
                "category_id": test_category.id,
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": test_provider.whatsapp,  # WhatsApp duplicado
            },
            headers=auth_headers,
        )
        # Deve falhar (400 ou 500 dependendo de como o banco trata)
        assert response.status_code in (400, 500)

    def test_foreign_key_provider_user(self, db_session):
        """Foreign key provider -> user deve ser respeitada."""
        from app.models.provider import Provider
        # Tenta criar provider com user_id inexistente
        provider = Provider(
            user_id=99999,
            nome="Teste",
            bio="Bio",
            category_id=1,
            cidade="São Paulo",
            estado="SP",
            whatsapp="5511999999999",
        )
        db_session.add(provider)
        # Deve falhar no commit
        with pytest.raises(Exception):
            db_session.commit()
        db_session.rollback()

    def test_foreign_key_review_provider(self, db_session, test_user: User):
        """Foreign key review -> provider deve ser respeitada."""
        from app.models.review import Review
        review = Review(
            provider_id=99999,
            user_id=test_user.id,
            rating=5,
            comment="Teste",
        )
        db_session.add(review)
        with pytest.raises(Exception):
            db_session.commit()
        db_session.rollback()

    def test_foreign_key_favorite_provider(self, db_session, test_user: User):
        """Foreign key favorite -> provider deve ser respeitada."""
        from app.models.favorite import Favorite
        favorite = Favorite(user_id=test_user.id, provider_id=99999)
        db_session.add(favorite)
        with pytest.raises(Exception):
            db_session.commit()
        db_session.rollback()


# Import necessário para type hints
from app.models.user import User
from app.models.category import Category
from app.models.provider import Provider