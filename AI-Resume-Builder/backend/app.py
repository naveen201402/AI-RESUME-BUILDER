from flask import Flask
from flask_cors import CORS

from routes.auth import auth
from routes.resume import resume
from routes.jobs import jobs

app = Flask(__name__)

# Enable CORS
CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)

# Register Blueprints
app.register_blueprint(auth)
app.register_blueprint(resume)
app.register_blueprint(jobs)

# Home Route
@app.route("/")
def home():

    return {
        "success": True,
        "message": "AI Resume Builder Backend Running"
    }

# Run Server
if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )