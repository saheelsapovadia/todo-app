import { useState } from "react";
import "../assets/styles/LoginPage.scss";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utilities/AxiosInterceptor";
import { BACKEND_URL } from "../Utilities/generate";
import { validator } from "sequelize/lib/utils/validator-extras";
const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [invalidCreds, setInvalidCreds] = useState("");

  const handleEmail = (email: string) => {
    if (validator.isEmail(email)) {
      setError("");
    }
    setEmail(email);
  };

  const handleSignup = () => {
    if (
      email === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (!validator.isEmail(email)) {
      setError("Email is invalid");
      return;
    }
    if (password !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    setLoading(true);
    axiosInstance
      .post(`${BACKEND_URL}api/register`, {
        email,
        name: username,
        password,
        role: "dev",
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
        }
        setLoading(false);
      })
      .catch((_err) => {});
  };

  return (
    <div className="login-page">
      <div className="login-page-container">
        <h1>Sign up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => handleEmail(e.target.value)}
        />
        <p className="email-error">{error}</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="email-error"></p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="email-error"></p>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p className="email-error"></p>
        <button id="login" onClick={handleSignup}>
          {!loading ? <>Sign up</> : <div className="spinner"></div>}
        </button>
        <button id="signup" onClick={() => navigate("/login")}>
          Go to login
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
