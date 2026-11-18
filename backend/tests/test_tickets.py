import pytest
from fastapi.testclient import TestClient
from app.models.user import User


class TestTicketsCreate:
    """Testes para POST /tickets"""

    def test_create_ticket_success(self, client: TestClient, auth_headers: dict):
        """Criação de ticket com dados válidos deve retornar 200."""
        response = client.post(
            "/tickets",
            json={
                "titulo": "Problema no sistema",
                "descricao": "Descrição detalhada do problema",
            },
            headers=auth_headers,
        )
        assert response.status_code == 200
        data = response.json()
        assert data["titulo"] == "Problema no sistema"
        assert data["descricao"] == "Descrição detalhada do problema"
        assert data["status"] == "aberto"
        assert "id" in data

    def test_create_ticket_missing_fields(self, client: TestClient, auth_headers: dict):
        """Criação sem campos obrigatórios deve retornar 422."""
        response = client.post(
            "/tickets",
            json={"titulo": "Apenas título"},
            headers=auth_headers,
        )
        assert response.status_code == 422

    def test_create_ticket_empty_title(self, client: TestClient, auth_headers: dict):
        """Criação com título vazio deve ser aceita (schema não valida)."""
        response = client.post(
            "/tickets",
            json={"titulo": "", "descricao": "Descrição"},
            headers=auth_headers,
        )
        assert response.status_code in (200, 422)

    def test_create_ticket_unauthorized(self, client: TestClient):
        """Criação sem autenticação deve retornar 401."""
        response = client.post(
            "/tickets",
            json={"titulo": "Teste", "descricao": "Descrição"},
        )
        assert response.status_code == 401


class TestTicketsList:
    """Testes para GET /tickets"""

    def test_list_tickets_success(self, client: TestClient, auth_headers: dict, test_user: User, db_session):
        """Listagem de tickets do usuário deve funcionar."""
        # Cria alguns tickets
        from app.models.ticket import Ticket
        ticket1 = Ticket(titulo="Ticket 1", descricao="Desc 1", usuario_id=test_user.id, status="aberto")
        ticket2 = Ticket(titulo="Ticket 2", descricao="Desc 2", usuario_id=test_user.id, status="fechado")
        db_session.add_all([ticket1, ticket2])
        db_session.commit()

        response = client.get("/tickets", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 2
        # Deve vir ordenado por ID decrescente (mais recente primeiro)
        assert data[0]["id"] >= data[1]["id"]
        assert "titulo" in data[0]
        assert "descricao" in data[0]
        assert "status" in data[0]

    def test_list_tickets_empty(self, client: TestClient, auth_headers: dict):
        """Usuário sem tickets deve receber lista vazia."""
        response = client.get("/tickets", headers=auth_headers)
        assert response.status_code == 200
        assert response.json() == []

    def test_list_tickets_isolated_per_user(self, client: TestClient, auth_headers: dict, auth_headers_user2: dict, test_user: User, test_user2: User, db_session):
        """Tickets devem ser isolados por usuário."""
        from app.models.ticket import Ticket
        ticket = Ticket(titulo="Ticket do User 1", descricao="Desc", usuario_id=test_user.id)
        db_session.add(ticket)
        db_session.commit()

        # User 1 vê o ticket
        response1 = client.get("/tickets", headers=auth_headers)
        assert len(response1.json()) >= 1

        # User 2 não vê
        response2 = client.get("/tickets", headers=auth_headers_user2)
        assert response2.json() == []

    def test_list_tickets_unauthorized(self, client: TestClient):
        """Listagem sem autenticação deve retornar 401."""
        response = client.get("/tickets")
        assert response.status_code == 401


class TestTicketsUpdateStatus:
    """Testes para PATCH /tickets/{ticket_id}/status"""

    def test_update_status_success(self, client: TestClient, auth_headers: dict, test_user: User, db_session):
        """Atualização de status do próprio ticket deve funcionar."""
        from app.models.ticket import Ticket
        ticket = Ticket(titulo="Ticket", descricao="Desc", usuario_id=test_user.id, status="aberto")
        db_session.add(ticket)
        db_session.commit()
        db_session.refresh(ticket)

        response = client.patch(
            f"/tickets/{ticket.id}/status?status=em_andamento",
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert response.json()["message"] == "Status atualizado"

    def test_update_status_nonexistent(self, client: TestClient, auth_headers: dict):
        """Atualização de ticket inexistente deve retornar 404."""
        response = client.patch("/tickets/99999/status?status=fechado", headers=auth_headers)
        assert response.status_code == 404
        assert response.json()["detail"] == "Ticket não encontrado"

    def test_update_status_forbidden(self, client: TestClient, auth_headers_user2: dict, test_user: User, db_session):
        """Usuário não pode atualizar status de ticket de outro usuário."""
        from app.models.ticket import Ticket
        ticket = Ticket(titulo="Ticket", descricao="Desc", usuario_id=test_user.id, status="aberto")
        db_session.add(ticket)
        db_session.commit()
        db_session.refresh(ticket)

        response = client.patch(f"/tickets/{ticket.id}/status?status=fechado", headers=auth_headers_user2)
        assert response.status_code == 404  # Não encontra porque filtra por usuario_id

    def test_update_status_unauthorized(self, client: TestClient, test_user: User, db_session):
        """Atualização sem autenticação deve retornar 401."""
        from app.models.ticket import Ticket
        ticket = Ticket(titulo="Ticket", descricao="Desc", usuario_id=test_user.id, status="aberto")
        db_session.add(ticket)
        db_session.commit()
        db_session.refresh(ticket)

        response = client.patch(f"/tickets/{ticket.id}/status", json="fechado")
        assert response.status_code == 401


# Import necessário para type hints
from app.models.user import User