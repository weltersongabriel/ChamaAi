import pytest
from fastapi.testclient import TestClient
from app.models.user import User


class TestUsers:
    """Testes para funcionalidades de usuário autenticado"""

    def test_get_current_user_info(self, client: TestClient, auth_headers: dict, test_user: User):
        """GET /auth/me deve retornar informações do usuário autenticado."""
        response = client.get("/auth/me", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == test_user.id
        assert data["email"] == test_user.email
        assert data["name"] == test_user.name
        assert data["role"] == test_user.role

    def test_user_cannot_access_other_user_data(self, client: TestClient, auth_headers: dict, test_user2: User):
        """Usuário não deve conseguir acessar dados de outro usuário via /auth/me."""
        # /auth/me sempre retorna o usuário do token, não há endpoint para buscar outro usuário
        response = client.get("/auth/me", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        # Deve retornar o usuário do token (test_user), não test_user2
        assert data["id"] != test_user2.id
        assert data["email"] != test_user2.email

    def test_token_contains_correct_user_id(self, client: TestClient, auth_headers: dict, test_user: User):
        """Token deve conter o ID correto do usuário."""
        # Verifica indiretamente via /auth/me
        response = client.get("/auth/me", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["id"] == test_user.id

    def test_user_role_in_token(self, client: TestClient, auth_headers: dict, test_user: User):
        """Role do usuário deve estar presente no token e acessível."""
        response = client.get("/auth/me", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["role"] == "user"

    def test_invalid_token_rejected(self, client: TestClient, invalid_token: str):
        """Token com assinatura inválida deve ser rejeitado."""
        response = client.get("/auth/me", headers={"Authorization": f"Bearer {invalid_token}"})
        assert response.status_code == 401

    def test_malformed_token_rejected(self, client: TestClient):
        """Token malformado deve ser rejeitado."""
        response = client.get("/auth/me", headers={"Authorization": "Bearer token.invalido.aqui"})
        assert response.status_code == 401

    def test_empty_token_rejected(self, client: TestClient):
        """Token vazio deve ser rejeitado."""
        response = client.get("/auth/me", headers={"Authorization": "Bearer "})
        assert response.status_code == 401

    def test_missing_authorization_header(self, client: TestClient):
        """Header Authorization ausente deve retornar 401."""
        response = client.get("/auth/me")
        assert response.status_code == 401


# Import necessário para type hints
from app.models.user import User