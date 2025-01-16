"use client";
import React, { useState } from "react";
import "../candidate.css";
import { ValidationHelper } from "@/components/TypeAheadDropdown/ValidationHelper";

const CreateCandidateForm = () => {
  // Initial state for form data
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
    emailOptOut: false,
    resume: null,
    coverLetter: null,
    others: null,
    offer: null,
    contracts: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State for educational details
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

  // State for experience details
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

  // Helper function to get validation classes for fields
  const getValidationClass = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return ""; // No class if the field isn't touched
    }
    return formErrors[fieldName] ? "is-invalid" : "is-valid";
  };

  // Helper function to get feedback classes for validation messages
  const getFeedbackClass = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return ""; // No class if the field isn't touched
    }
    return formErrors[fieldName] ? "invalid-feedback" : "valid-feedback";
  };

  // Helper function to get feedback messages for fields
  const getFeedbackMessage = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return ""; // No message if the field isn't touched
    }
    return formErrors[fieldName] || "Looks good!";
  };

  // Handler for changes in educational details
  const handleEducationChange = (index, field, value) => {
    console.log(`Updating educational detail at index ${index}, field ${field} with value: ${value}`);
    const updatedDetails = educationalDetails.map((detail, idx) =>
      idx === index ? { ...detail, [field]: value } : detail
    );
    setEducationalDetails(updatedDetails);

    const fieldKey = `edu-${index}-${field}`;
    setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));

    const error = ValidationHelper.validateField(fieldKey, value, typeof value);
    setFormErrors((prev) => ({ ...prev, [fieldKey]: error }));
  };

  // Handler for changes in experience details
  const handleExperienceDetailsChange = (index, field, value) => {
    console.log(`Updating experience detail at index ${index}, field ${field} with value: ${value}`);
    const updatedDetails = experienceDetails.map((detail, idx) =>
      idx === index ? { ...detail, [field]: value } : detail
    );
    setExperienceDetails(updatedDetails);

    const fieldKey = `exp-${index}-${field}`;
    setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));

    const error = ValidationHelper.validateField(fieldKey, value, typeof value);
    setFormErrors((prev) => ({ ...prev, [fieldKey]: error }));
  };

  // Add a new educational detail entry
  const addEducationalDetail = () => {
    console.log("Adding a new educational detail.");
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

  // Add a new experience detail entry
  const addExperienceDetail = () => {
    console.log("Adding a new experience detail.");
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
  };

  // Remove an experience detail entry
  const removeExperienceDetail = (index) => {
    console.log(`Removing experience detail at index ${index}.`);
    setExperienceDetails(experienceDetails.filter((_, idx) => idx !== index));
  };

  // Remove an educational detail entry
  const removeEducationalDetail = (index) => {
    console.log(`Removing educational detail at index ${index}.`);
    setEducationalDetails(educationalDetails.filter((_, idx) => idx !== index));
  };

  // Handle changes in general form inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "checkbox" ? checked : type === "file" ? files : value;

    console.log(`Updating form field ${name} with value: ${newValue}`);
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    const error = ValidationHelper.validateField(name, newValue, type);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submission started.");

    let valid = true;
    const newErrors = {};
    const touched = {};

    // Validate formData
    Object.keys(formData).forEach((field) => {
      const error = ValidationHelper.validateField(
        field,
        formData[field],
        typeof formData[field]
      );
      if (error) valid = false;
      newErrors[field] = error;
      touched[field] = true;
    });

    setFormErrors(newErrors);
    setTouchedFields(touched);

    if (valid) {
      const finalData = {
        ...formData,
        educationalDetails,
        experienceDetails,
      };
      console.log("Form submitted successfully with data:", finalData);
      alert("Form submitted successfully!");
      setIsSubmitted(true);
    } else {
      console.log("Form submission failed due to validation errors.", newErrors);
      alert("Please fix the errors in the form.");
    }
  };

  // Render the form (Add JSX for rendering form inputs as required)


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
                        handleEducationChange(
                          index,
                          "institute",
                          e.target.value
                        )
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
                      {getFeedbackMessage(`edu-${index}-major`)}
                    </div>
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
                  <td className="border-0">
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
                    <div
                      className={getFeedbackClass(
                        `edu-${index}-currentlyPursuing`
                      )}
                    >
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
                        handleExperienceDetailsChange(
                          index,
                          "occupation",
                          e.target.value
                        )
                      }
                    />
                    <div
                      className={getFeedbackClass(`exp-${index}-occupation`)}
                    >
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
                        handleExperienceDetailsChange(
                          index,
                          "company",
                          e.target.value
                        )
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
                        handleExperienceDetailsChange(
                          index,
                          "summary",
                          e.target.value
                        )
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