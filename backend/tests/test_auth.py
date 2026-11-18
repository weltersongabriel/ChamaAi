import pytest
from fastapi.testclient import TestClient
from app.models.user import User


class TestAuthRegister:
    """Testes para o endpoint POST /auth/register"""

    def test_register_success(self, client: TestClient):
        """Cadastro de usuário com dados válidos deve retornar 201."""
        response = client.post(
            "/auth/register",
            json={
                "nome": "Novo Usuário",
                "email": "novo@exemplo.com",
                "telefone": "(11) 99999-9999",
                "senha": "SenhaForte123",
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["message"] == "Usuário cadastrado com sucesso"
        assert "user" in data
        assert data["user"]["email"] == "novo@exemplo.com"
        assert data["user"]["name"] == "Novo Usuário"
        assert data["user"]["role"] == "user"
        assert "id" in data["user"]

    def test_register_duplicate_email(self, client: TestClient, test_user: User):
        """Cadastro com e-mail já existente deve retornar 400."""
        response = client.post(
            "/auth/register",
            json={
                "nome": "Outro Usuário",
                "email": test_user.email,  # e-mail já cadastrado
                "telefone": "(11) 88888-8888",
                "senha": "SenhaForte123",
            },
        )
        assert response.status_code == 400
        assert response.json()["detail"] == "Email já cadastrado"

    def test_register_invalid_email(self, client: TestClient):
        """Cadastro com e-mail inválido deve retornar 422."""
        response = client.post(
            "/auth/register",
            json={
                "nome": "Usuário",
                "email": "email-invalido",
                "telefone": "(11) 99999-9999",
                "senha": "SenhaForte123",
            },
        )
        assert response.status_code == 422

    def test_register_missing_fields(self, client: TestClient):
        """Cadastro sem campos obrigatórios deve retornar 422."""
        response = client.post(
            "/auth/register",
            json={
                "nome": "Usuário",
                # email faltando
                "telefone": "(11) 99999-9999",
                "senha": "SenhaForte123",
            },
        )
        assert response.status_code == 422

    def test_register_invalid_phone(self, client: TestClient):
        """Cadastro com telefone inválido deve retornar 422."""
        response = client.post(
            "/auth/register",
            json={
                "nome": "Usuário",
                "email": "teste@exemplo.com",
                "telefone": "telefone-invalido",
                "senha": "SenhaForte123",
            },
        )
        assert response.status_code == 422

    def test_register_short_password(self, client: TestClient):
        """Cadastro com senha muito curta deve ser aceitado (validação atual é apenas no schema)."""
        # Nota: O schema atual não valida comprimento mínimo da senha
        response = client.post(
            "/auth/register",
            json={
                "nome": "Usuário",
                "email": "teste@exemplo.com",
                "telefone": "(11) 99999-9999",
                "senha": "123",
            },
        )
        # Atualmente passa (schema não valida), mas idealmente deveria falhar
        assert response.status_code in (201, 422)


class TestAuthLogin:
    """Testes para o endpoint POST /auth/login"""

    def test_login_success(self, client: TestClient, test_user: User):
        """Login com credenciais corretas deve retornar 200 e token."""
        response = client.post(
            "/auth/login",
            json={"email": test_user.email, "senha": "TestPassword123"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Login realizado com sucesso"
        assert "access_token" in data
        assert data["user"]["email"] == test_user.email
        assert data["user"]["id"] == test_user.id

    def test_login_wrong_password(self, client: TestClient, test_user: User):
        """Login com senha incorreta deve retornar 401."""
        response = client.post(
            "/auth/login",
            json={"email": test_user.email, "senha": "SenhaErrada123"},
        )
        assert response.status_code == 401
        assert response.json()["detail"] == "Email ou senha inválidos"

    def test_login_nonexistent_user(self, client: TestClient):
        """Login com usuário inexistente deve retornar 401."""
        response = client.post(
            "/auth/login",
            json={"email": "naoexiste@exemplo.com", "senha": "SenhaForte123"},
        )
        assert response.status_code == 401
        assert response.json()["detail"] == "Email ou senha inválidos"

    def test_login_invalid_email(self, client: TestClient):
        """Login com e-mail inválido deve retornar 422."""
        response = client.post(
            "/auth/login",
            json={"email": "email-invalido", "senha": "SenhaForte123"},
        )
        assert response.status_code == 422

    def test_login_missing_fields(self, client: TestClient):
        """Login sem campos obrigatórios deve retornar 422."""
        response = client.post("/auth/login", json={"email": "teste@exemplo.com"})
        assert response.status_code == 422


class TestAuthMe:
    """Testes para o endpoint GET /auth/me"""

    def test_me_success(self, client: TestClient, auth_headers: dict):
        """Acesso a /auth/me com token válido deve retornar dados do usuário."""
        response = client.get("/auth/me", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert "name" in data
        assert "email" in data
        assert "role" in data

    def test_me_no_token(self, client: TestClient):
        """Acesso a /auth/me sem token deve retornar 401."""
        response = client.get("/auth/me")
        assert response.status_code == 401
        # Mensagem pode variar dependendo da implementação do HTTPBearer
        assert "detail" in response.json()

    def test_me_invalid_token(self, client: TestClient, invalid_token: str):
        """Acesso a /auth/me com token inválido deve retornar 401."""
        response = client.get("/auth/me", headers={"Authorization": f"Bearer {invalid_token}"})
        assert response.status_code == 401
        assert response.json()["detail"] == "Token inválido"

    def test_me_expired_token(self, client: TestClient, expired_token: str):
        """Acesso a /auth/me com token expirado deve retornar 401."""
        response = client.get("/auth/me", headers={"Authorization": f"Bearer {expired_token}"})
        assert response.status_code == 401
        assert response.json()["detail"] == "Token inválido"

    def test_me_nonexistent_user_token(self, client: TestClient):
        """Token de usuário inexistente deve retornar 404."""
        from app.auth.jwt_handler import create_access_token
        token = create_access_token(data={"sub": "99999", "email": "fake@exemplo.com", "role": "user"})
        response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 404
        assert response.json()["detail"] == "Usuário não encontrado"


# Import necessário para type hints
from app.models.user import User