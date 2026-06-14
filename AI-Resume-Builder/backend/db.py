import os
import mysql.connector

db = mysql.connector.connect(
    host=os.environ.get("thomas.proxy.rlwy.net"),
    user=os.environ.get("root"),
    password=os.environ.get("8ARNMqo7uXgU5NTweEmWn46Hvewjcp1PtqfXTKDZTj29"),
    database=os.environ.get("railway"),
    port=int(os.environ.get("58553"))
)

cursor = db.cursor()
