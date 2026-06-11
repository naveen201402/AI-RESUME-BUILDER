import { useState } from "react";
import {
    FaUser,
    FaEye,
    FaChartBar,
    FaBriefcase,
    FaRobot,
    FaBars,
    FaSignOutAlt,
    FaMoon,
    FaSun
} from "react-icons/fa";

function Sidebar({
    setSection,
    theme,
    setTheme
}) {

    const [collapsed, setCollapsed] =
        useState(false);

    const logout = () => {

        localStorage.removeItem("user");

        window.location.href = "/";

    };

    const toggleTheme = () => {

        if (theme === "dark") {

            setTheme("light");

            localStorage.setItem(
                "theme",
                "light"
            );

        } else {

            setTheme("dark");

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

    };

    return (

        <div
            className={
                collapsed
                ? "sidebar collapsed"
                : "sidebar"
            }
        >

            {/* Toggle Sidebar */}

            <button
                className="toggle-btn"
                onClick={() =>
                    setCollapsed(
                        !collapsed
                    )
                }
            >
                <FaBars />
            </button>

            {/* Logo */}

            <div className="logo">

                {
                    collapsed
                    ? "RA"
                    : "ResumeAI"
                }

                {
                    !collapsed &&
                    <p>
                        AI Resume Builder
                    </p>
                }

            </div>

            {/* Menu */}

            <div className="menu">

                <button
                    onClick={() =>
                        setSection(
                            "profile"
                        )
                    }
                >
                    <FaUser />

                    {
                        !collapsed &&
                        "Profile"
                    }
                </button>

                <button
                    onClick={() =>
                        setSection(
                            "preview"
                        )
                    }
                >
                    <FaEye />

                    {
                        !collapsed &&
                        "Resume Preview"
                    }
                </button>

                <button
                    onClick={() =>
                        setSection(
                            "ats"
                        )
                    }
                >
                    <FaChartBar />

                    {
                        !collapsed &&
                        "ATS Score"
                    }
                </button>

                <button
                    onClick={() =>
                        setSection(
                            "job"
                        )
                    }
                >
                    <FaBriefcase />

                    {
                        !collapsed &&
                        "Job Matching"
                    }
                </button>

                <button
                    onClick={() =>
                        setSection(
                            "ai"
                        )
                    }
                >
                    <FaRobot />

                    {
                        !collapsed &&
                        "AI Suggestions"
                    }
                </button>

            </div>

            {/* Theme Button */}

            <button
                className="theme-btn"
                onClick={toggleTheme}
            >

                {
                    theme === "dark"
                    ? <FaSun />
                    : <FaMoon />
                }

                {
                    !collapsed &&
                    (
                        theme === "dark"
                        ? " Light Mode"
                        : " Dark Mode"
                    )
                }

            </button>

            {/* Logout */}

            <button
                className="theme-btn"
                style={{
                    marginTop: "10px"
                }}
                onClick={logout}
            >

                <FaSignOutAlt />

                {
                    !collapsed &&
                    " Logout"
                }

            </button>

        </div>

    );

}

export default Sidebar;