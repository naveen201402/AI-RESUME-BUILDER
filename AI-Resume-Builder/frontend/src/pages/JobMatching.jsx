import { useEffect, useState } from "react";
import axios from "axios";

function JobMatching() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        getJobs();

    }, []);

    const getJobs = async () => {

        try {

            const response =
                await axios.get(
                    `http://127.0.0.1:5000/jobs/${user.id}`
                );

            if (
                response.data.success
            ) {

                setJobs(
                    response.data.jobs
                );

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const applyJob = (job) => {

        alert(
            `Applied Successfully for ${job.title}`
        );

    };

    return (

        <div>

            <h1
                style={{
                    marginBottom:"20px"
                }}
            >
                Job Matching
            </h1>

            {

                loading &&

                <div className="card">
                    Loading Jobs...
                </div>

            }

            {

                !loading &&
                jobs.length === 0 &&

                <div className="card">

                    No matching jobs found.

                </div>

            }

            {

                jobs.map(
                    (job, index) => (

                        <div
                            key={index}
                            className="job-card"
                        >

                            <div
                                className="job-title"
                            >
                                {job.title}
                            </div>

                            <div
                                className="job-company"
                            >
                                {job.company}
                            </div>

                            <p
                                style={{
                                    marginTop:"10px"
                                }}
                            >
                                {
                                    job.description
                                }
                            </p>

                            <div
                                className="match-score"
                            >
                                Match Score:
                                {" "}
                                {
                                    job.match_percentage
                                }
                                %
                            </div>



                        </div>

                    )
                )

            }

        </div>

    );

}

export default JobMatching;