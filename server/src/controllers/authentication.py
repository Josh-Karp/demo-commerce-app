import os
from datetime import datetime, timedelta
from flask import request, jsonify, Blueprint, make_response
from api.factory import db
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import cross_origin
import jwt
from flask_cors import CORS

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


@auth_bp.route("/login", methods=["POST"])
@cross_origin()
def login():
    user_data = request.get_json()
    email = user_data.get("email")
    password = user_data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    existing_user = User.query.filter(User.email == email).one_or_none()

    if existing_user is None:
        return jsonify({"message": f"User with email {email} not found"}), 404

    verify_password = check_password_hash(existing_user.password, password)

    if verify_password:
        token = jwt.encode(
            {"id": existing_user.id, "exp": datetime.utcnow() + timedelta(minutes=30)},
            os.environ.get("SECRET_KEY"),
        )

        return make_response(jsonify({"token": token.decode("UTF-8")}), 201)
    else:
        return make_response(jsonify({"Password is incorrect"}), 401)


@auth_bp.route("/register", methods=["POST"])
@cross_origin()
def register():
    user_data = request.get_json()
    required_fields = ["email", "password", "username", "first_name", "last_name"]

    if not all(field in user_data and user_data[field] for field in required_fields):
        return jsonify({"message": f"Invalid request body"}), 400

    email = user_data.get("email")
    password = user_data.get("password")

    existing_user = User.query.filter(User.email == email).one_or_none()

    if existing_user is None:
        user_data["password"] = generate_password_hash(password, method="scrypt", salt_length=8)

        new_user = User(**user_data)

        db.session.add(new_user)
        db.session.commit()

        token = jwt.encode(
            {"id": new_user.id, "exp": datetime.utcnow() + timedelta(minutes=30)},
            os.environ.get("SECRET_KEY"),
        )

        return make_response(jsonify({"token": token.decode("UTF-8")}), 201)
    else:
        return jsonify({"message": f"User with email {email} already exists"}), 409
