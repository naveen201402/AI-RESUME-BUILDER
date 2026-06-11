import mysql.connector

db = mysql.connector.connect(
    host="ai-resume-builder-naveen2014sai-61d2.c.aivencloud.com",
    user="avnadmin",
    password="YOUR_AIVEN_PASSWORD",
    database="defaultdb",
    port=13287,
    ssl_disabled=False
)

cursor = db.cursor()

print("Connected Successfully!")
