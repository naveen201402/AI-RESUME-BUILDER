import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="resume_builder"
)

cursor = db.cursor()