from flask import Blueprint, request, jsonify
from db import cursor, db

auth = Blueprint("auth", __name__)

# ==========================
# REGISTER
# ==========================

@auth.route("/register", methods=["POST"])
def register():

    try:

        data = request.json

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:

            return jsonify({
                "success": False,
                "message": "All fields are required"
            })

        # Check Existing User

        cursor.execute(
            "SELECT * FROM users WHERE email=%s",
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:

            return jsonify({
                "success": False,
                "message": "Email already registered"
            })

        # Insert User

        cursor.execute(
            """
            INSERT INTO users
            (name,email,password)
            VALUES(%s,%s,%s)
            """,
            (
                name,
                email,
                password
            )
        )

        db.commit()

        return jsonify({
            "success": True,
            "message": "Registration Successful"
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })


# ==========================
# LOGIN
# ==========================

@auth.route("/login", methods=["POST"])
def login():

    try:

        data = request.json

        email = data.get("email")
        password = data.get("password")

        cursor.execute(
            """
            SELECT *
            FROM users
            WHERE email=%s
            AND password=%s
            """,
            (
                email,
                password
            )
        )

        user = cursor.fetchone()

        if user:

            return jsonify({

                "success": True,

                "user": {

                    "id": user[0],
                    "name": user[1],
                    "email": user[2]

                }

            })

        return jsonify({

            "success": False,
            "message": "Invalid Email or Password"

        })

    except Exception as e:

        return jsonify({

            "success": False,
            "message": str(e)

        })


# ==========================
# TEST ROUTE
# ==========================

@auth.route("/auth-test")
def auth_test():

    return jsonify({
        "success": True,
        "message": "Auth Route Working"
    })