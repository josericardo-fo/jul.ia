from flask import Flask, jsonify, render_template, request

from src.julia.chat import get_response

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    session_id = request.json.get("session_id", "default_session")
    response = get_response(user_input, session_id)
    return jsonify({"response": response})


if __name__ == "__main__":
    app.run(debug=True)
