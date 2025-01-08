"use client";
import React, { useState } from "react";

const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const validateForm = () => {
    const errors = {};

    // Validate First Name
    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    }

    // Validate Last Name
    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    }

    // Validate Email
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    // Validate Password
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if no errors, false otherwise
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    setIsSubmitted(true); // Mark that form is submitted to show success messages

    // Validate form data
    if (validateForm()) {
      // If form is valid, show success message or proceed with actual submission (e.g., API call)
      alert('Form Submitted Successfully');
      // Reset form if desired
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className={`form-control ${formErrors.firstName ? "is-invalid" : isSubmitted && "is-valid"
              }`}
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            aria-describedby="firstNameFeedback"
          />

          {
            formErrors.firstName && (
              <div id="firstNameFeedback" className="invalid-feedback">
                {formErrors.firstName}
              </div>
            )
          }

          {
            !formErrors.firstName && isSubmitted && (
              <div id="firstNameFeedback" className="valid-feedback">
                Looks good!
              </div>
            )
          }

        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>

          <input
            type="text"
            className={`form-control ${formErrors.lastName ? "is-invalid" : isSubmitted && "is-valid"
              }`}
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            aria-describedby="lastNameFeedback"
          />

          {
            formErrors.lastName && (
              <div id="lastNameFeedback" className="invalid-feedback">
                {formErrors.lastName}
              </div>
            )
          }

          {
            !formErrors.lastName && isSubmitted && (
              <div id="lastNameFeedback" className="valid-feedback">
                Looks good!
              </div>
            )
          }




        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          {
            formErrors.lastName && (
              <div id="lastNameFeedback" className="invalid-feedback">
                {formErrors.lastName}
              </div>
            )

          }
          {
            !formErrors.lastName && isSubmitted && (
              <div id="lastNameFeedback" className="valid-feedback">
                Looks good!
              </div>
            )
          }
          <input
            type="email"
            className={`form-control ${formErrors.email ? "is-invalid" : isSubmitted && "is-valid"
              }`}
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailFeedback"
          />
          {
            formErrors.email && (
              <div id="emailFeedback" className="invalid-feedback">
                {formErrors.email}
              </div>
            )
          }
          {
            !formErrors.email && isSubmitted && (
              <div id="emailFeedback" className="valid-feedback">
                Looks good!
              </div>
            )
          }
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${formErrors.password ? "is-invalid" : isSubmitted && "is-valid"
              }`}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            aria-describedby="passwordFeedback"
          />
          {
            formErrors.password && (
              <div id="passwordFeedback" className="invalid-feedback">
                {formErrors.password}
              </div>
            )
          }

          {
            !formErrors.password && isSubmitted && (
              <div id="passwordFeedback" className="valid-feedback">
                Looks good!
              </div>
            )
          }
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
