import { useState } from "react";
import axios from "axios";

function ResumeBuilder() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [resume, setResume] =
        useState({

            full_name: "",
            email: "",
            phone: "",
            linkedin: "",
            summary: "",
            skills: "",
            education: "",
            experience: "",
            projects: ""

        });

    const handleChange = (e) => {

        setResume({

            ...resume,
            [e.target.name]:
            e.target.value

        });

    };

    const calculateCompletion =
        () => {

        let completed = 0;

        if(resume.full_name)
            completed++;

        if(resume.email)
            completed++;

        if(resume.phone)
            completed++;

        if(resume.linkedin)
            completed++;

        if(resume.summary)
            completed++;

        if(resume.skills)
            completed++;

        if(resume.education)
            completed++;

        if(resume.experience)
            completed++;

        if(resume.projects)
            completed++;

        return Math.floor(
            (completed / 9) * 100
        );

    };

    const saveResume = async (e) => {

        e.preventDefault();

        try {

            const response =
            await axios.post(

                "https://backend-production-5416.up.railway.app/save-resume",

                {

                    ...resume,
                    user_id: user.id

                }

            );

            alert(
                response.data.message
            );

        }

        catch(error){

            console.log(error);

            alert(
                "Failed To Save Resume"
            );

        }

    };

    return (

        <div>

            <h1
                style={{
                    marginBottom:"20px"
                }}
            >
                Resume Builder
            </h1>

            {/* Completion */}

            <div className="card">

                <h3>
                    Profile Completion
                </h3>

                <div
                    className=
                    "progress-container"
                >

                    <div

                        className=
                        "progress-fill"

                        style={{

                            width:
                            `${calculateCompletion()}%`

                        }}

                    ></div>

                </div>

                <p
                    style={{
                        marginTop:"10px"
                    }}
                >
                    {
                        calculateCompletion()
                    }
                    %
                </p>

            </div>

            <form
                onSubmit={saveResume}
            >

                {/* Contact */}

                <div className="card">

                    <h2>
                        Contact Information
                    </h2>

                    <div
                        className=
                        "form-grid"
                    >

                        <input
                            type="text"
                            name="full_name"
                            placeholder=
                            "Full Name"
                            onChange=
                            {handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder=
                            "Email Address"
                            onChange=
                            {handleChange}
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder=
                            "Phone Number"
                            onChange=
                            {handleChange}
                        />

                        <input
                            type="text"
                            name="linkedin"
                            placeholder=
                            "LinkedIn URL"
                            onChange=
                            {handleChange}
                        />

                    </div>

                </div>

                {/* Summary */}

                <div className="card">

                    <h2>
                        Professional Summary
                    </h2>

                    <textarea

                        name="summary"

                        placeholder=
                        "Write a professional summary about yourself..."

                        onChange=
                        {handleChange}

                    />

                </div>

                {/* Skills */}

                <div className="card">

                    <h2>
                        Skills
                    </h2>

                    <textarea

                        name="skills"

                        placeholder=
                        "Python, React, Flask, MySQL, HTML, CSS..."

                        onChange=
                        {handleChange}

                    />

                </div>

                {/* Education */}

                <div className="card">

                    <h2>
                        Education
                    </h2>

                    <textarea

                        name="education"

                        placeholder=
                        "B.Tech, College Name, CGPA..."

                        onChange=
                        {handleChange}

                    />

                </div>

                {/* Experience */}

                <div className="card">

                    <h2>
                        Experience
                    </h2>

                    <textarea

                        name="experience"

                        placeholder=
                        "Internships, Freelance, Work Experience..."

                        onChange=
                        {handleChange}

                    />

                </div>

                {/* Projects */}

                <div className="card">

                    <h2>
                        Projects
                    </h2>

                    <textarea

                        name="projects"

                        placeholder=
                        "AI Resume Builder, Job Portal..."

                        onChange=
                        {handleChange}

                    />

                </div>

                <button
                    type="submit"
                    className="save-btn"
                >
                    Save Resume
                </button>

            </form>

        </div>

    );

}

export default ResumeBuilder;
