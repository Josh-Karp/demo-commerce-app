from flask import make_response, abort, request, jsonify, Blueprint
from api.factory import db
from models.users import Users

users_bp = Blueprint("users", __name__, url_prefix="/users")


@users_bp.route("/<string:email>", methods=["GET"])
def read_by_email(email):
    user = Users.query.filter(Users.email == email).one_or_none()

    if user is not None:
        return jsonify(user), 200
    else:
        return make_response(f"User with email {email} not found", 404)


@users_bp.route("/<string:id>", methods=["GET"])
def read_by_id(id):
    user = Users.query.get(id)

    if user is not None:
        return jsonify(user), 200
    else:
        return make_response(f"User with id {id} not found", 404)


@users_bp.route("/", methods=["POST"])
def create():
    user_data = request.get_json()
    email = user_data.get("email")
    password = user_data.get("password")

    if not email or not password:
        return make_response("Email and password are required", 400)

    existing_user = Users.query.filter(Users.email == email).one_or_none()

    if existing_user is None:
        new_user = Users(
            email=user_data.get("email"),
            username=user_data.get("username"),
            password=user_data.get("password"),
            first_name=user_data.get("first_name"),
            last_name=user_data.get("last_name"),
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user), 201
    else:
        return make_response(f"User with email {email} already exists", 406)


@users_bp.route("/<int:id>", methods=["PUT"])
def update(id):
    user_data = request.get_json()
    existing_user = Users.query.get(id)

    if existing_user:
        update_user = Users(
            email=user_data.get("email"),
            username=user_data.get("username"),
            password=user_data.get("password"),
            first_name=user_data.get("first_name"),
            last_name=user_data.get("last_name"),
        )

        db.session.merge(update_user)
        db.session.commit()
        return jsonify(existing_user), 201
    else:
        return make_response(f"User with id {id} not found", 404)


@users_bp.route("/<int:id>", methods=["DELETE"])
def delete(id):
    existing_user = Users.query.get(id)

    if existing_user:
        db.session.delete(existing_user)
        db.session.commit()
        return make_response(f"User with id {id} successfully deleted", 200)
    else:
        return make_response(f"User with email {id} not found", 404)
