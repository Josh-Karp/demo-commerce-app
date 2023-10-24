from models.user import User


def test_user_creation():
    """
    Test user creation with valid input parameters.
    """
    user = User(
        username="testuser",
        email="testuser@example.com",
        password="password",
        first_name="Test",
        last_name="User",
    )
    assert user.username == "testuser"
    assert user.email == "testuser@example.com"
    assert user.first_name == "Test"
    assert user.last_name == "User"
    assert user.is_password_correct("password")
    assert user.role_id == "1"


def test_user_password_hashing():
    """
    Test user password hashing.
    """
    user = User(
        username="testuser",
        email="testuser@example.com",
        password="password",
        first_name="Test",
        last_name="User",
    )
    assert user.password != "password"
    assert user.is_password_correct("password")
    assert not user.is_password_correct("wrongpassword")
