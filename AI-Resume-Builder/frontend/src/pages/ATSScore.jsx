import { useEffect, useState } from "react";
import axios from "axios";

function ATSScore() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [score, setScore] =
        useState(0);

    const [suggestions,
        setSuggestions] =
        useState([]);

    useEffect(() => {

        getATSScore();
        getSuggestions();

    }, []);

    const getATSScore =
        async () => {

        try {

            const response =
                await axios.get(
                    `http://127.0.0.1:5000/ats-score/${user.id}`
                );

            if (
                response.data.success
            ) {

                setScore(
                    response.data.score
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    const getSuggestions =
        async () => {

        try {

            const response =
                await axios.get(
                    `http://127.0.0.1:5000/ai-suggestions/${user.id}`
                );

            if (
                response.data.success
            ) {

                setSuggestions(
                    response.data.suggestions
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    const getColor = () => {

        if (score >= 80)
            return "#22c55e";

        if (score >= 60)
            return "#eab308";

        return "#ef4444";

    };

    return (

        <div>

            <h1
                style={{
                    marginBottom:"20px"
                }}
            >
                ATS Score Analysis
            </h1>

            {/* Score Card */}

            <div className="card">

                <div
                    style={{
                        display:"flex",
                        justifyContent:"center"
                    }}
                >

                    <div

                        style={{

                            width:"180px",
                            height:"180px",

                            borderRadius:"50%",

                            border:
                            `12px solid ${getColor()}`,

                            display:"flex",

                            justifyContent:"center",

                            alignItems:"center"

                        }}

                    >

                        <div
                            className=
                            "ats-score"
                            style={{
                                color:
                                getColor()
                            }}
                        >
                            {score}
                        </div>

                    </div>

                </div>

                <div
                    className=
                    "ats-label"
                >

                    ATS Compatibility Score

                </div>

            </div>

            {/* Score Status */}

            <div className="card">

                <h2>
                    Score Status
                </h2>

                {

                    score >= 80 &&

                    <p>
                        Excellent Resume.
                        Your resume is highly ATS friendly.
                    </p>

                }

                {

                    score >= 60 &&
                    score < 80 &&

                    <p>
                        Good Resume.
                        Some improvements can increase visibility.
                    </p>

                }

                {

                    score < 60 &&

                    <p>
                        Resume needs improvement.
                        Add more information and skills.
                    </p>

                }

            </div>

            {/* Suggestions */}

            <div className="card">

                <h2>
                    ATS Improvement Tips
                </h2>

                {

                    suggestions.length === 0 ?

                    (

                        <div
                            className=
                            "ai-item"
                        >

                            Excellent!
                            No major improvements needed.

                        </div>

                    )

                    :

                    suggestions.map(
                        (
                            item,
                            index
                        ) => (

                            <div
                                key={index}
                                className=
                                "ai-item"
                            >
                                {item}
                            </div>

                        )
                    )

                }

            </div>

            {/* Breakdown */}

            <div className="card">

                <h2>
                    ATS Scoring Breakdown
                </h2>

                <ul
                    style={{
                        lineHeight:"2"
                    }}
                >

                    <li>
                        Professional Summary
                        = 20 Points
                    </li>

                    <li>
                        Skills Section
                        = 20 Points
                    </li>

                    <li>
                        Education
                        = 20 Points
                    </li>

                    <li>
                        Experience
                        = 20 Points
                    </li>

                    <li>
                        Projects
                        = 20 Points
                    </li>

                </ul>

            </div>

        </div>

    );

}

export default ATSScore;