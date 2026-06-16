import { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResumePreview() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [resume, setResume] =
        useState(null);

    const resumeRef = useRef();

    useEffect(() => {

        getResume();

    }, []);

    const getResume = async () => {

        try {

            const response =
                await axios.get(
                    `https://backend-production-5416.up.railway.app/resume/${user.id}`
                );

            if (
                response.data.success
            ) {

                setResume(
                    response.data.resume
                );

            }

        } catch (error) {

            console.log(error);

        }

    };

    const downloadPDF =
        async () => {

        const input =
            resumeRef.current;

        const canvas =
            await html2canvas(
                input,
                {
                    scale: 2
                }
            );

        const imgData =
            canvas.toDataURL(
                "image/png"
            );

        const pdf =
            new jsPDF(
                "p",
                "mm",
                "a4"
            );

        const pdfWidth =
            pdf.internal.pageSize.getWidth();

        const pdfHeight =
            (
                canvas.height *
                pdfWidth
            ) /
            canvas.width;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight
        );

        pdf.save(
            "Resume.pdf"
        );

    };

    if (!resume) {

        return (

            <div className="card">

                <h2>
                    No Resume Found
                </h2>

                <p>
                    Save your resume first.
                </p>

            </div>

        );

    }

    return (

        <div>

            <div
                style={{
                    display:"flex",
                    justifyContent:
                    "space-between",
                    marginBottom:"20px"
                }}
            >

                <h1>
                    Resume Preview
                </h1>

                <button
                    className="save-btn"
                    onClick={
                        downloadPDF
                    }
                >
                    Download PDF
                </button>

            </div>

            <div
                ref={resumeRef}
                className=
                "card resume-preview"
            >

                <div
                    className=
                    "resume-header"
                >

                    <div
                        className=
                        "resume-name"
                    >
                        {
                            resume.full_name
                        }
                    </div>

                    <p>
                        {
                            resume.email
                        }
                    </p>

                    <p>
                        {
                            resume.phone
                        }
                    </p>

                    <p>
                        {
                            resume.linkedin
                        }
                    </p>

                </div>

                <div
                    className=
                    "resume-section"
                >

                    <h3>
                        Professional Summary
                    </h3>

                    <p>
                        {
                            resume.summary
                        }
                    </p>

                </div>

                <div
                    className=
                    "resume-section"
                >

                    <h3>
                        Skills
                    </h3>

                    <p>
                        {
                            resume.skills
                        }
                    </p>

                </div>

                <div
                    className=
                    "resume-section"
                >

                    <h3>
                        Education
                    </h3>

                    <p>
                        {
                            resume.education
                        }
                    </p>

                </div>

                <div
                    className=
                    "resume-section"
                >

                    <h3>
                        Experience
                    </h3>

                    <p>
                        {
                            resume.experience
                        }
                    </p>

                </div>

                <div
                    className=
                    "resume-section"
                >

                    <h3>
                        Projects
                    </h3>

                    <p>
                        {
                            resume.projects
                        }
                    </p>

                </div>

            </div>

        </div>

    );

}

export default ResumePreview;
