import jwt
import os

from datetime import datetime
from models.user import User
from api.factory import db


def test_login(test_client, init_database):
    """
    Test the login functionality of the application.

    Args:
        test_client: The test client for the application.
        init_database: The initialized database for the application.
    """
    user = User(
        email="test@example.com",
        password="password",
        username="testuser",
        first_name="Test",
        last_name="User",
    )
    db.session.add(user)
    db.session.commit()

    response = test_client.post(
        "/auth/login",
        json={"email": "test@example.com", "password": "password"},
        content_type="application/json",
    )

    assert response.status_code == 201
    assert "token" in response.json

    token = response.json["token"]
    decoded_token = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=["HS256"])
    assert decoded_token["id"] == user.id
    assert datetime.fromtimestamp(decoded_token["exp"]) > datetime.utcnow()

def test_register(test_client, init_database):
    """
    Test registering a new user.

    Sends a POST request to the '/auth/register' endpoint with user data in JSON format.
    Asserts that the response status code is 201 and that a 'token' key is present in the response JSON.
    Queries the database for the newly created user and asserts that the user exists.
    Decodes the JWT token from the response and asserts that the 'id' field matches the user's ID and that the token has not expired.

    Args:
        test_client: Flask test client.
        init_database: Initialized test database.
    """
    user_data = {
        "email": "test2@example.com",
        "password": "password2",
        "username": "testuser2",
        "first_name": "Test2",
        "last_name": "User2",
    }

    response = test_client.post(
        "/auth/register",
        json=user_data,
        content_type="application/json",
    )

    assert response.status_code == 201
    assert "token" in response.json

    user = User.query.filter_by(email=user_data["email"]).first()
    assert user is not None

    token = response.json["token"]
    decoded_token = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=["HS256"])
    assert decoded_token["id"] == user.id
    assert datetime.fromtimestamp(decoded_token["exp"]) > datetime.utcnow()