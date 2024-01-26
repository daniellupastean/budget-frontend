import { useState } from "react";
import "./Login.scss";
import { API_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        localStorage.setItem("token", loginData?.accessToken);
        const userDataResponse = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.accessToken}`,
          },
        });
        if (userDataResponse.ok) {
          const userData = await userDataResponse.json();
          localStorage.setItem("user", JSON.stringify(userData));
          navigate("/accounts");
        }
      }
    } catch (error) {}
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
