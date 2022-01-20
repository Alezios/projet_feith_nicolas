from typing import Optional;
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class User(BaseModel):
    id: Optional[int] = 0
    firstname: str
    lastName: str
    address: str
    city: str
    cp: str
    country: str
    prefix: str
    telephone: Optional[str] = "06565698"
    email: str
    gender: str
    username: str
    is_active: Optional[bool] = True

    class Config:
        orm_mode = True

class UserInDB(User):
    hashed_password: str

class UserCreate(User):
    password: str

class Product(BaseModel):
    id: int
    name: str
    price: float

    class Config:
        orm_mode = True

class ProductDetail(Product):
    desc: str