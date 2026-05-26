import re
from pydantic import AfterValidator
from typing import Annotated


def validar_telefone(telefone: str) -> bool:
    padrao = r'^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$'

    if re.match(padrao, telefone):
        return True

    return False


def checar_telefone(v: str) -> str:
    if not validar_telefone(v):
        raise ValueError('Telefone inválido')

    return v


Telefone = Annotated[str, AfterValidator(checar_telefone)]