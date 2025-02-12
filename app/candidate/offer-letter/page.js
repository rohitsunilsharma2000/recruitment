'use client';

import { ValidationHelper } from '@/components/form-validator/ValidationHelper';
import { fetchAllCandidates, fetchJobTypes, GetAllJobOpenings, GetAllUsers } from '@/utils/restClient';
import React, { useEffect, useState } from 'react';
// import "./OfferLetterForm.css"; // Optional: add your CSS file for styling

const OfferLetterForm = () => {
  const [formData, setFormData] = useState({
    companyAddress: "123 Tech Street",
    companyCity: "Bangalore",
    companyState: "Karnataka",
    companyZip: "560001",/* The above code is a snippet of a React component that handles form data for
    generating an offer letter. Here is a breakdown of what the code is doing: */

    companyName: "Google",
    candidateName: "",
    candidateAddress: "",
    candidateCity: "",
    candidateState: "",
    candidateZip: "",
    jobTitle: "Software Engineer",
    startDate: "2025-02-01",
    employmentType: "Full-Time",
    salary: "750000",
    salaryType: "",
    equity: "2%",
    perksAndbenefits: "",
    deadlineDate: "2025-02-15",
    hiringManagerName: "Alice Johnson",
    hiringManagerPosition: "Hiring Manager"
  });
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [jobTitles, setjobTitle] = useState([]);
  const [hiringManagers, setHiringManager] = useState([]);
  const [candidateNames, setCandidates] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "candidateName") {

      const selectedCandidate = candidateNames.find((candidate) => candidate.name === value);

      if (selectedCandidate) {
        setFormData((prevState) => (
          {
            ...prevState,
            candidateName: selectedCandidate.name,
            candidateCity: selectedCandidate.city,
            candidateAddress: selectedCandidate.candidateAddress,
            candidateState: selectedCandidate.candidateState,
            candidateZip: selectedCandidate.candidateZip,

            // candidateAddress: `${item.addressInformation.city}, ${item.addressInformation.province}, ${item.addressInformation.country}, ${item.addressInformation.postalCode}`,
            // candidateState: "Bengaluru",
            // candidateZip: "897865",


          }
        ))
      }

    } else {

      setFormData((prevState) => ({
        ...prevState,
        [name]:
          type === 'checkbox'
            ? checked
            : type === 'file'
              ? files[0]
              : value,
      }));
    }


    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    // Validate the field using ValidationHelper
    const error = ValidationHelper.validateField(name, value, typeof value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};
    const touched = {};

    if (!formData) {
      console.error("❌ formData is undefined");
      alert("❌ formData is undefined");
      return;
    }
    Object.keys(formData).forEach((field) => {
      if (formData[field] === undefined || formData[field] === null) {
        console.warn(`Field ${field} is undefined/null`);
        alert(`❌ Field ${field} is undefined/null`);
      }
      const error = ValidationHelper.validateField(field, formData[field], typeof formData[field]);
      if (error) valid = false;
      newErrors[field] = error;

      touched[field] = true;
    });

    setFormErrors(newErrors);
    setTouchedFields(touched);

    if (valid) {
      console.log("✅ All input fields are filled. Submitting form...", formData);
    } else {
      console.log(
        "❌ Form has missing inputs fields. Fix errors before submitting."
      );
      alert("⚠️ Some  input fields are missing. Please fill them in.");
      console.log("Form has validation errors.");
    }
  }

  useEffect(() => {
    async function employmentTypeData() {
      try {
        const response = await fetchJobTypes(); // Fetch data from the API
        console.log("Fetched Employment Type :", response); // Log the response for debugging
        setEmploymentTypes(response); // Store the response data in state
      } catch (error) {
        console.error("Failed to fetch employmentTypeData:", error);

      }
    }
    employmentTypeData(); // Trigger the API call when the component mounts


    async function jobTitleData() {
      try {
        const response = await GetAllJobOpenings(); // Fetch data from the API
        const simplifiedData = response.map(item => ({
          id: item.id,
          postingTitle: item.postingTitle
        }));
        console.log("Fetched job Titles :", simplifiedData); // Log the response for debugging

        setjobTitle(simplifiedData); // Store the response data in state
      } catch (error) {
        console.error("Failed to Get All Job Title:", error);
      }
    }
    jobTitleData();



    async function hiringManagerData() {
      try {
        const response = await GetAllUsers(); // Fetch data from the API
        // console.log("Fetched Hiring Manager  response:", response); // Log the response for debugging

        const simplifiedData = response.map(item => ({
          id: item.id,
          name: item.firstName + " " + item.lastName
        }));
        console.log("Fetched Hiring Manager  :", simplifiedData); // Log the response for debugging

        setHiringManager(simplifiedData); // Store the response data in state
      } catch (error) {
        console.error("Failed to Get Hiring Manager:", error);
      }
    }

    hiringManagerData();
    //setCandidates
    async function fetchCandidateData() {
      try {
        const response = await fetchAllCandidates(); // Fetch data from the AP
        const simplifiedData = response.map(item => ({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
          city: item.addressInformation.city,

          candidateAddress: `${item.addressInformation.city}, ${item.addressInformation.province}, ${item.addressInformation.country}, ${item.addressInformation.postalCode}`,
          candidateState: "Bengaluru",
          candidateZip: "897865",


        }));
        console.log("Fetched candidate list:", simplifiedData); // Log response for debugging
        setCandidates(simplifiedData); // Store the response data in state
      } catch (error) {
        console.error("Failed to fetch candidate list:", error);
      }
    }

    fetchCandidateData();
  }, []);

  // Function to convert text to sentence case
  const formatJobType = (text) => {
    return text
      .toLowerCase()
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };
  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-white text-secondary d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Offer Letter Generation</h3>
          <button type="button"
            onClick={handleSubmit}
            className="btn btn-sm btn-primary">Submit</button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="row g-3">
              {/* Company Address */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">
                    Company Address<span className="text-danger fs-5">*</span>
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className={`form-control ${ValidationHelper.getValidationClass("companyAddress", touchedFields, formErrors)}`}
                      name="companyAddress"
                      value={formData.companyAddress || ""}
                      onChange={handleChange}
                      required
                    />
                    {/* <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please enter the company address.</div> */}
                    <div className={ValidationHelper.getFeedbackClass("companyAddress", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("companyAddress", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Company City */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Company City</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className={`form-control ${ValidationHelper.getValidationClass("companyCity", touchedFields, formErrors)}`}
                      name="companyCity"
                      value={formData.companyCity || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("companyCity", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("companyCity", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Company State */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Company State</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className={`form-control ${ValidationHelper.getValidationClass("companyState", touchedFields, formErrors)}`}
                      name="companyState"
                      value={formData.companyState || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("companyState", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("companyState", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Company Zip */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Company Zip</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className={`form-control ${ValidationHelper.getValidationClass("companyZip", touchedFields, formErrors)}`}
                      name="companyZip"
                      value={formData.companyZip || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("companyZip", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("companyZip", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Company Name */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Company Name</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className={`form-control ${ValidationHelper.getValidationClass("companyName", touchedFields, formErrors)}`}
                      name="companyName"
                      value={formData.companyName || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("companyName", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("companyName", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Candidate Name */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Candidate Name</label>
                  <div className="flex-grow-1">
                    {/* <input
                      type="text"
                      className="form-control fixed-width-input"
                      name="candidateName"
                      value={formData.candidateName || ""}
                      onChange={handleChange}
                    /> */}
                    <select
                      className={`form-select ${ValidationHelper.getValidationClass("candidateName", touchedFields, formErrors)}`}
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleChange}
                    >
                      <option value=""> Select Candidate</option>

                      {candidateNames.map((candidate) => (
                        <option key={candidate.id} value={candidate.name}>
                          {candidate.name}
                        </option>
                      ))}
                    </select>

                  </div>
                </div>
              </div>
              {/* Candidate Address */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Candidate Address</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control fixed-width-input"
                      name="candidateAddress"
                      value={formData.candidateAddress || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* Candidate City */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Candidate City</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className={`form-control ${ValidationHelper.getValidationClass("candidateCity", touchedFields, formErrors)}`}
                      name="candidateCity"
                      value={formData.candidateCity || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("candidateCity", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("candidateCity", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Candidate State */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Candidate State</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className={`form-control ${ValidationHelper.getValidationClass("candidateState", touchedFields, formErrors)}`}
                      name="candidateState"
                      value={formData.candidateState || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("candidateState", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("candidateState", touchedFields, formErrors)}
                    </div>

                  </div>
                </div>
              </div>
              {/* Candidate Zip */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Candidate Zip</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className={`form-control ${ValidationHelper.getValidationClass("candidateZip", touchedFields, formErrors)}`}
                      name="candidateZip"
                      value={formData.candidateZip || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("candidateZip", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("candidateZip", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Job Title */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Job Title</label>
                  <div className="flex-grow-1">

                    <select
                      className={`form-select ${ValidationHelper.getValidationClass("jobTitle", touchedFields, formErrors)}`}
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    >
                      <option value=""> Job Title </option>

                      {jobTitles.map((jobTitle) => (
                        <option key={jobTitle.id} value={jobTitle.postingTitle}>
                          {jobTitle.postingTitle}
                        </option>
                      ))}
                    </select>
                    <div className={ValidationHelper.getFeedbackClass("jobTitle", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("jobTitle", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Start Date */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Start Date</label>
                  <div className="flex-grow-1">
                    <input
                      type="date"
                      className={`form-control ${ValidationHelper.getValidationClass("startDate", touchedFields, formErrors)}`}
                      name="startDate"
                      value={formData.startDate || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("startDate", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("startDate", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Employment Type */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Employment Type</label>
                  <div className="flex-grow-1">
                    <select
                      className={`form-select ${ValidationHelper.getValidationClass("employmentType", touchedFields, formErrors)}`}
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                    >
                      <option value="">Select Employment Type</option>

                      {employmentTypes.map((employmentType) => (
                        <option key={employmentType} value={employmentType}>
                          {formatJobType(employmentType)}

                        </option>
                      ))}
                    </select>

                  </div>
                  <div className={ValidationHelper.getFeedbackClass("employmentType", touchedFields, formErrors)}>
                    {ValidationHelper.getFeedbackMessage("employmentType", touchedFields, formErrors)}
                  </div>
                </div>
              </div>
              {/* Salary */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Salary</label>
                  <div className="flex-grow-1">
                    <input
                      type="number"
                      className={`form-control ${ValidationHelper.getValidationClass("salary", touchedFields, formErrors)}`}
                      name="salary"
                      value={formData.salary || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("salary", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("salary", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Salary Type */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Salary Type</label>
                  <div className="flex-grow-1">
                    <select
                      // className="form-select"
                      className={`form-control ${ValidationHelper.getValidationClass("salaryType", touchedFields, formErrors)}`}

                      name="salaryType"
                      value={formData.salaryType}
                      onChange={handleChange}
                    >
                      <option value="">Select Salary Type</option>
                      <option value="Yearly">Yearly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Hourly">Hourly</option>
                    </select>
                    <div className={ValidationHelper.getFeedbackClass("salaryType", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("salaryType", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Equity */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Equity</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className={`form-control ${ValidationHelper.getValidationClass("equity", touchedFields, formErrors)}`}
                      name="equity"
                      value={formData.equity || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("equity", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("equity", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* perksAndbenefits */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Benefits</label>
                  <div className="flex-grow-1">
                    <textarea
                      className={`form-control ${ValidationHelper.getValidationClass("perksAndbenefits", touchedFields, formErrors)}`}

                      name="perksAndbenefits"
                      value={formData.perksAndbenefits}
                      onChange={handleChange}
                    ></textarea>
                    <div className={ValidationHelper.getFeedbackClass("perksAndbenefits", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("perksAndbenefits", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Deadline Date */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Deadline Date</label>
                  <div className="flex-grow-1">
                    <input
                      type="date"
                      className={`form-control ${ValidationHelper.getValidationClass("deadlineDate", touchedFields, formErrors)}`}
                      name="deadlineDate"
                      value={formData.deadlineDate || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("deadlineDate", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("deadlineDate", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>
              {/* Hiring Manager Name */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Hiring Manager Name</label>
                  <div className="flex-grow-1">
                    <select

                      className={`form-select ${ValidationHelper.getValidationClass("hiringManagerName", touchedFields, formErrors)}`}
                      name="hiringManagerName"
                      value={formData.hiringManagerName}
                      onChange={handleChange}
                    >
                      <option value=""> Hiring Manager Name </option>
                      {hiringManagers.map((hiringManager) => (
                        <option key={hiringManager.id} value={hiringManager.name}>
                          {hiringManager.name}
                        </option>
                      ))}
                    </select>
                    <div className={ValidationHelper.getFeedbackClass("hiringManagerName", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("hiringManagerName", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hiring Manager Position */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Hiring Manager Position</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className={`form-control ${ValidationHelper.getValidationClass("hiringManagerPosition", touchedFields, formErrors)}`}
                      name="hiringManagerPosition"
                      value={formData.hiringManagerPosition || ""}
                      onChange={handleChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("hiringManagerPosition", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("hiringManagerPosition", touchedFields, formErrors)}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OfferLetterForm;
