from dataclasses import dataclass
from datetime import datetime
from api.factory import db


@dataclass
class Product(db.Model):
    id: int
    name: str
    category: str
    description: str
    brand: str
    sku: str
    price: float
    color: str
    image: str
    popularity_score: int
    created_at: datetime
    updated_at: datetime

    __tablename__ = "product"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    brand = db.Column(db.String(255), nullable=False)
    sku = db.Column(db.String(255), nullable=False, unique=True)
    price = db.Column(db.Float, nullable=False)
    color = db.Column(db.String(255), nullable=False)
    image = db.Column(db.Text, nullable=True)
    popularity_score = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime(), default=datetime.utcnow, index=True, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<Product: {self.name}>"

    def __str__(self):
        return f"<Product: {self.name}>"
