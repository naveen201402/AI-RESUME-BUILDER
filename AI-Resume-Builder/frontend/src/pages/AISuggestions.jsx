import { useEffect, useState } from "react";
import axios from "axios";

function AISuggestions() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [suggestions,
        setSuggestions] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        getSuggestions();

    }, []);

    const getSuggestions =
        async () => {

        try {

            const response =
                await axios.get(
                    `https://backend-production-5416.up.railway.app/ai-suggestions/${user.id}`
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

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <h1
                style={{
                    marginBottom:"20px"
                }}
            >
                AI Resume Suggestions
            </h1>

            {/* Loading */}

            {

                loading &&

                <div className="card">

                    Loading AI Suggestions...

                </div>

            }

            {/* Suggestions */}

            {

                !loading &&

                <div className="card">

                    <h2>
                        Resume Improvements
                    </h2>

                    {

                        suggestions.length === 0 ?

                        (

                            <div
                                className="ai-item"
                            >

                                🎉 Excellent Resume!

                                <br /><br />

                                Your resume already contains
                                all important sections and
                                is ATS-friendly.

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
                                    className="ai-item"
                                >

                                    💡 {item}

                                </div>

                            )
                        )

                    }

                </div>

            }

            {/* Recommended Skills */}

            <div className="card">

                <h2>
                    Recommended Skills
                </h2>

                <div
                    className="ai-item"
                >
                    Python
                </div>

                <div
                    className="ai-item"
                >
                    React JS
                </div>

                <div
                    className="ai-item"
                >
                    Flask
                </div>

                <div
                    className="ai-item"
                >
                    MySQL
                </div>

                <div
                    className="ai-item"
                >
                    REST APIs
                </div>

                <div
                    className="ai-item"
                >
                    Git & GitHub
                </div>

            </div>

            {/* Resume Tips */}

            <div className="card">

                <h2>
                    AI Career Tips
                </h2>

                <div
                    className="ai-item"
                >
                    Add measurable achievements in projects.
                </div>

                <div
                    className="ai-item"
                >
                    Keep resume length within 1-2 pages.
                </div>

                <div
                    className="ai-item"
                >
                    Use job-specific keywords.
                </div>

                <div
                    className="ai-item"
                >
                    Add internships and certifications.
                </div>

                <div
                    className="ai-item"
                >
                    Maintain a professional LinkedIn profile.
                </div>

            </div>

        </div>

    );

}

export default AISuggestions;
