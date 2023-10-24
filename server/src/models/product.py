from dataclasses import dataclass
from datetime import datetime
from api.factory import db


@dataclass
class Product(db.Model):
    """
    A class representing a product.

    Attributes:
        id (int) The unique identifier of the product.
        name (str): The name of the product.
        category (str): The category of the product.
        description (str): The description of the product.
        brand (str): The brand of the product.
        sku (str): The stock keeping unit (SKU) of the product.
        price (float): The price of the product.
        color (str): The color of the product.
        img_url (str): The URL of the product image.
        img_alt (str): The alternative text for the product image.
        popularity_score (int): The popularity score of the product.
        created_at (datetime): The date and time when the product was created.
        updated_at (datetime): The date and time when the product was last updated.
    """

    id: int
    name: str
    category: str
    description: str
    brand: str
    sku: str
    price: float
    color: str
    img_url: str
    img_alt: str
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
    img_url = db.Column(db.String(255), nullable=False)
    img_alt = db.Column(db.String(255), nullable=False)
    popularity_score = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime(), default=datetime.utcnow, index=True, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<Product: {self.name}>"

    def __str__(self):
        return f"<Product: {self.name}>"

    def __init__(
        self,
        name: str,
        category: str,
        description: str,
        brand: str,
        sku: str,
        price: float,
        color: str,
        img_url: str,
        img_alt: str,
        popularity_score: int,
    ):
        """
        Create a new product object.
        """
        self.name = name
        self.category = category
        self.description = description
        self.brand = brand
        self.sku = sku
        self.price = price
        self.color = color
        self.img_url = img_url
        self.img_alt = img_alt
        self.popularity_score = popularity_score
