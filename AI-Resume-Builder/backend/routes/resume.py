from flask import Blueprint, request, jsonify
from db import cursor, db

resume = Blueprint("resume", __name__)

# ==========================
# SAVE RESUME
# ==========================

@resume.route("/save-resume", methods=["POST"])
def save_resume():

    try:

        data = request.json

        user_id = data.get("user_id")

        # Check Existing Resume

        cursor.execute(
            "SELECT * FROM resumes WHERE user_id=%s",
            (user_id,)
        )

        existing_resume = cursor.fetchone()

        if existing_resume:

            cursor.execute(
                """
                UPDATE resumes
                SET
                full_name=%s,
                email=%s,
                phone=%s,
                linkedin=%s,
                summary=%s,
                skills=%s,
                education=%s,
                experience=%s,
                projects=%s
                WHERE user_id=%s
                """,
                (
                    data.get("full_name"),
                    data.get("email"),
                    data.get("phone"),
                    data.get("linkedin"),
                    data.get("summary"),
                    data.get("skills"),
                    data.get("education"),
                    data.get("experience"),
                    data.get("projects"),
                    user_id
                )
            )

        else:

            cursor.execute(
                """
                INSERT INTO resumes
                (
                    user_id,
                    full_name,
                    email,
                    phone,
                    linkedin,
                    summary,
                    skills,
                    education,
                    experience,
                    projects
                )
                VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                """,
                (
                    user_id,
                    data.get("full_name"),
                    data.get("email"),
                    data.get("phone"),
                    data.get("linkedin"),
                    data.get("summary"),
                    data.get("skills"),
                    data.get("education"),
                    data.get("experience"),
                    data.get("projects")
                )
            )

        db.commit()

        return jsonify({
            "success": True,
            "message": "Resume Saved Successfully"
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })


# ==========================
# GET RESUME
# ==========================

@resume.route("/resume/<int:user_id>", methods=["GET"])
def get_resume(user_id):

    try:

        cursor.execute(
            """
            SELECT
            full_name,
            email,
            phone,
            linkedin,
            summary,
            skills,
            education,
            experience,
            projects
            FROM resumes
            WHERE user_id=%s
            """,
            (user_id,)
        )

        data = cursor.fetchone()

        if not data:

            return jsonify({
                "success": False,
                "message": "Resume Not Found"
            })

        resume_data = {
            "full_name": data[0],
            "email": data[1],
            "phone": data[2],
            "linkedin": data[3],
            "summary": data[4],
            "skills": data[5],
            "education": data[6],
            "experience": data[7],
            "projects": data[8]
        }

        return jsonify({
            "success": True,
            "resume": resume_data
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })


# ==========================
# ATS SCORE
# ==========================

@resume.route("/ats-score/<int:user_id>", methods=["GET"])
def ats_score(user_id):

    try:

        cursor.execute(
            """
            SELECT
            full_name,
            email,
            phone,
            summary,
            skills,
            education,
            experience,
            projects
            FROM resumes
            WHERE user_id=%s
            """,
            (user_id,)
        )

        data = cursor.fetchone()

        if not data:

            return jsonify({
                "success": False,
                "score": 0
            })

        full_name = data[0] or ""
        email = data[1] or ""
        phone = data[2] or ""
        summary = data[3] or ""
        skills = data[4] or ""
        education = data[5] or ""
        experience = data[6] or ""
        projects = data[7] or ""

        score = 0

        # Contact Information (10)

        if full_name:
            score += 3

        if email:
            score += 4

        if phone:
            score += 3

        # Summary (15)

        summary_words = len(summary.split())

        if summary_words >= 50:
            score += 15

        elif summary_words >= 25:
            score += 10

        elif summary_words >= 10:
            score += 5

        # Skills (25)

        skill_count = len(
            [s.strip() for s in skills.split(",") if s.strip()]
        )

        if skill_count >= 10:
            score += 25

        elif skill_count >= 6:
            score += 18

        elif skill_count >= 3:
            score += 10

        # Education (15)

        if len(education.strip()) > 20:
            score += 15

        # Experience (20)

        if len(experience.strip()) > 150:
            score += 20

        elif len(experience.strip()) > 50:
            score += 10

        # Projects (15)

        if len(projects.strip()) > 150:
            score += 15

        elif len(projects.strip()) > 50:
            score += 8

        return jsonify({
            "success": True,
            "score": score
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })
    

# ==========================
# AI SUGGESTIONS
# ==========================

@resume.route("/ai-suggestions/<int:user_id>", methods=["GET"])
def ai_suggestions(user_id):

    try:

        cursor.execute(
            """
            SELECT
            summary,
            skills,
            education,
            experience,
            projects
            FROM resumes
            WHERE user_id=%s
            """,
            (user_id,)
        )

        data = cursor.fetchone()

        suggestions = []

        if not data:

            suggestions.append(
                "Create your resume first."
            )

        else:

            summary = data[0] or ""
            skills = data[1] or ""
            education = data[2] or ""
            experience = data[3] or ""
            projects = data[4] or ""

            skill_count = len(
                [s.strip() for s in skills.split(",") if s.strip()]
            )

            if len(summary.split()) < 30:
                suggestions.append(
                    "Add a stronger professional summary with at least 30 words."
                )

            if skill_count < 5:
                suggestions.append(
                    "Add more technical skills relevant to your target job."
                )

            if len(education.strip()) < 20:
                suggestions.append(
                    "Provide complete education details including degree and institution."
                )

            if len(experience.strip()) < 100:
                suggestions.append(
                    "Expand your experience section with responsibilities and achievements."
                )

            if len(projects.strip()) < 100:
                suggestions.append(
                    "Add detailed project descriptions including technologies used."
                )

            if len(suggestions) == 0:

                suggestions.append(
                    "Excellent resume. Your content is well structured and ATS friendly."
                )

        return jsonify({
            "success": True,
            "suggestions": suggestions
        })

    except Exception as e:

        return jsonify({
            "success": False,
            "message": str(e)
        })