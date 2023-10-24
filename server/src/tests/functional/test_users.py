
def test_read_by_email(test_client, init_database):
    # create a user
    user_data = {
        "email": "test@example.com",
        "password": "password",
        "username": "testuser",
        "first_name": "Test",
        "last_name": "User"
    }
    response = test_client.post("/users/", json=user_data)
    assert response.status_code == 201

    # test reading the user by email
    response = test_client.get(f"/users/emails/{user_data['email']}")
    assert response.status_code == 200
    assert response.json["email"] == user_data["email"]
    assert response.json["username"] == user_data["username"]

    # test reading a non-existent user by email
    response = test_client.get("/users/emails/nonexistent@example.com")
    assert response.status_code == 404
    assert response.json["message"] == "User with email nonexistent@example.com not found"

def test_read_by_id(test_client, init_database):
    # create a user
    user_data = {
        "email": "test1@example.com",
        "password": "password",
        "username": "testuser1",
        "first_name": "Test",
        "last_name": "User"
    }
    response = test_client.post("/users/", json=user_data)
    assert response.status_code == 201

    user_id = response.json["id"]

    # test reading the user by id
    response = test_client.get(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json["email"] == user_data["email"]
    assert response.json["username"] == user_data["username"]
    assert response.json["first_name"] == user_data["first_name"]
    assert response.json["last_name"] == user_data["last_name"]

    # test reading a non-existent user by id
    response = test_client.get("/users/999")
    assert response.status_code == 404
    assert response.json["message"] == "User with id 999 not found"
    
def test_create_user(test_client, init_database):
    # test creating a new user
    user_data = {
        "email": "test2@example.com",
        "password": "password",
        "username": "testuser2",
        "first_name": "Test",
        "last_name": "User"
    }
    response = test_client.post("/users/", json=user_data)
    assert response.status_code == 201
    assert response.json["email"] == user_data["email"]
    assert response.json["username"] == user_data["username"]
    assert response.json["first_name"] == user_data["first_name"]
    assert response.json["last_name"] == user_data["last_name"]

    # test creating a user with missing email and password
    user_data = {
        "username": "testuser3",
        "first_name": "Test",
        "last_name": "User"
    }
    response = test_client.post("/users/", json=user_data)
    assert response.status_code == 400
    assert response.data == b"Email and password are required"

    # test creating a user with an existing email
    user_data = {
        "email": "test@example.com",
        "password": "password",
        "username": "testuser4",
        "first_name": "Test",
        "last_name": "User"
    }
    response = test_client.post("/users/", json=user_data)
    assert response.status_code == 406
    assert response.json["message"] == "User with email test@example.com already exists"


def test_update_user(test_client, init_database):
    # create a user
    user_data = {
        "email": "test5@example.com",
        "password": "password",
        "username": "testuser5",
        "first_name": "Test",
        "last_name": "User"
    }
    response = test_client.post("/users/", json=user_data)
    assert response.status_code == 201

    user_id = response.json["id"]

    # # test updating the user
    updated_user_data = {
        "email": "newemail@example.com",
        "username": "newusername",
        "first_name": "New",
        "last_name": "User"
    }
    response = test_client.put(f"/users/{user_id}", json=updated_user_data)
    assert response.status_code == 200
    assert response.json["message"] == f"User with id {user_id} successfully updated"

    # test reading the updated user
    response = test_client.get(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json["email"] == updated_user_data["email"]
    assert response.json["username"] == updated_user_data["username"]
    assert response.json["first_name"] == updated_user_data["first_name"]
    assert response.json["last_name"] == updated_user_data["last_name"]

    # test updating a non-existent user
    response = test_client.put("/users/999", json=updated_user_data)
    assert response.status_code == 404
    assert response.json["message"] == "User with id 999 not found"


def test_delete_user(test_client, init_database):
    # create a user
    user_data = {
        "email": "test6@example.com",
        "password": "password",
        "username": "testuser6",
        "first_name": "Test",
        "last_name": "User"
    }
    response = test_client.post("/users/", json=user_data)
    assert response.status_code == 201

    user_id = response.json["id"]

    # test deleting the user
    response = test_client.delete(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json["message"] == f"User with id {user_id} successfully deleted"

    # test deleting a non-existent user
    response = test_client.delete("/users/999")
    assert response.status_code == 404
    assert response.json["message"] == "User with email 999 not found"