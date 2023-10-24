from flask import make_response, request, jsonify, Blueprint
from api.factory import db
from models.user import User

users_bp = Blueprint("users", __name__, url_prefix="/users")


@users_bp.route("/emails/<string:email>", methods=["GET"])
def read_by_email(email):
    user = User.query.filter(User.email == email).one_or_none()

    if user is not None:
        return make_response(jsonify(user), 200)
    else:
        return make_response(jsonify({"message": f"User with email {email} not found"}), 404)


@users_bp.route("/<int:id>", methods=["GET"])
def read_by_id(id):
    user = User.query.filter(User.id == id).one_or_none()

    if user is not None:
        return make_response(jsonify(user), 200)
    else:
        return make_response(jsonify({"message": f"User with id {id} not found"}), 404)


@users_bp.route("/", methods=["POST"])
def create():
    user_data = request.get_json()
    email = user_data.get("email")
    password = user_data.get("password")

    if not email or not password:
        return make_response("Email and password are required", 400)

    user = User.query.filter(User.email == email).one_or_none()

    if user is None:
        new_user = User(**user_data)

        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify(new_user), 201)
    else:
        return make_response(jsonify({"message": f"User with email {email} already exists"}), 406)


@users_bp.route("/<int:id>", methods=["PUT"])
def update(id):
    user_data = request.get_json()
    is_updated = User.query.filter(User.id == id).update(user_data)

    if is_updated:
        db.session.commit()
        return make_response(jsonify({"message": f"User with id {id} successfully updated"}), 200)
    else:
        return make_response(jsonify({"message": f"User with id {id} not found"}), 404)


@users_bp.route("/<int:id>", methods=["DELETE"])
def delete(id):
    user = User.query.get(id)

    if user:
        db.session.delete(user)
        db.session.commit()
        return make_response(jsonify({"message": f"User with id {id} successfully deleted"}), 200)
    else:
        return make_response(jsonify({"message": f"User with email {id} not found"}), 404)
