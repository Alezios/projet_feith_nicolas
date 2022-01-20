from sqlalchemy.orm import Session
import entity_models, schemas
from secu_utilities import get_password_hash

def get_user(db: Session, username: str):
    return db.query(entity_models.User).filter(entity_models.User.username == username).first()


def get_user_by_email(db: Session, email: str):
    return db.query(entity_models.User).filter(entity_models.User.email == email).first()


def new_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = entity_models.User(
        firstname = user.firstname,
        lastName = user.lastName,
        address = user.address,
        city = user.city,
        cp = user.cp,
        country = user.country,
        prefix = user.prefix,
        telephone = user.telephone,
        email = user.email,
        gender = user.gender,
        username = user.username,
        hashed_password = hashed_password,
        is_active = True
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(entity_models.Product).offset(skip).limit(limit).all()

def get_product_detail(db: Session, id: int):
    return db.query(entity_models.Product).filter(entity_models.Product.id == id).first()
