"use client";

import { useState } from "react";
import "./create-job.css";

export default function JobOpening() {
  
  // Initial state with 22 fields
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
    skills: "",
    remoteJob: false,
    city: "",
    province: "",
    country: "",
    postalCode: "",
    jobDescription: "",
    requirements: "",
    benefits: "",
    jobSummary: null,
    otherAttachments: null
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : type === "file" ? files : value,
      };
      return newData;
    });

    // Validate the field when it's changed
    validateField(name, value, type);
  };

  // Validate individual field
  const validateField = (fieldName, value, type) => {
    let error = "";

    switch (fieldName) {
      case "postingTitle":
      case "departmentName":
      case "title":
      case "hiringManager":
      case "assignedRecruiter":
      case "industry":
      case "salary":
      case "skills":
      case "city":
      case "province":
      case "postalCode":
        if (!value || value.trim() === "") {
          error = `${fieldName} is required.`;
        }
        break;
      case "noOfPositions":
        if (!value || isNaN(value) || value <= 0) {
          error = "Number of positions must be a positive number.";
        }
        break;
      case "targetDate":
      case "dateOpened":
        if (!value) {
          error = `${fieldName} is required.`;
        }
        break;
      case "remoteJob":
        // No validation for checkbox, it's just checked or unchecked.
        break;
      case "jobDescription":
      case "requirements":
      case "benefits":
        if (!value || value.trim().length < 10) {
          error = `${fieldName} must be at least 10 characters long.`;
        }
        break;
      // case "jobSummary":
      // case "otherAttachments":
      //   if (!files || files.length === 0) {
      //     error = `Please upload a valid file for ${fieldName}.`;
      //   }
      //   break;
      case "workExperience":
        if (!value) {
          error = "Work experience is required.";
        }
        break;
      case "salary":
        if (!value || isNaN(value) || value <= 0) {
          error = "Salary must be a valid positive number.";
        }
        break;
      case "country":
        if (!value) {
          error = "Country is required.";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Validate all fields on submit
    Object.keys(formData).forEach((fieldName) => {
      const value = formData[fieldName];
      const type = typeof value === "boolean" ? "checkbox" : typeof value;
      validateField(fieldName, value, type);

      // If there's any error, set valid to false
      if (formErrors[fieldName]) {
        valid = false;
      }
    });

    if (valid) {
      console.log("Form data:", formData);
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="container">
      <h3 className="mb-1">Create Job Opening</h3>
      <form onSubmit={handleSubmit}>
        {/* Actions */}
        <div className="d-flex justify-content-end gap-3 mb-3">
          <button type="button" className="btn btn-secondary">Cancel</button>
          <button type="submit" className="btn btn-primary">Save and Publish</button>
        </div>

        {/* Job Opening Information */}
        <div className="card border-0">
          <div className="card-header bg-white">Job Opening Information</div>
          <div className="card-body">
            <table className="table">
              <tbody>
                <tr>
                  <td><label htmlFor="postingTitle" className="form-label fs-0-point-7 mb-0 me-2">Posting Title</label></td>
                  <td><input type="text" className={`form-control form-control-sm small-placeholder ${formErrors.postingTitle ? 'is-invalid' : ''}`} id="postingTitle" placeholder="Enter posting title"
                    name="postingTitle"
                    value={formData.postingTitle}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.postingTitle}</div>
                  </td>
                  <td><label htmlFor="departmentName" className="form-label fs-0-point-7 mb-0 me-2">Department Name</label></td>
                  <td><input type="text" className={`form-control form-control-sm small-placeholder ${formErrors.departmentName ? 'is-invalid' : ''}`} id="departmentName" placeholder="Enter department name"
                    name="departmentName"
                    value={formData.departmentName}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.departmentName}</div>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="title" className="form-label fs-0-point-7 mb-0 me-2">Title</label></td>
                  <td>
                    <select className={`form-select form-select-sm small-placeholder ${formErrors.title ? 'is-invalid' : ''}`} id="title"
                      name="title" value={formData.title}
                      onChange={handleInputChange}>
                      <option value="">Choose...</option>
                      <option>Recruiter 1</option>
                      <option>Recruiter 2</option>
                    </select>
                    <div className="invalid-feedback">{formErrors.title}</div>
                  </td>
                  <td><label htmlFor="hiringManager" className="form-label fs-0-point-7 mb-0 me-2">Hiring Manager</label></td>
                  <td>
                    <select className={`form-select form-select-sm small-placeholder ${formErrors.hiringManager ? 'is-invalid' : ''}`} id="hiringManager" name="hiringManager" value={formData.hiringManager}
                      onChange={handleInputChange}>
                      <option value="">Choose...</option>
                      <option>Manager 1</option>
                      <option>Manager 2</option>
                    </select>
                    <div className="invalid-feedback">{formErrors.hiringManager}</div>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="assignedRecruiter" className="form-label fs-0-point-7 mb-0 me-2">Assigned Recruiter(s)</label></td>
                  <td>
                    <select className={`form-select form-select-sm small-placeholder ${formErrors.assignedRecruiter ? 'is-invalid' : ''}`} id="assignedRecruiter"
                      name="assignedRecruiter"
                      value={formData.assignedRecruiter}
                      onChange={handleInputChange}>
                      <option value="">Choose...</option>
                      <option>Recruiter 1</option>
                      <option>Recruiter 2</option>
                    </select>
                    <div className="invalid-feedback">{formErrors.assignedRecruiter}</div>
                  </td>

                  <td><label htmlFor="positions" className="form-label fs-0-point-7 mb-0 me-2">Number of Positions</label></td>
                  <td><input type="number" className={`form-control form-control-sm small-placeholder ${formErrors.noOfPositions ? 'is-invalid' : ''}`} id="positions" placeholder="1" name="noOfPositions"
                    value={formData.noOfPositions}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.noOfPositions}</div>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="targetDate" className="form-label fs-0-point-7 mb-0 me-2">Target Date</label></td>
                  <td><input type="date" className={`form-control form-control-sm small-placeholder ${formErrors.targetDate ? 'is-invalid' : ''}`} id="targetDate"
                    name="targetDate"
                    value={formData.targetDate}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.targetDate}</div>
                  </td>
                  <td><label htmlFor="dateOpened" className="form-label fs-0-point-7 mb-0 me-2">Date Opened</label></td>
                  <td><input type="date" className={`form-control form-control-sm small-placeholder ${formErrors.dateOpened ? 'is-invalid' : ''}`} id="dateOpened" name="dateOpened"
                    value={formData.dateOpened}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.dateOpened}</div>
                  </td>
                </tr>

                {/* More fields will follow the same pattern */}
                <tr>
                  <td><label htmlFor="salary" className="form-label fs-0-point-7 mb-0 me-2">Salary</label></td>
                  <td><input type="text" className={`form-control form-control-sm small-placeholder ${formErrors.salary ? 'is-invalid' : ''}`} id="salary" placeholder="Enter salary" name="salary"
                    value={formData.salary}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.salary}</div>
                  </td>

                  <td><label htmlFor="skills" className="form-label fs-0-point-7 mb-0 me-2">Required Skills</label></td>
                  <td><input type="text" className={`form-control form-control-sm small-placeholder ${formErrors.skills ? 'is-invalid' : ''}`} id="skills" placeholder="Search and add skills" name="skills"
                    value={formData.skills}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.skills}</div>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="city" className="form-label fs-0-point-7 mb-0 me-2">City</label></td>
                  <td><input type="text" className={`form-control form-control-sm small-placeholder ${formErrors.city ? 'is-invalid' : ''}`} id="city" placeholder="Enter city" name="city"
                    value={formData.city}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.city}</div>
                  </td>

                  <td><label htmlFor="province" className="form-label fs-0-point-7 mb-0 me-2">Province</label></td>
                  <td><input type="text" className={`form-control form-control-sm small-placeholder ${formErrors.province ? 'is-invalid' : ''}`} id="province" placeholder="Enter province" name="province"
                    value={formData.province}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.province}</div>
                  </td>
                </tr>

                <tr>
                  <td><label htmlFor="country" className="form-label fs-0-point-7 mb-0 me-2">Country</label></td>
                  <td><input type="text" className={`form-control form-control-sm small-placeholder ${formErrors.country ? 'is-invalid' : ''}`} id="country" placeholder="Enter country" name="country"
                    value={formData.country}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.country}</div>
                  </td>

                  <td><label htmlFor="postalCode" className="form-label fs-0-point-7 mb-0 me-2">Postal Code</label></td>
                  <td><input type="text" className={`form-control form-control-sm small-placeholder ${formErrors.postalCode ? 'is-invalid' : ''}`} id="postalCode" placeholder="Enter postal code" name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.postalCode}</div>
                  </td>
                </tr>

                <tr>
                  <td><label htmlFor="jobDescription" className="form-label fs-0-point-7 mb-0 me-2">Job Description</label></td>
                  <td><textarea className={`form-control form-control-sm small-placeholder ${formErrors.jobDescription ? 'is-invalid' : ''}`} id="jobDescription" placeholder="Enter job description" name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleInputChange}></textarea>
                    <div className="invalid-feedback">{formErrors.jobDescription}</div>
                  </td>
                </tr>

                <tr>
                  <td><label htmlFor="requirements" className="form-label fs-0-point-7 mb-0 me-2">Requirements</label></td>
                  <td><textarea className={`form-control form-control-sm small-placeholder ${formErrors.requirements ? 'is-invalid' : ''}`} id="requirements" placeholder="Enter job requirements" name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}></textarea>
                    <div className="invalid-feedback">{formErrors.requirements}</div>
                  </td>
                </tr>

                <tr>
                  <td><label htmlFor="benefits" className="form-label fs-0-point-7 mb-0 me-2">Benefits</label></td>
                  <td><textarea className={`form-control form-control-sm small-placeholder ${formErrors.benefits ? 'is-invalid' : ''}`} id="benefits" placeholder="Enter job benefits" name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}></textarea>
                    <div className="invalid-feedback">{formErrors.benefits}</div>
                  </td>
                </tr>

                <tr>
                  <td><label htmlFor="jobSummary" className="form-label fs-0-point-7 mb-0 me-2">Job Summary</label></td>
                  <td><input type="file" className={`form-control form-control-sm small-placeholder ${formErrors.jobSummary ? 'is-invalid' : ''}`} id="jobSummary" name="jobSummary"
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.jobSummary}</div>
                  </td>
                </tr>

                <tr>
                  <td><label htmlFor="otherAttachments" className="form-label fs-0-point-7 mb-0 me-2">Other Attachments</label></td>
                  <td><input type="file" className={`form-control form-control-sm small-placeholder ${formErrors.otherAttachments ? 'is-invalid' : ''}`} id="otherAttachments" name="otherAttachments"
                    onChange={handleInputChange} />
                    <div className="invalid-feedback">{formErrors.otherAttachments}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-end gap-3 mb-3">
          <button type="submit" className="btn btn-primary">Save and Publish</button>
        </div>
      </form>
    </div>
  );
}
