"use client";

import { useState, useEffect } from "react";
import "../../../authentication/authentication.css";
import Link from "next/link";
import { login } from "../../../../utils/restClient"; // Adjust path accordingly
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // Pre-fill the username if saved in localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem("rememberedUsername");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true); // Set checkbox to true if a username is found
    }
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password); // Ensure login sets the token

      const token = localStorage.getItem("token");
      if (token) {
        console.log("Login successful, redirecting to dashboard...");

        // Store token in cookies (for server-side use) with 1-hour expiry
        setCookie("token", token, { maxAge: 60 * 1, path: "/" });//5 sec

        // Remember username if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem("rememberedUsername", username);
        } else {
          localStorage.removeItem("rememberedUsername");
        }

        {/* SessionExpiryHandler is invoked with a 5-second delay */ }
        // <SessionExpiryHandler delay={5000} />

        // Clear localStorage and cookie after 5 seconds  
        setTimeout(() => {
          localStorage.clear();
          // Clears all items in localStorage    
          setCookie("token", "", { maxAge: -1, path: "/" });
          // Deletes the "token" cookie   
          console.log("localStorage and cookie cleared after 5 minutes");
          // alert("Session Expired !! SignIn again");
          // router.push("/authentication/card/sign-in");
          // }, 5000); // 5 seconds delay 
        }, 300000); // 300000 milliseconds = 5 minutes




        // Redirect to the dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 100); // Delay in milliseconds


      } else {
        setError("Failed to store token");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="custom-font">
      <div className="d-flex justify-content-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY9gZOyxWEo6BNSod3lRTsdQYkFFpFEDe7BQ&s"
          alt="Logo"
          className="img-fluid mb-4"
          style={{ width: "50px" }}
        />
      </div>

      <h5 className="text-center lh-sm mx-0 my-1 fw-700">Sign In</h5>
      <p className="text-center lh-sm mb-4">Get access to your account</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-700 opacity-50">
            Email address
          </label>
          <div className="position-relative">
            <i className="bi bi-person-fill position-absolute top-50 start-0 translate-middle-y px-2"></i>
            <input
              type="email"
              className="form-control form-control-sm ps-4 small-placeholder"
              id="email"
              placeholder="Enter email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="form-label fw-700 opacity-50">
            Password
          </label>
          <div className="position-relative">
            <i className="bi bi-person-fill position-absolute top-50 start-0 translate-middle-y px-2"></i>
            <button
              className="btn btn  position-absolute top-50 end-0 translate-middle-y px-2"
              type="button"
              onClick={togglePassword}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control form-control-sm ps-4 small-placeholder"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="d-flex">
          <div className="py-1 flex-fill">
            <div className="mb-2 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                className="form-check-label opacity-50 fw-700"
                htmlFor="exampleCheck1"
              >
                Remember me
              </label>
            </div>
          </div>
          <div className="py-1 flex-fill text-end">
            <a className="text-decoration-none" href="/authentication/card/change-password">
              Forgot Password?
            </a>
          </div>
        </div>

        <button type="submit" className="btn btn  btn-primary w-100 mb-3">
          <span className="custom-font">Sign In</span>
        </button>

        <div className="d-flex">
          <div className="flex-fill text-center"></div>
        </div>
      </form>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}
// Here’s a simplified version of the **Key Changes** for a layman:

// 1. **"Remember Me" Checkbox Added:**
//    - A checkbox labeled "Remember Me" is added so the user can choose to save their email for future logins.

// 2. **Save Email Locally:**
//    - If "Remember Me" is checked, the email is saved on the user's device (local storage).
//    - When the user comes back, the saved email is automatically filled in the email field.

// 3. **Pre-filled Email:**
//    - If the email was saved earlier, it shows up in the email box when the page loads, so the user doesn’t have to type it again.

// 4. **Checkbox Behavior:**
//    - The checkbox stays checked if the email was saved previously.
//    - The user can uncheck it if they don’t want their email to be remembered anymore.

// ---

// This ensures the form becomes smarter and easier to use!