import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";

import ResumeBuilder from "./ResumeBuilder";
import ResumePreview from "./ResumePreview";
import ATSScore from "./ATSScore";
import AISuggestions from "./AISuggestions";
import JobMatching from "./JobMatching";

import "../assets/Dashboard.css";
import "../assets/Theme.css";

function Dashboard() {

    const [section, setSection] =
        useState("profile");

    const [theme, setTheme] =
        useState(
            localStorage.getItem("theme")
            || "dark"
        );

    useEffect(() => {

        document.body.className =
            theme;

    }, [theme]);

    return (

        <div
            className={
                `dashboard ${theme}`
            }
        >

            <Sidebar
                setSection={
                    setSection
                }
                theme={theme}
                setTheme={
                    setTheme
                }
            />

            <div
                className="content"
            >

                {
                    section ===
                    "profile" &&
                    <ResumeBuilder />
                }

                {
                    section ===
                    "preview" &&
                    <ResumePreview />
                }

                {
                    section ===
                    "ats" &&
                    <ATSScore />
                }

                {
                    section ===
                    "job" &&
                    <JobMatching />
                }

                {
                    section ===
                    "ai" &&
                    <AISuggestions />
                }

            </div>

        </div>

    );

}

export default Dashboard;