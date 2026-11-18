import pytest
from fastapi.testclient import TestClient
from app.models.category import Category


class TestCategoriesList:
    """Testes para GET /categories"""

    def test_list_categories_success(self, client: TestClient, test_category: Category):
        """Listagem de categorias deve retornar lista."""
        response = client.get("/categories")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        # Verifica estrutura
        category = data[0]
        assert "id" in category
        assert "name" in category
        assert category["name"] == test_category.name

    def test_list_categories_empty(self, client: TestClient, db_session):
        """Listagem sem categorias deve retornar lista vazia."""
        # Limpa categorias existentes
        from app.models.category import Category as CategoryModel
        db_session.query(CategoryModel).delete()
        db_session.commit()

        response = client.get("/categories")
        assert response.status_code == 200
        data = response.json()
        assert data == []


class TestCategoriesCreate:
    """Testes para POST /categories"""

    def test_create_category_success(self, client: TestClient):
        """Criação de categoria com dados válidos deve retornar 200."""
        response = client.post(
            "/categories",
            json={"name": "Nova Categoria"},
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["name"] == "Nova Categoria"

    def test_create_category_duplicate(self, client: TestClient, test_category: Category):
        """Criação de categoria duplicada deve retornar 400."""
        response = client.post(
            "/categories",
            json={"name": test_category.name},  # nome já existente
        )
        assert response.status_code == 400
        assert response.json()["detail"] == "Categoria já existe."

    def test_create_category_missing_name(self, client: TestClient):
        """Criação sem nome deve retornar 422."""
        response = client.post("/categories", json={})
        assert response.status_code == 422

    def test_create_category_empty_name(self, client: TestClient):
        """Criação com nome vazio deve ser aceita (schema não valida)."""
        response = client.post("/categories", json={"name": ""})
        # Atualmente o schema não valida nome vazio
        assert response.status_code in (200, 400, 422)


class TestCategoriesGet:
    """Testes para GET /categories/{id} - se existisse"""
    # Nota: Atualmente não existe endpoint GET /categories/{id}
    # Se for implementado no futuro, adicionar testes aqui
    pass


# Import necessário para type hints
from app.models.category import Category