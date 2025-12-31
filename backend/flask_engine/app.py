import os
from flask import Flask, request, jsonify
from scoring.loader import prepare_data
from scoring.context_builder import build_context
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route("/process", methods=["POST"])
def process():
    payload = request.get_json()
    print("=== RECEIVED PAYLOAD FROM NODE ===")
    # print(payload)

    participant = payload["participant"]
    responses = payload["responses"]
    questions = payload["questions"]

    df = prepare_data(responses, questions)
    ctx = build_context(df, participant)

    return jsonify(ctx)


if __name__ == "__main__":
    host = os.getenv("FLASK_HOST", "0.0.0.0")
    port = int(os.getenv("FLASK_PORT", "4000"))
    app.run(host=host, port=port)
