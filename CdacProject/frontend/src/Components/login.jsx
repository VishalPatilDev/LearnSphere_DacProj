import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Navbar from "./Navbar";
import authService from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Store JWT token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", data.userId.toString());
        localStorage.setItem("role", data.role);
        
        // Get additional user details using the current user endpoint
        try {
          const userDetailsResponse = await fetch(
            "http://localhost:8080/api/users/current",
            {
              headers: authService.getAuthHeaders()
            }
          );

          if (userDetailsResponse.ok) {
            const userDetails = await userDetailsResponse.json();
            localStorage.setItem("name", userDetails.username);
            localStorage.setItem("id", userDetails.id.toString());
            
            setUser({ 
              name: userDetails.username, 
              email: userDetails.email, 
              id: userDetails.id,
              role: data.role
            });

            // Navigate based on role
            if (data.role === 'ADMIN') {
              navigate("/dashboard");
            } else {
              navigate("/courses");
            }
          } else {
            setError("Failed to fetch user details.");
          }
        } catch (detailsError) {
          console.error("Error fetching user details:", detailsError);
          // Still navigate even if details fail
          if (data.role === 'ADMIN') {
            navigate("/dashboard");
          } else {
            navigate("/courses");
          }
        }
      } else {
        const errorData = await response.text();
        setError(errorData || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth">
        <div className="container">
          <h3>Welcome!</h3>
          <br></br>
          <h2>Login</h2>
          <br />
          <form autoComplete="off" className="form-group" onSubmit={login}>
            <label htmlFor="email">Email Id :</label>
            <input
              type="email"
              className="form-control"
              style={{ width: "100%", marginRight: "50px" }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <br />
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              className="form-control"
              style={{ width: "100%" }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <br />
            <div className="btn1">
              <button 
                type="submit" 
                className="btn btn-success btn-md mybtn"
                disabled={loading}
              >
                {loading ? "LOGGING IN..." : "LOGIN"}
              </button>
            </div>
          </form>
          {error && <span className="error-msg">{error}</span>}
          <br />
          <span>
            Don't have an account? Register
            <Link to="/register"> Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Login;
