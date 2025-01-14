"use client";
import React from "react";
import { useState } from "react";
import "../candidate.css";
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
    // occupation: "",
    // company: "",
    // summary: "",
    // workDuration: "",
    // workStartMonth: "",
    // workStartYear: "",
    // workEndMonth: "",
    // workEndYear: "",
    // currentlyWorking: false,

    emailOptOut: false,
    resume: null,
    coverLetter: null,
    others: null,
    offer: null,
    contracts: null,
  };

  // State to hold form data (values entered by the user)
  const [formData, setFormData] = useState(initialState);

  // State to hold errors for each field (if any)
  const [formErrors, setFormErrors] = useState({});

  // Track which fields have been touched or edited by the user
  const [touchedFields, setTouchedFields] = useState({});

  // Submission state (you can use this to show a success message, etc.)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Educational Details State (Array of education-related data)
  const [educationalDetails, setEducationalDetails] = useState([
    {
      institute: "",
      major: "",
      degree: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      currentlyPursuing: false,
    },
  ]);

  const [experienceDetails, setExperienceDetails] = useState([
    {
      occupation: "",
      company: "",
      summary: "",
      workDuration: "",
      workStartMonth: "",
      workStartYear: "",
      workEndMonth: "",
      workEndYear: "",
      currentlyWorking: false,
    },
  ]);

  // 2) HELPER FUNCTIONS FOR DYNAMIC VALIDATION STYLES

  // This function adds dynamic classes for styling invalid or valid fields
  const getValidationClass = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return ""; // If the field hasn't been touched, no class is applied
    }
    return formErrors[fieldName] ? "is-invalid" : "is-valid"; // If error exists, return invalid, otherwise valid
  };

  // This function adds dynamic feedback classes to show validation messages
  const getFeedbackClass = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return ""; // If not touched, no feedback class
    }
    return formErrors[fieldName] ? "invalid-feedback" : "valid-feedback"; // Invalid or valid feedback class based on error
  };

  // This function shows the validation message or "Looks good!" for valid fields
  const getFeedbackMessage = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return ""; // If field isn't touched, no message is shown
    }
    return formErrors[fieldName] || "Looks good!"; // Show the error message or a success message
  };

  // 3) VALIDATION LOGIC
  // This function validates individual form fields and updates the formErrors state
  const validateField = (fieldName, value, type) => {
    let error = ""; // Start with no error for each field

    switch (true) {
      // REQUIRED TEXT FIELDS (e.g., firstName, email, etc.)
      case [
        "firstName",
        "lastName",
        "email",
        "mobile",
        "phone",
        "website",
        "secondaryEmail",
        "street",
        "province",
        "city",
        "postalCode",
        "country",
        "currentJobTitle",
        "skillSet",
        "skypeId",
        "linkedin",
        "twitter",
        "facebook",
        "candidateStatus",
        "candidateOwner",
      ].includes(fieldName):
        if (!value || value.trim() === "") {
          error = `${fieldName} is required.`;
        }
        break;

      // EDUCATIONAL FIELDS (Handle both text and checkbox)
      case fieldName.startsWith("edu-"): {
        if (typeof value === "string" && value.trim() === "") {
          error = `${fieldName} is required.`;
        }
        break;
      }
      // EDUCATIONAL FIELDS (Handle both text and checkbox)
      case fieldName.startsWith("exp-"): {
        if (typeof value === "string" && value.trim() === "") {
          error = `${fieldName} is required.`;
        }
        break;
      }

      // REQUIRED NUMERIC FIELDS (e.g., experience, salary)
      case ["experience", "expectedSalary"].includes(fieldName):
        if (!value || isNaN(value) || value <= 0) {
          error = `${fieldName} must be a positive number.`;
        }
        break;

      // REQUIRED CHECKBOX FIELDS (currentlyPursuing, emailOptOut, etc.)
      case ["emailOptOut"].includes(fieldName):
        if (type === "checkbox" && value === false) {
          error = `You must accept the ${fieldName
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()}.`;
        }
        break;

      // REQUIRED TEXTAREA (summary)
      case fieldName === "summary":
        if (!value || value.trim().length < 10) {
          error = `${fieldName} must be at least 10 characters long.`;
        }
        break;

      // FILE FIELDS (e.g., resume, coverLetter, others, offer, contracts)
      case ["resume", "coverLetter", "others", "offer", "contracts"].includes(
        fieldName
      ):
        if (!value || value.length === 0) {
          error = `Please upload a valid file for ${fieldName}.`;
        }
        break;

      default:
        break;
    }

    // Update formErrors state to store the error message for this field
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error, // Store error message for the field
    }));
  };

  // Educational Details Handlers
  // Updates a specific educational field
  const handleEducationChange = (index, field, value) => {
    const updatedDetails = educationalDetails.map((detail, idx) =>
      idx === index ? { ...detail, [field]: value } : detail
    );
    setEducationalDetails(updatedDetails);

    // Mark field as touched
    const fieldKey = `edu-${index}-${field}`;
    setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));

    // Immediately validate the field
    validateField(fieldKey, value);
  };

  const handleExperienceDetailsChange = (index, field, value) => {
    const updatedDetails = experienceDetails.map((detail, idx) =>
      idx === index ? { ...detail, [field]: value } : detail
    );
    setExperienceDetails(updatedDetails);

    // Mark field as touched
    const fieldKey = `exp-${index}-${field}`;
    setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));

    // Immediately validate the field
    validateField(fieldKey, value);
  };

  // Adds a new educational detail entry
  const addEducationalDetail = () => {
    setEducationalDetails([
      ...educationalDetails,
      {
        institute: "",
        major: "",
        degree: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        currentlyPursuing: false,
      },
    ]);
  };


  // Adds a new educational detail entry
  const addExperienceDetail = () => {
    console.log("Before adding new experience detail:", experienceDetails);

    setExperienceDetails([
      ...experienceDetails,
      {
        occupation: "",
        company: "",
        summary: "",
        workDuration: "",
        workStartMonth: "",
        workStartYear: "",
        workEndMonth: "",
        workEndYear: "",
        currentlyWorking: false,
      },
    ]);

    console.log("After adding new experience detail:", experienceDetails);
  };
  // Removes an experience detail entry
  const removeExperienceDetail = (index) => {
    setExperienceDetails(experienceDetails.filter((_, idx) => idx !== index));
  };
  // Removes an educational detail entry
  const removeEducationalDetail = (index) => {
    setEducationalDetails(educationalDetails.filter((_, idx) => idx !== index));
  };





  // 4) HANDLE INPUT CHANGES
  // This function handles all form field changes (inputs, checkboxes, files)
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    let newValue;

    // Handling different input types (text, checkbox, file)
    if (type === "file") {
      newValue = files;
    } else if (type === "checkbox") {
      newValue = checked;
    } else {
      newValue = value;
    }

    // Update form data with the new value
    setFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        [name]: newValue, // Update field with the new value
      };
      return updatedFormData;
    });

    // Mark field as touched
    setTouchedFields((prev) => {
      const updatedTouchedFields = {
        ...prev,
        [name]: true, // Mark the field as touched
      };
      return updatedTouchedFields;
    });

    // Immediately validate the field
    validateField(name, newValue, type);
  };

  // 5) HANDLE FORM SUBMISSION
  // Handles form submission, validates all fields, and shows success or failure
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting

    let valid = true;
    const missingFields = [];

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

      // Determine the type of the field (checkbox, file, text)
      if (typeof currentValue === "boolean") {
        fieldType = "checkbox";
      } else if (currentValue instanceof FileList) {
        fieldType = "file";
      }

      validateField(fieldName, currentValue, fieldType);

      // If there's an error for this field, consider the form invalid
      if (formErrors[fieldName]) {
        valid = false;
        missingFields.push(fieldName); // Track missing fields
      }
    });

    // Show an alert with the list of missing or incorrect fields
    if (!valid) {
      const missingFieldsMessage = missingFields.length
        ? `Please fix the following fields:\n\n${missingFields.join("\n")}`
        : "Please fix the errors in the form before submitting.";
      alert(missingFieldsMessage);
      setIsSubmitted(false);
    } else {
      // Combine formData and educationalDetails into finalData
      const finalData = { ...formData, educationalDetails, experienceDetails };
      console.log("Form Submitted:", finalData); // Log the final submitted data
      alert("Form submitted successfully!"); // Show success message
      setIsSubmitted(true); // Update submission state
    }
  };

  // Return JSX for rendering the form (not shown here for brevity)

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
            <tr className="border-0">
              <th colSpan="4" className="border-bottom">
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

            <tr className="border-0">
              <th colSpan="4" className="border-bottom">
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

            <tr className="border-0">
              <th colSpan="4" className="border-bottom">
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
                  className={`form-check-input ${getValidationClass(
                    "emailOptOut"
                  )}`}
                  id="emailOptOut"
                  name="emailOptOut"
                  checked={formData.emailOptOut}
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("emailOptOut")}>
                  {getFeedbackMessage("emailOptOut")}
                </div>
              </td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            {/* EDUCATIONAL DETAILS */}

            <tr className="border">
              <th colSpan="4" className="border">
                Educational Details
              </th>
            </tr>
            {educationalDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <tr className="border-0">
                  <td colSpan="4" className="border-0  text-center">
                    <p>
                      {
                        index === 0
                          ? "10th"
                          : index === 1
                            ? "12th or Diploma"
                            : index === 2
                              ? "Graduation"
                              : index === 3
                                ? "Postgraduation"
                                : index === 4
                                  ? "PhD"
                                  : `Others - ${index - 4}` // Dynamically calculate "Others - {index-4}" for index > 4
                      }
                    </p>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label
                      htmlFor={`edu-${index}-institute`}
                      className="form-label"
                      style={{
                        position: "relative",
                      }}
                    >
                      Institute / School
                      <span
                        type="button"
                        className="btn btn-sm  btn-outline-secondary  rounded-pill"
                        style={{
                          position: "absolute",
                          top: 12,
                          left: "-31%",
                          transform: "translate(-50%, -50%)",
                          width: "2rem",
                          height: "2rem",
                        }}
                      >
                        {index + 1}
                      </span>
                      <div
                        className="d-flex"
                        style={{
                          position: "absolute",
                          top: 62,
                          left: "-14%",
                          transform: "translate(-50%, -50%)",
                          width: "2rem",
                          height: "4rem",
                        }}
                      >
                        <div className="vr"></div>
                      </div>
                      <span
                        type="button"
                        className="btn btn-sm   btn-outline-danger rounded-pill"
                        style={{
                          position: "absolute",
                          top: 113,
                          left: "-31%",
                          transform: "translate(-50%, -50%)",
                          width: "2rem",
                          height: "2rem",
                        }}
                        onClick={() => removeEducationalDetail(index)}
                      >
                        <i className="bi bi-trash  fs-6"></i>
                      </span>
                    </label>
                  </td>
                  <td className="border-0">

                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        `edu-${index}-institute`
                      )}`}
                      id={`edu-${index}-institute`}
                      name="institute"
                      placeholder="institute"
                      value={detail.institute}
                      onChange={(e) =>
                        handleEducationChange(index, "institute", e.target.value)
                      }
                    />
                    <div className={getFeedbackClass(`edu-${index}-institute`)}>
                      {getFeedbackMessage(`edu-${index}-institute`)}
                    </div>


                  </td>
                  <td className="border-0 text-end">
                    <label
                      htmlFor={`edu-${index}-major`}
                      className="form-label"
                    >
                      Major / Department
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        `edu-${index}-major`
                      )}`}
                      id={`edu-${index}-major`}
                      name="major"
                      placeholder="Major"
                      value={detail.major}
                      onChange={(e) =>
                        handleEducationChange(index, "major", e.target.value)
                      }
                    />
                    <div className={getFeedbackClass(`edu-${index}-major`)}>
                      {getFeedbackMessage(`edu-${index}-major`)}</div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label
                      htmlFor={`edu-${index}-degree`}
                      className="form-label"
                    >
                      {index === 0
                        ? "10th"
                        : index === 1
                          ? "12th or Diploma"
                          : index === 2
                            ? "Graduation"
                            : index === 3
                              ? "Postgraduation"
                              : index === 4
                                ? "PhD"
                                : "Others"}
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        `edu-${index}-degree`
                      )}`}
                      id={`edu-${index}-degree`}
                      name="degree"
                      placeholder="Degree"
                      value={detail.degree}
                      onChange={(e) =>
                        handleEducationChange(index, "degree", e.target.value)
                      }
                    />
                    <div className={getFeedbackClass(`edu-${index}-degree`)}>
                      {getFeedbackMessage(`edu-${index}-degree`)}
                    </div>


                  </td>


                </tr>
                <tr className="border-0 ">
                  <td className="border-0 text-end">
                    <label
                      htmlFor={`edu-${index}-currentlyPursuing`}
                      className="form-label"
                    >
                      Need to change
                    </label>
                  </td>
                  <td className="border-0" >
                    <div className="d-flex">
                      <div className="d-flex flex-column me-2 flex-fill">
                        <select
                          className={`form-control form-control-sm ${getValidationClass(
                            `edu-${index}-startMonth`
                          )}`}
                          id={`edu-${index}-startMonth`}
                          name="startMonth"
                          value={detail.startMonth}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "startMonth",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Month</option>
                          <option>January</option>
                          <option>February</option>
                          <option>March</option>
                        </select>
                        <div
                          className={getFeedbackClass(
                            `edu-${index}-startMonth`
                          )}
                        >
                          {getFeedbackMessage(`edu-${index}-startMonth`)}
                        </div>
                      </div>
                      <div className="d-flex flex-column me-2 flex-fill">
                        <select
                          className={`form-control form-control-sm ${getValidationClass(
                            `edu-${index}-startYear`
                          )}`}
                          id={`edu-${index}-startYear`}
                          name="startYear"
                          value={detail.startYear}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "startYear",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Year</option>
                          <option>2020</option>
                          <option>2021</option>
                          <option>2022</option>
                        </select>
                        <div
                          className={getFeedbackClass(`edu-${index}-startYear`)}
                        >
                          {getFeedbackMessage(`edu-${index}-startYear`)}
                        </div>
                      </div>
                      <span className="mx-2">To</span>
                      <div className="d-flex flex-column me-2 flex-fill">
                        <select
                          className={`form-control form-control-sm ${getValidationClass(
                            `edu-${index}-endMonth`
                          )}`}
                          id={`edu-${index}-endMonth`}
                          name="endMonth"
                          value={detail.endMonth}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "endMonth",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Month</option>
                          <option>January</option>
                          <option>February</option>
                          <option>March</option>
                        </select>
                        <div
                          className={getFeedbackClass(`edu-${index}-endMonth`)}
                        >
                          {getFeedbackMessage(`edu-${index}-endMonth`)}
                        </div>
                      </div>
                      <div className="d-flex flex-column flex-fill">
                        <select
                          className={`form-control form-control-sm ${getValidationClass(
                            `edu-${index}-endYear`
                          )}`}
                          id={`edu-${index}-endYear`}
                          name="endYear"
                          value={detail.endYear}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "endYear",
                              e.target.value
                            )
                          }
                        >
                          <option value="">Year</option>
                          <option>2020</option>
                          <option>2021</option>
                          <option>2022</option>
                        </select>
                        <div
                          className={getFeedbackClass(`edu-${index}-endYear`)}
                        >
                          {getFeedbackMessage(`edu-${index}-endYear`)}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label
                      htmlFor={`edu-${index}-currentlyPursuing`}
                      className="form-label"
                    >
                      Currently Pursuing
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="checkbox"
                      className={`form-check-input ${getValidationClass(
                        `edu-${index}-currentlyPursuing`
                      )}`}
                      id={`edu-${index}-currentlyPursuing`}
                      name={`edu-${index}-currentlyPursuing`}
                      checked={formData.currentlyPursuing}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass(`edu-${index}-currentlyPursuing`)}>
                      {getFeedbackMessage(`edu-${index}-currentlyPursuing`)}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}

            <tr className="border">
              <th colSpan="4" className="border">
                <button
                  className="btn btn-link text-primary"
                  type="button"
                  onClick={addEducationalDetail}
                >
                  + Add Educational Details
                </button>
              </th>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">
                Experience Details
              </th>
            </tr>
            {experienceDetails.map((expDetail, index) => (
              <React.Fragment key={index}>
                <tr className="border-0">
                  <td className="text-end border-0">
                    <label
                      htmlFor={`exp-${index}-occupation`}
                      className="form-label"
                      style={{
                        position: "relative",
                      }}
                    >
                      Occupation / Title
                      <span
                        type="button"
                        className="btn btn-sm  btn-outline-secondary  rounded-pill"
                        style={{
                          position: "absolute",
                          top: 12,
                          left: "-31%",
                          transform: "translate(-50%, -50%)",
                          width: "2rem",
                          height: "2rem",
                        }}
                      >
                        {index + 1}
                      </span>
                      <div
                        className="d-flex"
                        style={{
                          position: "absolute",
                          top: 62,
                          left: "-14%",
                          transform: "translate(-50%, -50%)",
                          width: "2rem",
                          height: "4rem",
                        }}
                      >
                        <div className="vr"></div>
                      </div>
                      <span
                        type="button"
                        className="btn btn-sm   btn-outline-danger rounded-pill"
                        style={{
                          position: "absolute",
                          top: 113,
                          left: "-31%",
                          transform: "translate(-50%, -50%)",
                          width: "2rem",
                          height: "2rem",
                        }}
                        onClick={() => removeExperienceDetail(index)}
                      >
                        <i className="bi bi-trash  fs-6"></i>
                      </span>
                    </label>
                  </td>
                  <td className="border-0" colSpan="3">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        `exp-${index}-occupation`
                      )}`}
                      id={`exp-${index}-occupation`}
                      name="occupation"
                      placeholder="occupation"
                      value={expDetail.occupation}
                      onChange={(e) =>
                        handleExperienceDetailsChange(index, "occupation", e.target.value)
                      }
                    />
                    <div className={getFeedbackClass(`exp-${index}-occupation`)}>
                      {getFeedbackMessage(`exp-${index}-occupation`)}
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
                        `exp-${index}-company`
                      )}`}
                      id={`exp-${index}-company`}
                      name="company"
                      placeholder="company"
                      value={expDetail.company}
                      onChange={(e) =>
                        handleExperienceDetailsChange(index, "company", e.target.value)
                      }
                    />
                    <div className={getFeedbackClass(`exp-${index}-company`)}>
                      {getFeedbackMessage(`exp-${index}-company`)}
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
                        `exp-${index}-summary`
                      )}`}
                      id={`exp-${index}-summary`}
                      name="summary"
                      placeholder="summary"
                      value={expDetail.summary}
                      onChange={(e) =>
                        handleExperienceDetailsChange(index, "summary", e.target.value)
                      }
                    />
                    <div className={getFeedbackClass(`exp-${index}-summary`)}>
                      {getFeedbackMessage(`exp-${index}-summary`)}
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
                        className={`form-control form-control-sm ${getValidationClass(
                          `exp-${index}-startMonth`
                        )}`}
                        id={`exp-${index}-startMonth`}
                        name="startMonth"
                        value={formData.startMonth}
                        onChange={(e) =>
                          handleExperienceDetailsChange(
                            index,
                            "startMonth",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                      </select>
                      <div className={getFeedbackClass("workStartMonth")}>
                        {getFeedbackMessage("workStartMonth")}
                      </div>

                      <select
                        className={`form-control form-control-sm ${getValidationClass(
                          `exp-${index}-workStartYear`
                        )}`}
                        id={`exp-${index}-workStartYear`}
                        name="workStartYear"
                        value={formData.workStartYear}
                        onChange={(e) =>
                          handleExperienceDetailsChange(
                            index,
                            "workStartYear",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>

                      </select>



                      <span className="mx-2">To</span>

                      <select
                        className={`form-control form-control-sm ${getValidationClass(
                          `exp-${index}-workEndMonth`
                        )}`}
                        id={`exp-${index}-workEndMonth`}
                        name="endMonth"
                        value={formData.workEndMonth}
                        onChange={(e) =>
                          handleExperienceDetailsChange(
                            index,
                            "workEndMonth",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                      </select>


                      <div
                        className={getFeedbackClass(`edu-${index}-endMonth`)}
                      >
                        {getFeedbackMessage(`edu-${index}-endMonth`)}
                      </div>
                      <select
                        className={`form-control form-control-sm ${getValidationClass(
                          `exp-${index}-workEndYear`
                        )}`}
                        id={`exp-${index}-workEndYear`}
                        name="endMonth"
                        value={formData.workEndMonth}
                        onChange={(e) =>
                          handleExperienceDetailsChange(
                            index,
                            "workEndYear",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Year</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        {/* Add other years if necessary */}
                      </select>


                      <div className={getFeedbackClass("workEndYear")}>
                        {getFeedbackMessage("workEndYear")}
                      </div>
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
                      className={`form-check-input ${getValidationClass(
                        "currentlyWorking"
                      )}`}
                      type="checkbox"
                      id="currentlyWorking"
                      name="currentlyWorking"
                      checked={formData.currentlyWorking}
                      onChange={handleExperienceDetailsChange}
                    />
                    <div className={getFeedbackClass("currentlyWorking")}>
                      {getFeedbackMessage("currentlyWorking")}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}

            <tr className="border">
              <th colSpan="4" className="border">
                <button
                  className="btn btn-link text-primary"
                  type="button"
                  onClick={addExperienceDetail}
                >
                  + Add Experience
                </button>
              </th>
            </tr>
            <tr className="border">
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
                  defaultValue={formData.resume || ""} // Use defaultValue instead of value
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
                  defaultValue={formData.coverLetter || ""} // Use defaultValue instead of value
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
                  defaultValue={formData.others || ""} // Use defaultValue instead of value
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
                  defaultValue={formData.offer || ""} // Use defaultValue instead of value
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
                  defaultValue={formData.contracts || ""} // Use defaultValue instead of value
                  onChange={handleInputChange}
                />
                <div className={getFeedbackClass("contracts")}>
                  {getFeedbackMessage("contracts")}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateCandidateForm;
