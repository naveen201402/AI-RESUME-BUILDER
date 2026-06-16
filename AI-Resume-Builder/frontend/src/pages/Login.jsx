import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../assets/Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {

            alert(
                "Please fill all fields"
            );

            return;
        }

        try {

            setLoading(true);

            const response =
                await axios.post(
                    "https://backend-production-5416.up.railway.app/login",
                    {
                        email,
                        password
                    }
                );

            if (
                response.data.success
            ) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        response.data.user
                    )
                );

                alert(
                    "Login Successful"
                );

                navigate("/dashboard", { replace: true });
                );

            }
             else {

                alert(
                    response.data.message
                );

            }

        } catch (error) {

            console.log(error);

            alert(
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1
                    className="login-title"
                >
                    ResumeAI
                </h1>

                <p
                    className="login-subtitle"
                >
                    AI Resume Builder
                    with Job Matching
                </p>

                <form
                    className="login-form"
                    onSubmit={
                        handleLogin
                    }
                >

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        required
                    />

                    <button
                        type="submit"
                        className="login-btn"
                    >

                        {
                            loading
                            ? "Please Wait..."
                            : "Login"
                        }

                    </button>

                </form>

                <div
                    className="register-text"
                >

                    Don't have an account?

                </div>

                <button
                    className="register-link-btn"
                    type="button"
                    onClick={() =>
                        navigate(
                            "/register"
                        )
                    }
                >
                    Create Account
                </button>

            </div>

        </div>

    );

}

export default Login;
