from models.role import Role


def test_role_creation():
    """
    Test role creation with valid input parameters.
    """
    role = Role(
        name="Test Role",
        description="Test Description",
    )
    assert role.name == "Test Role"
    assert role.description == "Test Description"