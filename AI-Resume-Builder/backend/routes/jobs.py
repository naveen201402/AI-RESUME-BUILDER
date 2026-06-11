from flask import Blueprint, jsonify
from db import cursor

jobs = Blueprint("jobs", __name__)

# ==========================
# GET MATCHING JOBS
# ==========================

@jobs.route("/jobs/<int:user_id>", methods=["GET"])
def get_jobs(user_id):

    try:

        # Get user skills

        cursor.execute(
            """
            SELECT skills
            FROM resumes
            WHERE user_id=%s
            """,
            (user_id,)
        )

        resume = cursor.fetchone()

        if not resume:

            return jsonify({
                "success": True,
                "jobs": []
            })

        user_skills = str(
            resume[0] or ""
        ).lower()

        # Get all jobs

        cursor.execute(
            """
            SELECT
            id,
            title,
            company,
            description,
            required_skills
            FROM jobs
            """
        )

        all_jobs = cursor.fetchall()

        matched_jobs = []

        for job in all_jobs:

            job_skills = str(
                job[4] or ""
            ).lower()

            required = [
                skill.strip()
                for skill in job_skills.split(",")
                if skill.strip()
            ]

            matched = 0

            for skill in required:

                if skill in user_skills:
                    matched += 1

            if len(required) > 0:

                match_percentage = int(
                    (matched / len(required))
                    * 100
                )

            else:

                match_percentage = 0

            matched_jobs.append({

                "id": job[0],

                "title": job[1],

                "company": job[2],

                "description": job[3],

                "required_skills": job[4],

                "match_percentage":
                match_percentage

            })

        # Highest match first

        matched_jobs.sort(
            key=lambda x:
            x["match_percentage"],
            reverse=True
        )

        return jsonify({

            "success": True,

            "jobs": matched_jobs

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "message": str(e)

        })


# ==========================
# TEST ROUTE
# ==========================

@jobs.route("/jobs-test")
def jobs_test():

    return jsonify({

        "success": True,

        "message":
        "Jobs Route Working"

    })