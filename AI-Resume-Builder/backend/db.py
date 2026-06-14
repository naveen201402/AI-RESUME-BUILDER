import os
import mysql.connector

db = mysql.connector.connect(
    host=os.environ.get("MYSQLHOST",thomas.proxy.rlwy.net),
    user=os.environ.get("MYSQLUSER", root),
    password=os.environ.get("MYSQLPASSWORD",8ARNMqo7uXgU5NTweEmWn46Hvewjcp1PtqfXTKDZTj29),
    database=os.environ.get("MYSQLDATABASE", railway),
    port=int(os.environ.get("MYSQLPORT", 3306))
)

cursor = db.cursor()
