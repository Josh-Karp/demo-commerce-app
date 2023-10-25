from datetime import datetime
from models.product import Product


def test_product_creation():
    """
    Test product creation with valid input parameters.
    """
    product = Product(
        name="Test Product",
        category="Test Category",
        description="Test Description",
        brand="Test Brand",
        sku="TEST123",
        price=9.99,
        color="Test Color",
        popularity_score=0,
    )
    assert product.name == "Test Product"
    assert product.category == "Test Category"
    assert product.description == "Test Description"
    assert product.brand == "Test Brand"
    assert product.sku == "TEST123"
    assert product.price == 9.99
    assert product.color == "Test Color"
    assert product.popularity_score == 0