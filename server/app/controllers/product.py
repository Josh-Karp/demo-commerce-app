from flask import make_response, request, jsonify, Blueprint
from api.factory import db
from models.product import Product

product_bp = Blueprint("product", __name__, url_prefix="/product")


@product_bp.route("/", methods=["GET"])
def read_all():
    products = Product.query.all()
    return make_response(products, 200)


@product_bp.route("/<int:id>", methods=["GET"])
def read_by_id(id):
    product = Product.query.get(id)

    if product is not None:
        return make_response(product, 200)
    else:
        return make_response(f"Product with id {id} not found", 404)


@product_bp.route("/", methods=["POST"])
def create():
    product_data = request.get_json()
    required_fields = ["sku", "name", "brand", "description", "price"]

    if not all(field in product_data and product_data[field] for field in required_fields):
        return make_response(f"Invalid request body", 400)

    sku = product_data["sku"]

    existing_product = Product.query.filter_by(sku=sku).one_or_none()

    if existing_product is None:
        new_product = Product(**product_data)

        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product), 201
    else:
        return make_response(f"Product with sku {sku} already exists", 406)


@product_bp.route("/<int:id>", methods=["PUT"])
def update(id):
    product_data = request.get_json()
    is_updated = Product.query.filter(Product.id == id).update(product_data)

    if is_updated:
        db.session.commit()

        return make_response(f"Product with id {id} successfully updated", 200)
    else:
        return make_response(f"Product with id {id} not found", 404)


@product_bp.route("/<int:id>", methods=["DELETE"])
def delete(id):
    existing_product = Product.query.get(id)

    if existing_product:
        db.session.delete(existing_product)
        db.session.commit()
        return make_response(f"Product with id {id} successfully deleted", 200)
    else:
        return make_response(f"Product with id {id} not found", 404)
