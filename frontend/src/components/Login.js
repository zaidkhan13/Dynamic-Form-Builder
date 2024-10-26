import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/styles/login.css";

const Login = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    try {
      // Sending login credentials to the backend API
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specifying JSON format in request body
        },
        body: JSON.stringify({
          email: credentials.email, // Extract email from credentials state
          password: credentials.password, // Extract password from credentials state
        }),
      });

      const parsedData = await response.json(); // Parse the response from the server

      // Check if the login is successful based on backend response
      if (parsedData.success) {
        // Save the auth token to local storage if login is successful
        localStorage.setItem("dfbToken", parsedData.authToken);

        // Update the state to indicate the user is logged in
        props.setToken(true);

        // Show success alert and navigate to the home page
        props.showAlert("success", "Successfully logged in!");
        navigate("/");
      } else {
        // Handle invalid credentials scenario
        props.showAlert("danger", "Invalid Credentials");

        // Clear the input fields in case of failed login attempt
        setCredentials({ email: "", password: "" });
      }
    } catch (error) {
      // Catch any network or server errors and display a general error message
      console.error("Login failed:", error.message);
      props.showAlert(
        "danger",
        "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div className="outer-container pt-15 pb-4 px-4">
      <div className="myContainer text-center">
        <div className="logo">
          <img
            className="mb-20"
            src={logo}
            alt="Error"
            width={50}
            height={50}
          />
          <h2 className="mb-20 text-light">Sign in</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              placeholder="Email"
              value={credentials.email}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleOnChange}
              placeholder="Password"
              value={credentials.password}
              minLength={6}
              required
            />
          </div>
          <button type="submit" className="myBtn mb-4">
            Log in
          </button>
          <div className="divider mb-3">
            <span className="line"></span>
            <span className="text">or</span>
            <span className="line"></span>
          </div>
          <div
            className="text mb-3"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Don't have an account? <span className="myLink">Sign up</span>
          </div>
          <div
            className="text"
            onClick={() => {
              navigate("/");
            }}
          >
            Want to go back? <span className="myLink">Home</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
