// import { useAuth } from '../hooks/useAuth';
import "../assets/styles/LoginPage.scss";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { validator } from "sequelize/lib/utils/validator-extras";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, authStatus } = useAuth();
  let location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [invalidCreds, setInvalidCreds] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmail = (email: string) => {
    if (validator.isEmail(username)) {
      setError("");
    }
    setUsername(email);
  };

  const handlePassword = (pass: string) => {
    setInvalidCreds("");
    setPassword(pass);
  };

  const handleLogin = async () => {
    if (username === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    if (!validator.isEmail(username)) {
      setError("Email is invalid");
      return;
    }

    try {
      setLoading(true);
      await login({
        email: username,
        password,
      })
        .then((success) => {
          if (success) {
            navigate("/"); // Replace with your desired redirect path
          } else {
            setInvalidCreds("Invalid credentials");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error, e.g., display error message
    }
  };

  if (authStatus) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div className="login-page">
      <div className="login-page-container">
        <h1>Login</h1>
        <p className="invalid-creds">{invalidCreds}</p>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => handleEmail(e.target.value)}
        />
        <p className="email-error">{error}</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
        />

        <button id="login" onClick={handleLogin}>
          {!loading ? <>Login</> : <div className="spinner"></div>}
        </button>
        <button id="signup" onClick={() => navigate("/signup")}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
