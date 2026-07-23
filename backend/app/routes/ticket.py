from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.auth.dependencies import get_current_user
from app.models.ticket import Ticket
from app.models.user import User
from app.schemas.ticket import TicketCreate, TicketResponse

router = APIRouter(prefix="/tickets", tags=["Tickets"])


@router.post("", response_model=TicketResponse)
def criar_ticket(
    dados: TicketCreate,
    db: Session = Depends(get_db),
    usuario: User = Depends(get_current_user),
):
    ticket = Ticket(
        titulo=dados.titulo,
        descricao=dados.descricao,
        usuario_id=usuario.id,
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return ticket


@router.get("", response_model=list[TicketResponse])
def listar_tickets(
    db: Session = Depends(get_db),
    usuario: User = Depends(get_current_user),
):
    tickets = (
        db.query(Ticket)
        .filter(Ticket.usuario_id == usuario.id)
        .order_by(Ticket.id.desc())
        .all()
    )

    return tickets


@router.patch("/{ticket_id}/status")
def alterar_status(
    ticket_id: int,
    status: str,
    db: Session = Depends(get_db),
    usuario: User = Depends(get_current_user),
):
    ticket = (
        db.query(Ticket)
        .filter(
            Ticket.id == ticket_id,
            Ticket.usuario_id == usuario.id,
        )
        .first()
    )

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket não encontrado")

    ticket.status = status

    db.commit()

    return {"message": "Status atualizado"}