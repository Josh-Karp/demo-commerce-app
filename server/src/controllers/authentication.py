import jwt

from datetime import datetime, timedelta
from flask import request, jsonify, Blueprint, make_response, current_app
from flask_cors import cross_origin

from api.factory import db
from models.user import User
from models.role import Role


auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


@auth_bp.route("/login", methods=["POST"])
@cross_origin()
def login():
    user_data = request.get_json()
    email = user_data.get("email")
    password = user_data.get("password")

    required_fields = ["email", "password"]

    if not all(field in user_data and user_data[field] for field in required_fields):
        return make_response(jsonify({"message": f"Invalid request body"}), 400)

    user = User.query.filter(User.email == email).one_or_none()
    role = Role.query.filter(Role.id == user.role_id).one_or_none()

    if user is None:
        return make_response(jsonify({"message": f"User with email {email} not found"}), 404)

    verify_password = user.is_password_correct(password)

    if verify_password:
        token = jwt.encode(
            {
                "id": user.id,
                "exp": datetime.utcnow() + timedelta(minutes=30),
                "username": user.username,
                "email": user.email,
                "role": role.name,
            },
            current_app.config["SECRET_KEY"],
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

    user = User.query.filter(User.email == email).one_or_none()

    if user is None:
        new_user = User(**user_data)

        db.session.add(new_user)
        db.session.commit()

        token = jwt.encode(
            {"id": new_user.id, "exp": datetime.utcnow() + timedelta(minutes=30)},
            current_app.config["SECRET_KEY"],
        )

        return make_response(jsonify({"token": token.decode("UTF-8")}), 201)
    else:
        return make_response(jsonify({"message": f"User with email {email} already exists"}), 409)
