"use client";
import React from "react";
import { useState } from "react";

const CreateCandidateForm = () => {
  // 1) INITIAL STATES
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    phone: "",
    website: "",
    secondaryEmail: "",
    street: "",
    province: "",
    city: "",
    postalCode: "",
    country: "",
    experience: "",
    currentJobTitle: "",
    expectedSalary: "",
    skillSet: "",
    skypeId: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    candidateStatus: "",
    candidateOwner: "",
    institute: "",
    major: "", //Major / Department
    degree: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    occupation: "",
    company: "",
    summary: "",
    workDuration: "",
    workStartMonth: "",
    workStartYear: "",
    workEndMonth: "",
    workEndYear: "",
    currentlyWorking: false,
    emailOptOut: false,
    currentlyPursuing: false,
    resume: null,
    coverLetter: null,
    others: null,
    offer: null,
    contracts: null,
  };

  // State to hold form data
  const [formData, setFormData] = useState(initialState);

  // State to hold errors for each field
  // If formErrors[fieldName] is an empty string, no error is present
  const [formErrors, setFormErrors] = useState({});

  // Track which fields have been touched or edited by the user
  // If touchedFields[fieldName] === true, it means the user has interacted with that field
  const [touchedFields, setTouchedFields] = useState({});

  // Submission state (you can use this to show a success message, etc.)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2) HELPER FUNCTIONS FOR DYNAMIC VALIDATION STYLES

  // Returns "" (empty) if the field is not touched yet,
  // "is-invalid" if there's an error, or "is-valid" if valid.
  const getValidationClass = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return "";
    }
    return formErrors[fieldName] ? "is-invalid" : "is-valid";
  };

  // Returns "" if not touched, otherwise "invalid-feedback" or "valid-feedback".
  const getFeedbackClass = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return "";
    }
    return formErrors[fieldName] ? "invalid-feedback" : "valid-feedback";
  };

  // Returns "" if not touched, otherwise the error message or "Looks good!".
  const getFeedbackMessage = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return "";
    }
    return formErrors[fieldName] || "Looks good!";
  };

  // 3) VALIDATION LOGIC
  const validateField = (fieldName, value, type) => {
    let error = "";

    // NOTE: Adjust these rules to match your requirements (which fields are optional, etc.)
    switch (fieldName) {
      // REQUIRED TEXT FIELDS
      case "firstName":
      case "lastName":
      case "email":
      case "mobile":
      case "phone":
      case "website":
      case "secondaryEmail":
      case "street":
      case "province":
      case "city":
      case "postalCode":
      case "country":
      case "currentJobTitle":
      case "skillSet":
      case "skypeId":
      case "linkedin":
      case "twitter":
      case "facebook":
      case "candidateStatus":
      case "candidateOwner":
      case "institute":
      case "major":
      case "degree":
      case "startMonth":
      case "startYear":
      case "endMonth":
      case "endYear":
      case "occupation":
      case "company":
      case "workDuration":
      case "workStartMonth":
      case "workStartYear":
      case "workEndMonth":
      case "workEndYear":
        if (!value || value.trim() === "") {
          error = `${fieldName} is required.`;
        }
        break;

      // REQUIRED NUMERIC FIELDS
      case "experience":
      case "expectedSalary":
        if (!value || isNaN(value) || value <= 0) {
          error = `${fieldName} must be a positive number.`;
        }
        break;

      // REQUIRED DATE FIELDS
      case "targetDate":
      case "dateOpened":
        if (!value) {
          error = `${fieldName} is required.`;
        }
        break;

      // REQUIRED TEXTAREAS
      case "summary":
        if (!value || value.trim().length < 10) {
          error = `${fieldName} must be at least 10 characters long.`;
        }
        break;

      // FILE FIELDS
      case "resume":
      case "coverLetter":
      case "others":
      case "offer":
      case "contracts":
        // For file fields, value is a FileList
        // Check if user actually selected at least one file
        if (!value || value.length === 0) {
          error = `Please upload a valid file for ${fieldName}.`;
        }
        break;
      // REQUIRED CHECKBOX FIELDS



      case "emailOptOut":
      case "currentlyPursuing":
      case "currentlyWorking":
        // For checkbox fields, the value should be boolean (true/false)
        if (!value) {
          error = `You must accept the ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}.`;
        }
        break;
      default:
        break;
    }

    // Update formErrors state
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };
  // 4) HANDLE INPUT CHANGES
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue;

    // For file inputs, use files
    // For checkbox, use checked
    // Otherwise, use string value
    if (type === "file") {
      newValue = files;
    } else if (type === "checkbox") {
      newValue = checked;
    } else {
      newValue = value;
    }

    // Log the previous form data and touched fields before updating
    console.log("Previous form data:", formData);
    console.log("Previous touched fields:", touchedFields);

    // Update form data
    setFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        [name]: newValue,
      };
      // Log the updated form data
      console.log("Updated form data:", updatedFormData);
      return updatedFormData;
    });

    // Mark field as touched
    setTouchedFields((prev) => {
      const updatedTouchedFields = {
        ...prev,
        [name]: true,
      };
      // Log the updated touched fields
      console.log("Updated touched fields:", updatedTouchedFields);
      return updatedTouchedFields;
    });

    // Validate the field immediately
    validateField(name, newValue, type);
  };

  // 5) HANDLE FORM SUBMISSION
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Mark all fields as touched so feedback shows for all fields
    const allTouched = {};
    Object.keys(formData).forEach((fieldName) => {
      allTouched[fieldName] = true;
    });
    setTouchedFields(allTouched);

    // Validate every field
    Object.keys(formData).forEach((fieldName) => {
      const currentValue = formData[fieldName];
      let fieldType = "text";

      // Derive the correct type (not strictly necessary, but can help with file/checkbox logic)
      if (typeof currentValue === "boolean") {
        fieldType = "checkbox";
      } else if (currentValue instanceof FileList) {
        fieldType = "file";
      }

      validateField(fieldName, currentValue, fieldType);

      // If there's an existing error for this field, consider form invalid
      if (formErrors[fieldName]) {
        valid = false;
      }
    });

    if (valid) {
      setIsSubmitted(true);
      alert("Form is valid and ready to submit!");
      console.log("Form Data:", formData);
      // ... proceed with API call or other final submission logic
    } else {
      setIsSubmitted(false);
      alert("Please fix the errors in the form before submitting.");
    }
  };
  return (
    <div className="container mt-5">
      <h2>Create Candidate</h2>
      <form onSubmit={handleSubmit}>
        {/* ACTIONS */}
        <div className="d-flex justify-content-end gap-3 mb-3">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save and Publish
          </button>
        </div>
        <table className="table table-bordered">
          <tbody>
            <tr className="border">
              <th colSpan="4" className="border">
                Basic Info
              </th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "firstName"
                  )}`}
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("firstName")}>
                  {getFeedbackMessage("firstName")}
                </div>
              </td>
              <td className="border-0 text-end">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "lastName"
                  )}`}
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("lastName")}>
                  {getFeedbackMessage("lastName")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "email"
                  )}`}
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("email")}>
                  {getFeedbackMessage("email")}
                </div>
              </td>
              <td className="border-0 text-end">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "mobile"
                  )}`}
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("mobile")}>
                  {getFeedbackMessage("mobile")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "phone"
                  )}`}
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("phone")}>
                  {getFeedbackMessage("phone")}
                </div>
              </td>
              <td className="border-0 text-end">
                <label htmlFor="website" className="form-label">
                  Website
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "website"
                  )}`}
                  id="website"
                  name="website"
                  placeholder="Website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("website")}>
                  {getFeedbackMessage("website")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="secondaryEmail" className="form-label">
                  Secondary Email
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "secondaryEmail"
                  )}`}
                  id="secondaryEmail"
                  name="secondaryEmail"
                  placeholder="SecondaryEmail"
                  value={formData.secondaryEmail}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("secondaryEmail")}>
                  {getFeedbackMessage("secondaryEmail")}
                </div>
              </td>
              <td colSpan={2} className="border-0 "></td>

            </tr>
            <tr className="border">
              <th colSpan="4" className="border">
                Address Information
              </th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="street" className="form-label">
                  Street
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "street"
                  )}`}
                  id="street"
                  name="street"
                  placeholder="Street"
                  value={formData.street}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("street")}>
                  {getFeedbackMessage("street")}
                </div>
              </td>
              <td className="border-0 text-end">
                <label htmlFor="province" className="form-label">
                  Province
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "province"
                  )}`}
                  id="province"
                  name="province"
                  placeholder="Province"
                  value={formData.province}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("province")}>
                  {getFeedbackMessage("province")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="city" className="form-label">
                  City
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "city"
                  )}`}
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("city")}>
                  {getFeedbackMessage("city")}
                </div>
              </td>
              <td className="border-0 text-end">
                <label htmlFor="postalCode" className="form-label">
                  Postal Code
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "postalCode"
                  )}`}
                  id="postalCode"
                  name="postalCode"
                  placeholder="PostalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("postalCode")}>
                  {getFeedbackMessage("postalCode")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
              </td>
              <td className="border-0">
                <input
                  type="country"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "country"
                  )}`}
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("country")}>
                  {getFeedbackMessage("country")}
                </div>
              </td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>
            <tr className="border">
              <th colSpan="4" className="border">
                Professional Details
              </th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="experience" className="form-label">
                  Experience in Years
                </label>
              </td>
              <td className="border-0">
                <input
                  type="country"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "experience"
                  )}`}
                  id="experience"
                  name="experience"
                  placeholder="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("experience")}>
                  {getFeedbackMessage("experience")}
                </div>
              </td>
              <td className="border-0 text-end">
                <label htmlFor="currentJobTitle" className="form-label">
                  Current Job Title
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "currentJobTitle"
                  )}`}
                  id="currentJobTitle"
                  name="currentJobTitle"
                  placeholder=" Current Job Title"
                  value={formData.currentJobTitle}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("currentJobTitle")}>
                  {getFeedbackMessage("currentJobTitle")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="expectedSalary" className="form-label">
                  Expected Salary
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "expectedSalary"
                  )}`}
                  id="expectedSalary"
                  name="expectedSalary"
                  placeholder=" Expected Salary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("expectedSalary")}>
                  {getFeedbackMessage("expectedSalary")}
                </div>
              </td>

              <td className="border-0 text-end">
                <label htmlFor="skillSet" className="form-label">
                  Skill Set
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "skillSet"
                  )}`}
                  id="skillSet"
                  name="skillSet"
                  placeholder=" skillSet"
                  value={formData.skillSet}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("skillSet")}>
                  {getFeedbackMessage("skillSet")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="skypeId" className="form-label">
                  Skype ID
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "skypeId"
                  )}`}
                  id="skypeId"
                  name="skypeId"
                  placeholder=" skypeId"
                  value={formData.skypeId}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("skypeId")}>
                  {getFeedbackMessage("skypeId")}
                </div>
              </td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>
            <tr className="border">
              <th colSpan="4" className="border">
                Social Links
              </th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="linkedin" className="form-label">
                  LinkedIn
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "linkedin"
                  )}`}
                  id="linkedin"
                  name="linkedin"
                  placeholder=" linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("linkedin")}>
                  {getFeedbackMessage("linkedin")}
                </div>
              </td>
              <td className="border-0 text-end">
                <label htmlFor="twitter" className="form-label">
                  Twitter
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "twitter"
                  )}`}
                  id="twitter"
                  name="twitter"
                  placeholder=" twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("twitter")}>
                  {getFeedbackMessage("twitter")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="facebook" className="form-label">
                  Facebook
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "facebook"
                  )}`}
                  id="facebook"
                  name="facebook"
                  placeholder=" facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("facebook")}>
                  {getFeedbackMessage("facebook")}
                </div>
              </td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>
            <tr className="border">
              <th colSpan="4" className="border">
                Other Info
              </th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="candidateStatus" className="form-label">
                  Candidate Status
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "candidateStatus"
                  )}`}
                  id="candidateStatus"
                  name="candidateStatus"
                  placeholder=" candidateStatus"
                  value={formData.candidateStatus}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("candidateStatus")}>
                  {getFeedbackMessage("candidateStatus")}
                </div>
              </td>
              <td className="border-0 text-end">
                <label htmlFor="candidateOwner" className="form-label">
                  Candidate Owner
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "candidateOwner"
                  )}`}
                  id="candidateOwner"
                  name="candidateOwner"
                  placeholder=" Candidate Owner"
                  value={formData.candidateOwner}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("candidateOwner")}>
                  {getFeedbackMessage("candidateOwner")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="emailOptOut" className="form-label">
                  Email Opt Out
                </label>
              </td>
              <td className="border-0">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="emailOptOut"
                  name="emailOptOut"
                />
              </td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">
                Educational Details
              </th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="institute" className="form-label">
                  Institute / School
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "institute"
                  )}`}
                  id="institute"
                  name="institute"
                  placeholder=" institute"
                  value={formData.institute}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("institute")}>
                  {getFeedbackMessage("institute")}
                </div>
              </td>
              <td className="border-0 text-end">
                <label htmlFor="major" className="form-label">
                  Major / Department
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "major"
                  )}`}
                  id="major"
                  name="major"
                  placeholder=" major"
                  value={formData.major}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("major")}>
                  {getFeedbackMessage("major")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="degree" className="form-label">
                  Degree
                </label>
              </td>
              <td className="border-0">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "degree"
                  )}`}
                  id="degree"
                  name="degree"
                  placeholder=" degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("degree")}>
                  {getFeedbackMessage("degree")}
                </div>
              </td>
              <td className="border-0 text-end">
                <label htmlFor="duration" className="form-label">
                  Duration
                </label>
              </td>
              <td className="border-0">


                <div className="d-flex">
                  <select
                    className={`form-control form-control-sm small-placeholder ${getValidationClass(
                      "startMonth"
                    )}`}
                    id="startMonth"
                    name="startMonth"
                    placeholder=" startMonth"
                    value={formData.startMonth}
                    onChange={handleInputChange}
                  >

                    <option>Month</option>


                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>

                  {/*
    : "",*/}
                  <select
                    className={`form-control form-control-sm small-placeholder ${getValidationClass(
                      "startYear"
                    )}`}
                    id="startYear"
                    name="startYear"
                    placeholder="startYear"
                    value={formData.startYear}
                    onChange={handleInputChange}
                  >
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                  <span className="mx-2">To</span>
                  <select

                    className={`form-control form-control-sm small-placeholder ${getValidationClass(
                      "endMonth"
                    )}`}
                    id="endMonth"
                    name="endMonth"
                    placeholder="endMonth"
                    value={formData.endMonth}
                    onChange={handleInputChange}>
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select

                    className={`form-control form-control-sm small-placeholder ${getValidationClass(
                      "endYear"
                    )}`}
                    id="endYear"
                    name="endYear"
                    placeholder="endYear"
                    value={formData.endMonth}
                    onChange={handleInputChange}
                  >
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>



                </div>
              </td>
            </tr>

            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="currentlyPursuing" className="form-label">
                  Currently Pursuing
                </label>
              </td>
              <td className="border-0">
                <input
                  type="checkbox"
                  className={` form-check-input  small-placeholder ${getValidationClass(
                    "currentlyPursuing"
                  )}`}
                  id="currentlyPursuing"
                  name="currentlyPursuing"
                  placeholder="currentlyPursuing"
                  value={formData.currentlyPursuing}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("currentlyPursuing")}>
                  {getFeedbackMessage("currentlyPursuing")}
                </div>
              </td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">
                <button className="btn btn-link text-primary" type="button">
                  + Add Educational Details
                </button>
              </th>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">
                Experience Details
              </th>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">
                <label htmlFor="occupation" className="form-label">
                  Occupation / Title
                </label>
              </td>
              <td className="border-0" colSpan="3">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "occupation"
                  )}`}
                  id="occupation"
                  name="occupation"
                  placeholder=" occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("occupation")}>
                  {getFeedbackMessage("occupation")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
              </td>
              <td className="border-0" colSpan="3">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "company"
                  )}`}
                  id="company"
                  name="company"
                  placeholder=" company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("company")}>
                  {getFeedbackMessage("company")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">
                <label htmlFor="summary" className="form-label">
                  Summary
                </label>
              </td>
              <td className="border-0" colSpan="3">
                <input
                  type="text"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "summary"
                  )}`}
                  id="summary"
                  name="summary"
                  placeholder=" summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("summary")}>
                  {getFeedbackMessage("summary")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">
                <label htmlFor="workDuration" className="form-label">
                  Work Duration
                </label>
              </td>
              <td className="border-0">
                <div className="d-flex">
                  <select
                    className="form-select"
                    id="workStartMonth"
                    name="workStartMonth"
                  >
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select
                    className="form-select"
                    id="workStartYear"
                    name="workStartYear"
                  >
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                  <span className="mx-2">To</span>
                  <select
                    className="form-select"
                    id="workEndMonth"
                    name="workEndMonth"
                  >
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select
                    className="form-select"
                    id="workEndYear"
                    name="workEndYear"
                  >
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">
                <label htmlFor="currentlyWorking" className="form-label">
                  I currently work here
                </label>
              </td>
              <td className="border-0" colSpan="3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="currentlyWorking"
                  name="currentlyWorking"
                />
              </td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">
                <button className="btn btn-link text-primary" type="button">
                  + Add Experience
                </button>
              </th>
            </tr>
            {/* <tr className="border">
              <th colSpan="4" className="border">
                Attachment Information
              </th>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Resume</td>
              <td className="border-0">
                <input
                  type="file"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "resume"
                  )}`}
                  id="resume"
                  name="resume"
                  placeholder=" resume"
                  value={formData.resume}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("resume")}>
                  {getFeedbackMessage("resume")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Cover Letter</td>
              <td className="border-0">
                <input
                  type="file"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "coverLetter"
                  )}`}
                  id="coverLetter"
                  name="coverLetter"
                  placeholder=" coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("coverLetter")}>
                  {getFeedbackMessage("coverLetter")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Others</td>
              <td className="border-0">

                <input
                  type="file"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "others"
                  )}`}
                  id="others"
                  name="others"
                  placeholder=" others"
                  value={formData.others}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("others")}>
                  {getFeedbackMessage("others")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Offer</td>
              <td className="border-0">

                <input
                  type="file"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "offer"
                  )}`}
                  id="offer"
                  name="offer"
                  placeholder=" offer"
                  value={formData.offer}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("offer")}>
                  {getFeedbackMessage("offer")}
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">Contracts</td>
              <td className="border-0">
                <input
                  type="file"
                  className={`form-control form-control-sm small-placeholder ${getValidationClass(
                    "contracts"
                  )}`}
                  id="contracts"
                  name="contracts"
                  placeholder=" contracts"
                  value={formData.contracts}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("contracts")}>
                  {getFeedbackMessage("contracts")}
                </div>
              </td>
            </tr> */}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateCandidateForm;
