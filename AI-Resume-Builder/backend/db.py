import mysql.connector

db = mysql.connector.connect(
    host="thomas.proxy.rlwy.net",
    user="root",
    password="8ARNMqo7uXgU5NTweEmWn46Hvewjcp1PtqfXTKDZTj29",
    database="railway",
    port=58553
)

cursor = db.cursor()
