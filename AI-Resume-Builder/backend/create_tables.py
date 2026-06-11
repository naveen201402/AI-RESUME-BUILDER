from db import cursor, db

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS resumes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin VARCHAR(255),
    summary TEXT,
    skills TEXT,
    education TEXT,
    experience TEXT,
    projects TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    company VARCHAR(255),
    description TEXT,
    required_skills TEXT
)
""")

db.commit()

print("Tables Created Successfully")
