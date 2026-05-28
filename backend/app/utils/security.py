from passlib.context import CryptContext

#Configuração do brcrypt
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto")

#Criptografar a senha
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

#Verificar a senha
def verify_password(password: str,
                    plain_password: str,
                    hashed_password: str) -> bool:
    
    return pwd_context.verify(
        plain_password,
        hashed_password
    )