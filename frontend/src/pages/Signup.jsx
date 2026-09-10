import { useState } from "react";
import "./Signup.css";

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();

        const response = await fetch(
            "http://localhost:5000/api/auth/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        console.log(data);

        setUsername("");
        setEmail("");
        setPassword("");

        if (response.ok) {
            window.location.href = "/login";
        }
    };

    return (
        <div className="signup-container">

            <div className="signup-box">

                <h1 className="signup-title">
                    Create Account
                </h1>

                <p className="signup-subtitle">
                    Join the community and start sharing
                    your thoughts with others
                </p>

                <form
                    className="signup-form"
                    onSubmit={handleSignup}
                >

                    <label>Username</label>

                    <input
                        className="signup-input"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <label>Email</label>

                    <input
                        className="signup-input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <label>Password</label>

                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="signup-button"
                        type="submit"
                    >
                        Sign Up
                    </button>

                </form>



                <p className="switch-login">
                    Already have an account?

                    <button
                        onClick={() =>
                            window.location.href = "/login"
                        }
                    >
                        Log In
                    </button>
                </p>

            </div>

        </div>
    );
}

export default Signup;