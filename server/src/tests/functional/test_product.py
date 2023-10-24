import json
from api.factory import db
from models.product import Product

def test_read_all_products(test_client, init_database):
    """
    Test reading all products.
    """
    products = [
        Product(
            name="Test Product 1",
            category="Test Category 1",
            description="Test Description 1",
            brand="Test Brand 1",
            sku="TEST123",
            price=9.99,
            color="Test Color 1",
            img_url="https://example.com/test1.jpg",
            img_alt="Test Image 1",
            popularity_score=0,
        ),
        Product(
            name="Test Product 2",
            category="Test Category 2",
            description="Test Description 2",
            brand="Test Brand 2",
            sku="TEST456",
            price=19.99,
            color="Test Color 2",
            img_url="https://example.com/test2.jpg",
            img_alt="Test Image 2",
            popularity_score=0,
        ),
    ]

    db.session.add_all(products)
    db.session.commit()

    response = test_client.get("/product/")

    assert response.status_code == 200
    assert response.content_type == "application/json"

    response_data = json.loads(response.data)
    assert len(response_data) == 3

    for product in products:
        db.session.delete(product)
        db.session.commit()

def test_read_product_by_id(test_client, init_database):
    """
    Test reading a product by id.
    """
    product = Product(
        name="Test Product",
        category="Test Category",
        description="Test Description",
        brand="Test Brand",
        sku="TEST1234",
        price=9.99,
        color="Test Color",
        img_url="https://example.com/test.jpg",
        img_alt="Test Image",
        popularity_score=0,
    )
    db.session.add(product)
    db.session.commit()

    response = test_client.get(f"/product/{product.id}")

    assert response.status_code == 200
    assert response.content_type == "application/json"

    response_data = json.loads(response.data)
    assert response_data["name"] == "Test Product"
    assert response_data["category"] == "Test Category"
    assert response_data["description"] == "Test Description"
    assert response_data["brand"] == "Test Brand"
    assert response_data["sku"] == "TEST1234"
    assert response_data["price"] == 9.99
    assert response_data["color"] == "Test Color"
    assert response_data["img_url"] == "https://example.com/test.jpg"
    assert response_data["img_alt"] == "Test Image"
    assert response_data["popularity_score"] == 0

    db.session.delete(product)
    db.session.commit()

def test_create_product(test_client, init_database):
    """
    Test creating a new product with valid input parameters.
    """
    product_data = {
        "name": "Test Product",
        "category": "Test Category",
        "description": "Test Description",
        "brand": "Test Brand",
        "sku": "TEST123",
        "price": 9.99,
        "color": "Test Color",
        "img_url": "https://example.com/test.jpg",
        "img_alt": "Test Image",
        "popularity_score": 0,
    }

    response = test_client.post("/product/", json=product_data)

    assert response.status_code == 201
    assert response.content_type == "application/json"

    product = Product.query.filter_by(sku="TEST123").one_or_none()

    assert product is not None
    assert product.name == "Test Product"
    assert product.category == "Test Category"
    assert product.description == "Test Description"
    assert product.brand == "Test Brand"
    assert product.price == 9.99
    assert product.color == "Test Color"
    assert product.img_url == "https://example.com/test.jpg"
    assert product.img_alt == "Test Image"
    assert product.popularity_score == 0

    db.session.delete(product)
    db.session.commit()


def test_create_product_missing_fields(test_client):
    """
    Test creating a new product with missing required fields.
    """
    product_data = {
        "name": "Test Product",
        "category": "Test Category",
        "description": "Test Description",
        "brand": "Test Brand",
        "sku": "TEST1234",
    }

    response = test_client.post("/product/", json=product_data)

    assert response.status_code == 400
    assert response.content_type == "application/json"

    response_data = json.loads(response.data)
    assert response_data["message"] == "Invalid request body"


def test_create_product_duplicate_sku(test_client, init_database):
    """
    Test creating a new product with a duplicate SKU.
    """
    product_data = {
        "name": "Test Product",
        "category": "Test Category",
        "description": "Test Description",
        "brand": "Test Brand",
        "sku": "TEST123",
        "price": 9.99,
        "color": "Test Color",
        "img_url": "https://example.com/test.jpg",
        "img_alt": "Test Image",
        "popularity_score": 0,
    }

    # Create a product with the same SKU first
    product = Product(**product_data)
    db.session.add(product)
    db.session.commit()

    response = test_client.post("/product/", json=product_data)

    assert response.status_code == 406
    assert response.content_type == "application/json"

    response_data = json.loads(response.data)
    assert response_data["message"] == "Product with sku TEST123 already exists"

    db.session.delete(product)
    db.session.commit()
