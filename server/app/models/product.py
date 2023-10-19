from dataclasses import dataclass
from datetime import datetime
from api.factory import db


@dataclass
class Product(db.Model):
    id: int
    sku: str
    name: str
    brand: str
    description: str
    price: int
    created_at: datetime
    updated_at: datetime

    __tablename__ = "product"

    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String(255), nullable=False, unique=True)
    name = db.Column(db.String(255), nullable=False)
    brand = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime(), default=datetime.utcnow, index=True, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return "<Product %r>" % self.name

    def __str__(self):
        return "<Product {}>".format(self.name)

    def update(self, **kwargs):
        self.sku = kwargs.sku
        self.name = kwargs.name
        self.brand = kwargs.brand
        self.description = kwargs.description
        self.price = kwargs.price
        self.updated_at = datetime.utcnow()
