import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../assets/Register.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] =
        useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response =
                await axios.post(
                    "http://127.0.0.1:5000/register",
                    {
                        name,
                        email,
                        password
                    }
                );

            if (response.data.success) {

                alert(
                    "Registration Successful"
                );

                navigate("/");

            } else {

                alert(
                    response.data.message
                );

            }

        } catch (error) {

            console.log(error);

            alert(
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1 className="login-title">
                    ResumeAI
                </h1>

                <p className="login-subtitle">
                    Create Your Account
                </p>

                <form
                    className="login-form"
                    onSubmit={handleRegister}
                >

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                        required
                    />

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
                            : "Register"
                        }
                    </button>

                </form>

                <div className="register-text">
                    Already have an account?
                </div>

                <button
                    className="register-link-btn"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Login
                </button>

            </div>

        </div>

    );

}

export default Register;