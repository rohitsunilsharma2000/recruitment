"use client";

import { useState } from "react";
import "../../../authentication/authentication.css";
import Link from "next/link";
export default function SignUpPage() {

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    //  Right Side
    <div className="custom-font ">
      <div className="d-flex justify-content-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY9gZOyxWEo6BNSod3lRTsdQYkFFpFEDe7BQ&s"
          alt="Logo"
          className="img-fluid mb-4 "
          style={{ width: "50px" }} // Adjust the size as needed
        />
      </div>

      {/* <p className="text-center lh-sm mx-0 my-0">Sign In</p> */}
      <h5 className="text-center lh-sm mx-0 my-1 fw-700">Sign Up</h5>
      <p className="text-center lh-sm mb-4"> Get access to your account</p>

      {/* <button type="button" className="btn  btn-sm btn-light w-100 mb-3">
        <span className="me-2">
          <i className="bi bi-google text-warning"></i>
        </span>
        <span className="custom-font "> Sign in with Google</span>
      </button>

      <button type="button" className="btn  btn-sm btn-light w-100 mb-3">
        <span className="me-2">
          <i className="bi bi-facebook text-primary"></i>
        </span>
        <span className="custom-font "> Sign in with Facebook</span>
      </button> */}

      {/* <div className=" position-relative">
        <p className="position-absolute top-50 start-50 translate-middle bg-body-tertiary">
          or use email
        </p>
        <hr />
      </div> */}

      <form>
        <div className="mb-3">
          <label htmlFor="email" className=" form-label fw-700 opacity-50">
            Email address
          </label>
          <div className=" position-relative">
            <i className="bi bi-person-fill position-absolute top-50 start-0 translate-middle-y px-2"></i>
            <input
              type="email"
              className="form-control form-control-sm ps-4 small-placeholder"
              id="email"
              placeholder="Enter email"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className=" form-label fw-700 opacity-50">
            Password
          </label>

          <div className=" position-relative">
            <i className="bi bi-person-fill position-absolute top-50 start-0 translate-middle-y px-2"></i>
            <button
              className="btn  btn-sm position-absolute top-50 end-0 translate-middle-y px-2
              
              "
              type="button"
              onClick={togglePassword}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
            <input
              type="password"
              className="form-control form-control-sm ps-4 small-placeholder"
              id="password"
              placeholder="Enter password"
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="py-1 flex-fill">
            <div className="mb-2 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label opacity-50 fw-700" htmlFor="exampleCheck1">Remember me</label>
            </div>
          </div>
          <div className="py-1 flex-fill text-end">
            <a className="text-decoration-none" href="/">Forgot Password?</a>
          </div>
        </div>



        <button type="submit" className="btn  btn-sm btn-primary w-100 mb-3 ">
          <span className="custom-font "> Sign Up</span>

        </button>

        <div className="d-flex">
          <div className=" flex-fill text-center">
            <Link className="text-decoration-none" href="/">Create an account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
