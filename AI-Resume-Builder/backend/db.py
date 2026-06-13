import os
import mysql.connector

db = mysql.connector.connect(
    host=os.environ.get("MYSQLHOST", "thomas.proxy.rlwy.net"),
    user=os.environ.get("MYSQLUSER", "root"),
    password=os.environ.get("MYSQLPASSWORD", "QSmlQUfJVZlKxllugoWTbHSRdhOlsAye"),
    database=os.environ.get("MYSQLDATABASE", "railway"),
    port=int(os.environ.get("MYSQLPORT", 30518))
)

cursor = db.cursor()
