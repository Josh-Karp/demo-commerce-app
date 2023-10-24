from flask import make_response, request, jsonify, Blueprint
from flask_cors import cross_origin
from api.factory import db
from models.product import Product

product_bp = Blueprint("product", __name__, url_prefix="/product")


@product_bp.route("/", methods=["GET"])
@cross_origin()
def read_all():
    products = Product.query.all()
    return make_response(jsonify(products), 200)


@product_bp.route("/<int:id>", methods=["GET"])
@cross_origin()
def read_by_id(id):
    product = Product.query.get(id)

    if product is not None:
        return make_response(jsonify(product), 200)
    else:
        return make_response(jsonify({"message": f"Product with id {id} not found"}), 404)


@product_bp.route("/", methods=["POST"])
@cross_origin()
def create():
    product_data = request.get_json()
    required_fields = ["sku", "name", "brand", "description", "price"]

    if not all(field in product_data and product_data[field] for field in required_fields):
        return make_response(jsonify({"message": f"Invalid request body"}), 400)

    sku = product_data["sku"]

    product = Product.query.filter_by(sku=sku).one_or_none()

    if product is None:
        new_product = Product(**product_data)

        db.session.add(new_product)
        db.session.commit()
        return make_response(jsonify(new_product), 201)
    else:
        return make_response(jsonify({"message": f"Product with sku {sku} already exists"}), 406)


@product_bp.route("/<int:id>", methods=["PUT"])
@cross_origin()
def update(id):
    product_data = request.get_json()
    is_updated = Product.query.filter(Product.id == id).update(product_data)

    if is_updated:
        db.session.commit()

        return make_response(jsonify({"message": f"Product with id {id} updated successfully"}), 200)
    else:
        return make_response(jsonify({"message": f"Product with id {id} not found"}), 404)


@product_bp.route("/<int:id>", methods=["DELETE"])
@cross_origin()
def delete(id):
    product = Product.query.get(id)

    if product:
        db.session.delete(product)
        db.session.commit()
        return make_response(jsonify({"message": f"Product with id {id} deleted successfully"}), 200)
    else:
        return make_response(jsonify({"message": f"Product with id {id} not found"}), 404)
