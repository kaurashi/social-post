import { useState } from "react";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://social-post-c1bg.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                window.location.href = "/feed";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log("Login error:", error);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <h1>Welcome back!</h1>

                <p className="auth-subtitle">
                    Sign in to access your social feed,
                    connect with others and share your thoughts
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>Password</label>

                    <div className="password-box">

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? "◉" : "◌"}
                        </button>

                    </div>

                    <div className="login-options">

                        <label className="remember">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>

                        <button
                            type="button"
                            className="forgot"
                        >
                            Forgot password?
                        </button>

                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                    >
                        Log In
                    </button>

                </form>


                <p className="switch-auth">
                    Don't have an account?
                    <button
                        onClick={() =>
                            window.location.href = "/"
                        }
                    >
                        Sign Up
                    </button>
                </p>

            </div>

        </div>
    );
}

export default Login;