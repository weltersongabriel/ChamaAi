import pytest
from fastapi.testclient import TestClient
from app.models.user import User
from app.models.category import Category
from app.models.provider import Provider


class TestProvidersCreate:
    """Testes para POST /providers"""

    def test_create_provider_success(self, client: TestClient, auth_headers: dict, test_category: Category):
        """Criação de prestador com dados válidos deve retornar 200."""
        response = client.post(
            "/providers",
            json={
                "nome": "Novo Prestador",
                "bio": "Bio do prestador",
                "category_id": test_category.id,
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": "5511999999999",
            },
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Perfil profissional criado com sucesso."
        assert "provider" in data
        assert data["provider"]["nome"] == "Novo Prestador"
        assert data["provider"]["cidade"] == "São Paulo"
        assert data["provider"]["status"] == "ativo"

    def test_create_provider_nonexistent_category(self, client: TestClient, auth_headers: dict):
        """Criação com categoria inexistente deve retornar 400."""
        response = client.post(
            "/providers",
            json={
                "nome": "Prestador",
                "bio": "Bio",
                "category_id": 99999,  # categoria inexistente
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": "5511999999999",
            },
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert response.json()["detail"] == "Categoria não encontrada."

    def test_create_provider_duplicate_for_user(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Usuário não pode criar dois perfis de prestador."""
        response = client.post(
            "/providers",
            json={
                "nome": "Outro Prestador",
                "bio": "Bio",
                "category_id": test_provider.category_id,
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": "5511888888888",
            },
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert response.json()["detail"] == "Usuário já possui perfil profissional."

    def test_create_provider_missing_fields(self, client: TestClient, auth_headers: dict):
        """Criação sem campos obrigatórios deve retornar 422."""
        response = client.post(
            "/providers",
            json={
                "nome": "Prestador",
                # bio faltando
                "category_id": 1,
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": "5511999999999",
            },
            headers=auth_headers,
        )
        assert response.status_code == 422

    def test_create_provider_unauthorized(self, client: TestClient, test_category: Category):
        """Criação sem autenticação deve retornar 401."""
        response = client.post(
            "/providers",
            json={
                "nome": "Prestador",
                "bio": "Bio",
                "category_id": test_category.id,
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": "5511999999999",
            },
        )
        assert response.status_code == 401


class TestProvidersList:
    """Testes para GET /providers"""

    def test_list_providers_success(self, client: TestClient, test_provider: Provider, test_provider2: Provider):
        """Listagem de prestadores deve retornar lista paginada."""
        response = client.get("/providers")
        assert response.status_code == 200
        data = response.json()
        assert "total" in data
        assert "page" in data
        assert "limit" in data
        assert "data" in data
        assert isinstance(data["data"], list)
        assert data["total"] >= 2
        # Verifica estrutura dos itens
        provider_data = data["data"][0]
        assert "id" in provider_data
        assert "nome" in provider_data
        assert "bio" in provider_data
        assert "categoria" in provider_data
        assert "cidade" in provider_data
        assert "estado" in provider_data
        assert "status" in provider_data
        assert "whatsapp" in provider_data
        assert "media_avaliacoes" in provider_data
        assert "total_avaliacoes" in provider_data

    def test_list_providers_filter_by_category(self, client: TestClient, test_provider: Provider):
        """Filtro por categoria deve funcionar."""
        response = client.get(f"/providers?categoria={test_provider.category.name}")
        assert response.status_code == 200
        data = response.json()
        # Pelo menos o test_provider deve aparecer
        assert any(p["id"] == test_provider.id for p in data["data"])

    def test_list_providers_filter_by_city(self, client: TestClient, test_provider: Provider):
        """Filtro por cidade deve funcionar."""
        response = client.get(f"/providers?cidade={test_provider.cidade}")
        assert response.status_code == 200
        data = response.json()
        assert any(p["id"] == test_provider.id for p in data["data"])

    def test_list_providers_filter_by_status(self, client: TestClient, test_provider: Provider):
        """Filtro por status deve funcionar."""
        response = client.get(f"/providers?status=ativo")
        assert response.status_code == 200
        data = response.json()
        assert any(p["id"] == test_provider.id for p in data["data"])

    def test_list_providers_pagination(self, client: TestClient, test_provider: Provider, test_provider2: Provider):
        """Paginação deve funcionar corretamente."""
        response = client.get("/providers?page=1&limit=1")
        assert response.status_code == 200
        data = response.json()
        assert data["page"] == 1
        assert data["limit"] == 1
        assert len(data["data"]) == 1

    def test_list_providers_invalid_page(self, client: TestClient):
        """Página inválida deve retornar 422."""
        response = client.get("/providers?page=0")
        assert response.status_code == 422

    def test_list_providers_invalid_limit(self, client: TestClient):
        """Limite inválido deve retornar 422."""
        response = client.get("/providers?limit=101")
        assert response.status_code == 422


class TestProvidersGetById:
    """Testes para GET /providers/{provider_id}"""

    def test_get_provider_by_id_success(self, client: TestClient, test_provider: Provider):
        """Busca de prestador por ID deve retornar dados completos."""
        response = client.get(f"/providers/{test_provider.id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == test_provider.id
        # A API retorna o nome do usuário, não o nome do prestador
        assert data["nome"] == test_provider.user.name
        assert data["bio"] == test_provider.bio
        assert data["cidade"] == test_provider.cidade
        assert data["estado"] == test_provider.estado
        assert data["whatsapp"] == test_provider.whatsapp
        assert "media_avaliacoes" in data
        assert "total_avaliacoes" in data

    def test_get_provider_nonexistent(self, client: TestClient):
        """Busca de prestador inexistente deve retornar 404."""
        response = client.get("/providers/99999")
        assert response.status_code == 404
        assert response.json()["detail"] == "Prestador não encontrado"


class TestProvidersUpdate:
    """Testes para PUT /providers/{provider_id}"""

    def test_update_provider_success(self, client: TestClient, auth_headers: dict, test_provider: Provider, test_category: Category):
        """Atualização de próprio perfil deve funcionar."""
        response = client.put(
            f"/providers/{test_provider.id}",
            json={
                "nome": "Nome Atualizado",
                "bio": "Bio atualizada",
                "category_id": test_category.id,
                "cidade": "Nova Cidade",
                "estado": "NC",
                "whatsapp": "5511888888888",
            },
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Perfil atualizado com sucesso"
        assert data["provider"]["nome"] == "Nome Atualizado"
        assert data["provider"]["cidade"] == "Nova Cidade"

    def test_update_provider_forbidden(self, client: TestClient, auth_headers_user2: dict, test_provider: Provider, test_category: Category):
        """Usuário não pode atualizar perfil de outro prestador."""
        response = client.put(
            f"/providers/{test_provider.id}",
            json={
                "nome": "Tentativa",
                "bio": "Bio",
                "category_id": test_category.id,
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": "5511999999999",
            },
            headers=auth_headers_user2,
        )
        assert response.status_code == 403
        assert "permissão" in response.json()["detail"].lower()

    def test_update_provider_nonexistent(self, client: TestClient, auth_headers: dict, test_category: Category):
        """Atualização de prestador inexistente deve retornar 404."""
        response = client.put(
            "/providers/99999",
            json={
                "nome": "Teste",
                "bio": "Bio",
                "category_id": test_category.id,
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": "5511999999999",
            },
            headers=auth_headers,
        )
        assert response.status_code == 404

    def test_update_provider_invalid_category(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Atualização com categoria inexistente deve retornar 404."""
        response = client.put(
            f"/providers/{test_provider.id}",
            json={
                "nome": "Teste",
                "bio": "Bio",
                "category_id": 99999,
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": "5511999999999",
            },
            headers=auth_headers,
        )
        assert response.status_code == 404
        assert response.json()["detail"] == "Categoria não encontrada"

    def test_update_provider_unauthorized(self, client: TestClient, test_provider: Provider, test_category: Category):
        """Atualização sem autenticação deve retornar 401."""
        response = client.put(
            f"/providers/{test_provider.id}",
            json={
                "nome": "Teste",
                "bio": "Bio",
                "category_id": test_category.id,
                "cidade": "São Paulo",
                "estado": "SP",
                "whatsapp": "5511999999999",
            },
        )
        assert response.status_code == 401


class TestProvidersStatus:
    """Testes para PATCH /providers/{provider_id}/status"""

    def test_update_status_success(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Atualização de status do próprio perfil deve funcionar."""
        response = client.patch(
            f"/providers/{test_provider.id}/status",
            json={"status": "inativo"},
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["message"] == "Status atualizado com sucesso."
        assert data["status"] == "inativo"

    def test_update_status_invalid(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Status inválido deve retornar 400."""
        response = client.patch(
            f"/providers/{test_provider.id}/status",
            json={"status": "inexistente"},
            headers=auth_headers,
        )
        assert response.status_code == 400
        assert "inválido" in response.json()["detail"].lower()

    def test_update_status_forbidden(self, client: TestClient, auth_headers_user2: dict, test_provider: Provider):
        """Usuário não pode alterar status de outro prestador."""
        response = client.patch(
            f"/providers/{test_provider.id}/status",
            json={"status": "inativo"},
            headers=auth_headers_user2,
        )
        assert response.status_code == 403


class TestProvidersDelete:
    """Testes para DELETE /providers/{provider_id}"""

    def test_delete_provider_success(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Exclusão do próprio perfil deve funcionar."""
        response = client.delete(f"/providers/{test_provider.id}", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["message"] == "Prestador excluído com sucesso."

    def test_delete_provider_forbidden(self, client: TestClient, auth_headers_user2: dict, test_provider: Provider):
        """Usuário não pode excluir perfil de outro prestador."""
        response = client.delete(f"/providers/{test_provider.id}", headers=auth_headers_user2)
        assert response.status_code == 403

    def test_delete_provider_nonexistent(self, client: TestClient, auth_headers: dict):
        """Exclusão de prestador inexistente deve retornar 404."""
        response = client.delete("/providers/99999", headers=auth_headers)
        assert response.status_code == 404


class TestProvidersMe:
    """Testes para GET /providers/me"""

    def test_get_my_provider_success(self, client: TestClient, auth_headers: dict, test_provider: Provider):
        """Busca do próprio perfil deve retornar dados completos."""
        response = client.get("/providers/me", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == test_provider.id
        assert data["nome"] == test_provider.nome
        assert "media_avaliacoes" in data
        assert "total_avaliacoes" in data

    def test_get_my_provider_not_found(self, client: TestClient, auth_headers_user2: dict):
        """Usuário sem perfil de prestador deve receber 404."""
        # test_user2 não tem perfil de prestador
        response = client.get("/providers/me", headers=auth_headers_user2)
        assert response.status_code == 404
        assert "perfil profissional" in response.json()["detail"].lower()

    def test_get_my_provider_unauthorized(self, client: TestClient):
        """Busca sem autenticação deve retornar 401."""
        response = client.get("/providers/me")
        assert response.status_code == 401


# Import necessário para type hints
from app.models.user import User
from app.models.category import Category
from app.models.provider import Provider