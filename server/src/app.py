from api.factory import create_app
from flask import jsonify, make_response

app = create_app()

@app.errorhandler(Exception)
def exception(e):
    return make_response(f"Internal Server Error: {e}", 500)


@app.route("/healthcheck", methods=["GET"])
def healthcheck():
    return make_response(jsonify({"message": "Server is alive"}), 200)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False)
