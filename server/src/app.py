from api.factory import app
from flask import jsonify, make_response
from controllers.users import users_bp
from controllers.product import product_bp
from controllers.authentication import auth_bp


@app.errorhandler(Exception)
def exception(e):
    return make_response(f"Internal Server Error: {e}", 500)


app.register_blueprint(users_bp)
app.register_blueprint(product_bp)
app.register_blueprint(auth_bp)


@app.route("/healthcheck", methods=["GET"])
def healthcheck():
    return make_response(jsonify({"message": "Server is alive"}), 200)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False)
