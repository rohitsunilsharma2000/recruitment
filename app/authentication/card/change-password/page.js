"use client";

import { useState } from "react";
import "../../../authentication/authentication.css";
import Link from "next/link";
import { changePassword } from "@/utils/restClient";

export default function ChangePassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [apiStatus, setApiStatus] = useState("");
  const [errors, setErrors] = useState("");



  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(value));
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    validatePasswords(value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validatePasswords(newPassword, value);
  };

  const validatePasswords = (password, confirm) => {
    if (password && confirm) {
      setPasswordMatch(password === confirm);
    } else {
      setPasswordMatch(null);
    }
  };

  // API request payload
  const payload = {
    username: email,
    password: confirmPassword
  };

  async function changePasswordService(payload) {
    try {
      const createdUser = await changePassword(payload); // Call the API function

      // Handle successful response
      alert("User created successfully for :", email);
      setApiStatus(` Password updated successfully for  : ${email}`);
      // alert(`User created successfully for : ${createdUser.email}`);

    } catch (error) {
      console.error("Error creating user:", error);
      setErrors("Failed to change  password. Please try again.");
    } finally {
      // Clear all form fields
      setShowNewPassword("");
      setShowConfirmPassword("");
      setEmail("");
      setEmailValid("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMatch("");
      setApiStatus("");
      setErrors("");

      // Reset any other state as necessary
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValid && passwordMatch) {
      console.log("Form submitted:", { email, newPassword });
      // Proceed with your form submission logic
      changePasswordService(payload);
      // alert("Proceed with your form submission logic")
    } else {
      console.log("Fix errors before submitting.");
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

      <h5 className="text-center lh-sm mx-0 my-1 fw-700">Change Password</h5>
      <p className="text-center lh-sm mb-4">Get access to your account</p>
      {errors && (
        <div id="emailFeedback" className="text-danger">
          {errors}
        </div>
      )}
      {apiStatus && (
        <div id="emailFeedback" className="text-success">
          {apiStatus}
        </div>
      )}


      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-700 opacity-50">
            Email address
          </label>
          <div className="position-relative">
            <input
              type="email"
              className="form-control form-control-sm ps-4 small-placeholder"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              aria-describedby="emailFeedback"
            />
            {email && (
              <span
                className={`position-absolute top-50 end-0 translate-middle-y me-3 ${emailValid ? "text-success" : "text-danger"
                  }`}
              >
                {emailValid ? "✔️" : "❌"}
              </span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="new-password" className="form-label fw-700 opacity-50">
            New Password
          </label>
          <div className="position-relative">
            <input
              type={showNewPassword ? "text" : "password"}
              className="form-control form-control-sm ps-4 small-placeholder"
              id="new-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y me-4"
              onClick={toggleNewPassword}
            >
              <i
                className={`bi ${showNewPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
              ></i>
            </button>
            {passwordMatch !== null && (
              <span
                className={`position-absolute top-50 end-0 translate-middle-y me-3 ${passwordMatch ? "text-success" : "text-danger"
                  }`}
              >
                {passwordMatch ? "✔️" : "❌"}
              </span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label
            htmlFor="confirm-password"
            className="form-label fw-700 opacity-50"
          >
            Confirm New Password
          </label>
          <div className="position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control form-control-sm ps-4 small-placeholder"
              id="confirm-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y me-4"
              onClick={toggleConfirmPassword}
            >
              <i
                className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
              ></i>
            </button>
            {passwordMatch !== null && (
              <span
                className={`position-absolute top-50 end-0 translate-middle-y me-3 ${passwordMatch ? "text-success" : "text-danger"
                  }`}
              >
                {passwordMatch ? "✔️" : "❌"}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn-sm btn btn-primary w-100 mb-3"
          disabled={!emailValid || !passwordMatch}
        >
          Change Password
        </button>

        <div className="d-flex">
          <div className="flex-fill text-center">
            <Link href="/" className="text-decoration-none">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

// Here’s a **layman-friendly summary** of all the changes made so far:

// ---

// 1. **Email Validation:**
//    - Added a check to make sure the email entered is valid.
//    - Shows a green checkmark (`✔️`) if the email is correct and a red cross (`❌`) if it’s not.

// 2. **Password Match Validation:**
//    - Checks if the "New Password" and "Confirm Password" fields match.
//    - Shows a green checkmark (`✔️`) if they match and a red cross (`❌`) if they don’t.

// 3. **Submit Button Logic:**
//    - The "Change Password" button is disabled unless:
//      - The email is valid.
//      - The passwords match.

// 4. **Independent Toggle for Password Visibility:**
//    - Added separate "eye" icons (`👁️`) for the "New Password" and "Confirm Password" fields.
//    - Each icon can toggle visibility for its respective password field (e.g., show or hide the password).

// 5. **Dynamic Feedback:**
//    - The form gives **instant feedback** to the user:
//      - Shows checkmarks or crosses while typing to indicate correctness.
//      - The button automatically enables or disables based on the input.

// ---

// ### **Overall Result:**
// The form now:
// - Validates inputs while typing.
// - Makes password fields easier to manage.
// - Ensures the form is only submitted when everything is correct.

// Let me know if you need further clarifications! 😊