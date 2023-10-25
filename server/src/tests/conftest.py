import os
import pytest

from api.factory import create_app, db
from models.user import User
from models.product import Product
from models.role import Role


# --------
# Fixtures
# --------


@pytest.fixture(scope="module")
def test_client():
    # Set the Testing configuration prior to creating the Flask application
    os.environ["CONFIG_TYPE"] = "config.TestingConfig"
    flask_app = create_app()

    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as testing_client:
        # Establish an application context
        with flask_app.app_context():
            yield testing_client


@pytest.fixture(scope="module")
def init_database():
    # Clear the database
    db.close_all_sessions()
    db.drop_all()

    # Create the database and the database table
    db.create_all()

    # Insert role data
    test_role = Role(
        name="user", 
        description="User"
    )

    db.session.add(test_role)
    db.session.commit()

    # Insert user data
    test_user = User(
        username="test",
        email="test_email",
        password="test_password",
        first_name="test_first_name",
        last_name="test_last_name",
    )
    db.session.add(test_user)
    db.session.commit()

    # Insert product data
    test_product = Product(
        name="test_name",
        category="test_category",
        description="test_description",
        brand="test_brand",
        sku="test_sku",
        price=0.00,
        color="test_color",
        popularity_score=0,
    )

    db.session.add(test_product)
    db.session.commit()

    yield db

    db.close_all_sessions()
    db.drop_all()
