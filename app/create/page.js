"use client";

import { useState } from "react";
import Link from "next/link";
import "./create-job.css";
import SearchableDropdown from "@/components/searchable-dropdown/SearchableDropdown";
import TokenizedTagInputForm from "@/components/tokenized-tag-input/TokenizedTagInputForm";

export default function JobOpening() {
  // 1) INITIAL STATES
  const initialState = {
    postingTitle: "",
    departmentName: "",
    title: "",
    hiringManager: "",
    assignedRecruiter: "",
    noOfPositions: "",
    targetDate: "",
    dateOpened: "",
    jobOpeningStatus: "",
    jobType: "",
    industry: "",
    workExperience: "",
    salary: "",
    // skills: "",
    skills: [], // Initialize with an empty array or desired default value
    remoteJob: false,
    city: "",
    province: "",
    country: "",
    postalCode: "",
    jobDescription: "",
    requirements: "",
    benefits: "",
    jobSummary: null,
    otherAttachments: null,
  };

  const industryOptions = [];
  industryOptions.push(...[
    "None", "Administration", "Advertising", "Agriculture", "Architecture & Construction", "Arts & Graphics", "Airline - Aviation", "Accounting", "Automotive", "Banking", "Biotechnology", "Broadcasting", "Business Management", "Charity", "Catering", "Customer Service", "Chemicals", "Construction", "Communications", "Consulting", "Computer", "Consumer", "Cosmetics", "Design", "Defence", "Education", "Electronics", "Engineering", "Energy and Utilities", "Entertainment", "Employment - Recruiting - Staffing", "Environmental", "Exercise - Fitness", "Export/Import", "Financial Services", "Fashion", "FMCG/Foods/Beverage", "Fertilizers/Pesticides", "Furniture", "Grocery", "Gas", "Government", "Government/Military", "Government & Public Sector", "Gems & Jewellery", "Health Care", "Human Resources", "Hospitality", "Hotels and Lodging", "HVAC", "Hardware", "Insurance", "Installation", "IT Services", "Industrial", "Internet Services", "Import - Export", "Legal", "Logistics", "Landscaping", "Leisure and Sport", "Library Science", "Marketing", "Manufacturing", "Management", "Merchandising", "Medical", "Media", "Metals", "Mining", "Military", "Mortgage", "Marine", "Maritime", "Nonprofit Charitable Organizations", "NGO/Social Services", "Newspaper", "Oil & Gas", "Other", "Other/Not Classified", "Pharma", "Polymer / Plastic / Rubber", "Pharma/Biotech/Clinical Research", "Public Sector and Government", "Printing/Packaging/Publishing", "Personal and Household Services", "Property & Real Estate", "Paper", "Pet Store", "Public Relations", "Real Estate", "Retail", "Retail & Wholesale", "Recreation", "Real Estate and Property", "Recruitment/Employment Firm", "Real Estate/Property Management", "Restaurant/Food Services", "Rental Services", "Research & Development", "Repair / Maintenance Services", "Services", "Sales - Marketing", "Science & Technology", "Security/Law Enforcement", "Shipping/Marine", "Security and Surveillance", "Sports and Physical Recreation", "Staffing/Employment Agencies", "Social Services", "Sports Leisure & Lifestyle", "Semiconductor", "Technology", "Services - Corporate B2B", "Travel", "Training", "Transportation", "Telecommunications", "Trade and Services", "Travel and Tourism", "Textiles/Garments/Accessories", "Tyres", "Utilities", "Wireless", "Wood / Fibre / Paper", "Waste Management", "Wholesale Trade/Import-Export"
  ]);

  const titles = ['Developer', 'Product Manager', 'Product Lead', 'Technical Manager', 'Web Designer'];
  const hiringManagerOptions = [];
  const assignedRecruiterOptions = [];
  const jobOpeningStatusOptions = [];
  const jobTypeOptions = [];
  const salaryOptions = [];
  const countryOptions = [];




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
      case "postingTitle":
      case "departmentName":
      case "title":
      case "hiringManager":
      case "assignedRecruiter":
      case "industry":
      case "skills":
      case "city":
      case "province":
      case "postalCode":
        if (!value || value.trim() === "") {
          error = `${fieldName} is required.`;
        }
        break;

      // REQUIRED NUMERIC FIELDS
      case "noOfPositions":
        if (!value || isNaN(value) || value <= 0) {
          error = "Number of positions must be a positive number.";
        }
        break;

      case "salary":
        if (!value || isNaN(value) || Number(value) <= 0) {
          error = "Salary must be a valid positive number.";
        }
        break;

      // REQUIRED DATE FIELDS
      case "targetDate":
      case "dateOpened":
        if (!value) {
          error = `${fieldName} is required.`;
        }
        break;

      // jobOpeningStatus & jobType could be required or optional; adapt as needed
      case "jobOpeningStatus":
      case "jobType":
        // Example: treat these as optional. 
        // If you want them required, add similar checks:
        // if (!value) error = `${fieldName} is required.`;
        break;

      // REMOTE JOB - optional boolean, no error needed
      case "remoteJob":
        // No validation here; it's just a checkbox
        break;

      // REQUIRED TEXTAREAS
      case "jobDescription":
      case "requirements":
      case "benefits":
        if (!value || value.trim().length < 10) {
          error = `${fieldName} must be at least 10 characters long.`;
        }
        break;

      // EXPERIENCE - if required
      case "workExperience":
        if (!value || value.trim() === "") {
          error = "Work experience is required.";
        }
        break;

      // LOCATION FIELD - required
      case "country":
        if (!value) {
          error = "Country is required.";
        }
        break;

      // FILE FIELDS
      case "jobSummary":
      case "otherAttachments":
        // For file fields, value is a FileList
        // Check if user actually selected at least one file
        if (!value || value.length === 0) {
          error = `Please upload a valid file for ${fieldName}.`;
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
    console.log('Previous form data:', formData);
    console.log('Previous touched fields:', touchedFields);

    // Update form data
    setFormData((prevData) => {
      const updatedFormData = {
        ...prevData,
        [name]: newValue,
      };
      // Log the updated form data
      console.log('Updated form data:', updatedFormData);
      return updatedFormData;
    });

    // Mark field as touched
    setTouchedFields((prev) => {
      const updatedTouchedFields = {
        ...prev,
        [name]: true,
      };
      // Log the updated touched fields
      console.log('Updated touched fields:', updatedTouchedFields);
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

  // Log changes when `TokenizedTagInput` updates the `skills`
  //Parent (JobOpening ) toified from TokenizedTagInput
  const handleSkillsChange = (newTags) => {
    console.log("Previous form data:", formData);
    const updatedFormData = { ...formData, skills: newTags };
    console.log("Updated form data:", updatedFormData);
    setFormData(updatedFormData);
  };


  return (
    <div className="container">
      <h3 className="mb-1">Create Job Opening</h3>
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

        {/* JOB OPENING INFORMATION */}
        <div className="card border-0">
          <div className="card-header bg-white">Job Opening Information</div>
          <div className="card-body">
            <table className="table">
              <tbody>
                {/* Row: Posting Title & Department Name */}
                <tr>
                  <td>
                    <label htmlFor="postingTitle" className="form-label fs-0-point-7 mb-0 me-2">
                      Posting Title (required)
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("postingTitle")}`}
                      id="postingTitle"
                      name="postingTitle"
                      value={formData.postingTitle}
                      onChange={handleInputChange}
                      placeholder="Enter posting title"
                    />
                    <div className={getFeedbackClass("postingTitle")}>
                      {getFeedbackMessage("postingTitle")}
                    </div>
                  </td>

                  <td>
                    <label htmlFor="departmentName" className="form-label fs-0-point-7 mb-0 me-2">
                      Department Name (required)
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("departmentName")}`}
                      id="departmentName"
                      name="departmentName"
                      value={formData.departmentName}
                      onChange={handleInputChange}
                      placeholder="Enter department name"
                    />
                    <div className={getFeedbackClass("departmentName")}>
                      {getFeedbackMessage("departmentName")}
                    </div>
                  </td>
                </tr>

                {/* Row: Title & Hiring Manager */}
                <tr>
                  <td>
                    <label htmlFor="title" className="form-label fs-0-point-7 mb-0 me-2">
                      Title (required)
                    </label>
                  </td>
                  <td>
                    {/* <select
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("title")}`}
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose...</option>
                      <option>Recruiter 1</option>
                      <option>Recruiter 2</option>
                    </select> */}
                    <SearchableDropdown
                      id="title"
                      name="title"
                      options={titles}
                      selectedValue={formData.title}
                      placeholder="Choose a title"
                      onSelect={(selectedOption) => setFormData((prev) => ({ ...prev, title: selectedOption }))}
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("title")}`}
                      getValidationClass={getValidationClass}
                    />

                    <div className={getFeedbackClass("title")}>
                      {getFeedbackMessage("title")}
                    </div>
                  </td>

                  <td>
                    <label htmlFor="hiringManager" className="form-label fs-0-point-7 mb-0 me-2">
                      Hiring Manager (required)
                    </label>
                  </td>
                  <td>


                    {/* <select
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("hiringManager")}`}
                      id="hiringManager"
                      name="hiringManager"
                      value={formData.hiringManager}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose...</option>
                      <option>Manager 1</option>
                      <option>Manager 2</option>
                    </select> */}

                    <SearchableDropdown
                      id="hiringManager "
                      name="hiringManager"
                      options={hiringManagerOptions}
                      selectedValue={formData.hiringManager}
                      placeholder="Choose a hiring"
                      onSelect={(selectedOption) => setFormData((prev) => ({ ...prev, hiringManager: selectedOption }))}
                      value={formData.hiringManager}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("hiringManager")}`}
                      getValidationClass={getValidationClass}
                    />
                    <div className={getFeedbackClass("hiringManager")}>
                      {getFeedbackMessage("hiringManager")}
                    </div>
                  </td>
                </tr>

                {/* Row: Assigned Recruiter & Number of Positions */}
                <tr>
                  <td>
                    <label htmlFor="assignedRecruiter" className="form-label fs-0-point-7 mb-0 me-2">
                      Assigned Recruiter(s) (required)
                    </label>
                  </td>
                  <td>
                    {/* <select
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("assignedRecruiter")}`}
                      id="assignedRecruiter"
                      name="assignedRecruiter"
                      value={formData.assignedRecruiter}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose...</option>
                      <option>Recruiter 1</option>
                      <option>Recruiter 2</option>
                    </select> */}

                    <SearchableDropdown
                      id="assignedRecruiter "
                      name="assignedRecruiter"
                      options={assignedRecruiterOptions}
                      selectedValue={formData.assignedRecruiter}
                      placeholder="Choose a hiring"
                      onSelect={(selectedOption) => setFormData((prev) => ({ ...prev, assignedRecruiter: selectedOption }))}
                      value={formData.assignedRecruiter}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("assignedRecruiter")}`}
                      getValidationClass={getValidationClass}
                    />

                    <div className={getFeedbackClass("assignedRecruiter")}>
                      {getFeedbackMessage("assignedRecruiter")}
                    </div>
                  </td>

                  <td>
                    <label htmlFor="noOfPositions" className="form-label fs-0-point-7 mb-0 me-2">
                      Number of Positions (required)
                    </label>
                  </td>
                  <td>
                    <input
                      type="number"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("noOfPositions")}`}
                      id="noOfPositions"
                      name="noOfPositions"
                      value={formData.noOfPositions}
                      onChange={handleInputChange}
                      placeholder="1"
                    />
                    <div className={getFeedbackClass("noOfPositions")}>
                      {getFeedbackMessage("noOfPositions")}
                    </div>
                  </td>
                </tr>

                {/* Row: Target Date & Date Opened */}
                <tr>
                  <td>
                    <label htmlFor="targetDate" className="form-label fs-0-point-7 mb-0 me-2">
                      Target Date (required)
                    </label>
                  </td>
                  <td>
                    <input
                      type="date"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("targetDate")}`}
                      id="targetDate"
                      name="targetDate"
                      value={formData.targetDate}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("targetDate")}>
                      {getFeedbackMessage("targetDate")}
                    </div>
                  </td>

                  <td>
                    <label htmlFor="dateOpened" className="form-label fs-0-point-7 mb-0 me-2">
                      Date Opened (required)
                    </label>
                  </td>
                  <td>
                    <input
                      type="date"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("dateOpened")}`}
                      id="dateOpened"
                      name="dateOpened"
                      value={formData.dateOpened}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("dateOpened")}>
                      {getFeedbackMessage("dateOpened")}
                    </div>
                  </td>
                </tr>

                {/* Row: Job Opening Status & Job Type (optional or required if you like) */}
                <tr>
                  <td>
                    <label htmlFor="jobOpeningStatus" className="form-label fs-0-point-7 mb-0 me-2">
                      Job Opening Status (optional)
                    </label>
                  </td>
                  <td>
                    {/* <select
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("jobOpeningStatus")}`}
                      id="jobOpeningStatus"
                      name="jobOpeningStatus"
                      value={formData.jobOpeningStatus}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose...</option>
                      <option>Open</option>
                      <option>Closed</option>
                      <option>On Hold</option>
                    </select> */}
                    <SearchableDropdown
                      id="jobType "
                      name="jobType"
                      options={jobTypeOptions}
                      selectedValue={formData.jobType}
                      placeholder="Choose a hiring"
                      onSelect={(selectedOption) => setFormData((prev) => ({ ...prev, jobType: selectedOption }))}
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("jobType")}`}
                      getValidationClass={getValidationClass}
                    />


                    <div className={getFeedbackClass("jobOpeningStatus")}>
                      {getFeedbackMessage("jobOpeningStatus")}
                    </div>
                  </td>

                  <td>
                    <label htmlFor="jobType" className="form-label fs-0-point-7 mb-0 me-2">
                      Job Type (optional)
                    </label>
                  </td>
                  <td>
                    {/* <select
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("jobType")}`}
                      id="jobType"
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose...</option>
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Contract</option>
                    </select> */}

                    <SearchableDropdown
                      id="jobOpeningStatus "
                      name="jobOpeningStatus"
                      options={jobOpeningStatusOptions}
                      selectedValue={formData.jobOpeningStatus}
                      placeholder="Choose a hiring"
                      onSelect={(selectedOption) => setFormData((prev) => ({ ...prev, jobOpeningStatus: selectedOption }))}
                      value={formData.jobOpeningStatus}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("jobOpeningStatus")}`}
                      getValidationClass={getValidationClass}
                    />
                    <div className={getFeedbackClass("jobType")}>
                      {getFeedbackMessage("jobType")}
                    </div>
                  </td>
                </tr>

                {/* Row: Salary & Skills */}
                <tr>
                  <td>
                    <label htmlFor="salary" className="form-label fs-0-point-7 mb-0 me-2">
                      Salary (required)
                    </label>
                  </td>
                  <td>
                    {/* <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("salary")}`}
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="Enter salary"
                    /> */}

                    <SearchableDropdown
                      id="salary"
                      name="salary"
                      options={salaryOptions}
                      selectedValue={formData.salary}
                      placeholder="Choose a recruiter"
                      onSelect={(selectedOption) => setFormData((prev) => ({ ...prev, salary: selectedOption }))}
                      value={formData.salary}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("salary")}`}
                      getValidationClass={getValidationClass}
                    />


                    <div className={getFeedbackClass("salary")}>
                      {getFeedbackMessage("salary")}
                    </div>
                  </td>

                  <td>
                    <label htmlFor="skills" className="form-label fs-0-point-7 mb-0 me-2">
                      Required Skills (required)
                    </label>
                  </td>
                  <td>
                    {/* <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("skills")}`}
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="Search and add skills"
                    /> */}
                    <TokenizedTagInputForm
                      suggestionList={["java", "javascript", "reactjs", "python", "angular"]}
                      className="form-control-sm small-placeholder"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      // onChange={(newInputValue, newTags) => {
                      //   // You can update the parent component's state here
                      //   setFormData({ ...formData, skills: newTags });
                      // }}

                      // onChange={(newTags) => setFormData({ ...formData, skills: newTags })}
                      onChange={handleSkillsChange} // Notify parent of changes
                      placeholder="Search and add skills"
                    />
                    {/* 
<SearchableDropdown
                      id="title"
                      name="title"
                      options={titles}
                      selectedValue={formData.title}
                      placeholder="Choose a title"
                      onSelect={(selectedOption) => setFormData((prev) => ({ ...prev, title: selectedOption }))}
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("title")}`}
                      getValidationClass={getValidationClass}
                    /> */}

                    <div className={getFeedbackClass("skills")}>
                      {getFeedbackMessage("skills")}
                    </div>
                  </td>
                </tr>

                {/* Row: Remote Job checkbox */}
                <tr>
                  <td>
                    <label htmlFor="remoteJob" className="form-label fs-0-point-7 mb-0 me-2">
                      Remote Job (optional)
                    </label>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      className={`form-check-input ${getValidationClass("remoteJob")}`}
                      id="remoteJob"
                      name="remoteJob"
                      checked={formData.remoteJob}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("remoteJob")}>
                      {getFeedbackMessage("remoteJob")}
                    </div>
                  </td>
                  <td>
                    <label htmlFor="industry" className="form-label fs-0-point-7 mb-0 me-2">
                      Industry
                    </label>
                  </td>
                  <td>

                    <SearchableDropdown
                      id="industry"
                      name="industry"
                      options={industryOptions}
                      selectedValue={formData.industry}
                      placeholder="Choose a recruiter"
                      onSelect={(selectedOption) => setFormData((prev) => ({ ...prev, industry: selectedOption }))}
                      value={formData.industry}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("industry")}`}
                      getValidationClass={getValidationClass}
                    />
                    <div className={getFeedbackClass("industry")}>
                      {getFeedbackMessage("industry")}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colSpan={12}>
                    <div className="card-header bg-white">Address Information</div>

                  </td>
                </tr>
                {/* Row: City & Province */}
                <tr>
                  <td>
                    <label htmlFor="city" className="form-label fs-0-point-7 mb-0 me-2">
                      City (required)
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("city")}`}
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                    />
                    <div className={getFeedbackClass("city")}>
                      {getFeedbackMessage("city")}
                    </div>
                  </td>

                  <td>
                    <label htmlFor="province" className="form-label fs-0-point-7 mb-0 me-2">
                      Province (required)
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("province")}`}
                      id="province"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                      placeholder="Enter province"
                    />
                    <div className={getFeedbackClass("province")}>
                      {getFeedbackMessage("province")}
                    </div>
                  </td>
                </tr>

                {/* Row: Country & Postal Code */}
                <tr>
                  <td>
                    <label htmlFor="country" className="form-label fs-0-point-7 mb-0 me-2">
                      Country (required)
                    </label>
                  </td>
                  <td>
                    {/* <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("country")}`}
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="Enter country"
                    /> */}

                    <SearchableDropdown
                      id="country"
                      name="country"
                      options={countryOptions}
                      selectedValue={formData.country}
                      placeholder="Choose a Country"
                      onSelect={(selectedOption) => setFormData((prev) => ({ ...prev, country: selectedOption }))}
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass("country")}`}
                      getValidationClass={getValidationClass}
                    />

                    <div className={getFeedbackClass("country")}>
                      {getFeedbackMessage("country")}
                    </div>
                  </td>

                  <td>
                    <label htmlFor="postalCode" className="form-label fs-0-point-7 mb-0 me-2">
                      Postal Code (required)
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("postalCode")}`}
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="Enter postal code"
                    />
                    <div className={getFeedbackClass("postalCode")}>
                      {getFeedbackMessage("postalCode")}
                    </div>
                  </td>
                </tr>


                <tr>
                  <td colSpan={12}>
                    <div className="card-header bg-white">Description  Information</div>

                  </td>
                </tr>
                {/* Row: Work Experience */}
                <tr>
                  <td>
                    <label htmlFor="workExperience" className="form-label fs-0-point-7 mb-0 me-2">
                      Work Experience (required)
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("workExperience")}`}
                      id="workExperience"
                      name="workExperience"
                      value={formData.workExperience}
                      onChange={handleInputChange}
                      placeholder="e.g. 2-3 years"
                    />
                    <div className={getFeedbackClass("workExperience")}>
                      {getFeedbackMessage("workExperience")}
                    </div>
                  </td>
                </tr>

                {/* Row: Job Description */}
                <tr>
                  <td>
                    <label htmlFor="jobDescription" className="form-label fs-0-point-7 mb-0 me-2">
                      Job Description (required)
                    </label>
                  </td>
                  <td colSpan="3">
                    <textarea
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("jobDescription")}`}
                      id="jobDescription"
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      placeholder="Enter job description"
                    />
                    <div className={getFeedbackClass("jobDescription")}>
                      {getFeedbackMessage("jobDescription")}
                    </div>
                  </td>
                </tr>

                {/* Row: Requirements */}
                <tr>
                  <td>
                    <label htmlFor="requirements" className="form-label fs-0-point-7 mb-0 me-2">
                      Requirements (required)
                    </label>
                  </td>
                  <td colSpan="3">
                    <textarea
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("requirements")}`}
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="Enter job requirements"
                    />
                    <div className={getFeedbackClass("requirements")}>
                      {getFeedbackMessage("requirements")}
                    </div>
                  </td>
                </tr>

                {/* Row: Benefits */}
                <tr>
                  <td>
                    <label htmlFor="benefits" className="form-label fs-0-point-7 mb-0 me-2">
                      Benefits (required)
                    </label>
                  </td>
                  <td colSpan="3">
                    <textarea
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("benefits")}`}
                      id="benefits"
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleInputChange}
                      placeholder="Enter job benefits"
                    />
                    <div className={getFeedbackClass("benefits")}>
                      {getFeedbackMessage("benefits")}
                    </div>
                  </td>
                </tr>

                {/* Row: Job Summary (File Input) */}
                <tr>
                  <td>
                    <label htmlFor="jobSummary" className="form-label fs-0-point-7 mb-0 me-2">
                      Job Summary (required)
                    </label>
                  </td>
                  <td colSpan="3">
                    <input
                      type="file"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("jobSummary")}`}
                      id="jobSummary"
                      name="jobSummary"
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("jobSummary")}>
                      {getFeedbackMessage("jobSummary")}
                    </div>
                  </td>
                </tr>

                {/* Row: Other Attachments (File Input) */}
                <tr>
                  <td>
                    <label htmlFor="otherAttachments" className="form-label fs-0-point-7 mb-0 me-2">
                      Other Attachments (required)
                    </label>
                  </td>
                  <td colSpan="3">
                    <input
                      type="file"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass("otherAttachments")}`}
                      id="otherAttachments"
                      name="otherAttachments"
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("otherAttachments")}>
                      {getFeedbackMessage("otherAttachments")}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="d-flex justify-content-end gap-3 mb-3">
          <button type="submit" className="btn btn-primary">
            Save and Publish
          </button>
        </div>
      </form>
    </div>
  );
}