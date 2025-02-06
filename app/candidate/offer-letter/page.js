'use client';

import React, { useState } from 'react';
// import "./OfferLetterForm.css"; // Optional: add your CSS file for styling

const OfferLetterForm = () => {
  const [formData, setFormData] = useState({
    companyAddress: "123 Tech Street",
    companyCity: "Bangalore",
    companyState: "Karnataka",
    companyZip: "560001",
    companyName: "Google",
    candidateName: "Ravi Kumar",
    candidateAddress: "456 Candidate Road",
    candidateCity: "Chennai",
    candidateState: "Tamil Nadu",
    candidateZip: "600001",
    jobTitle: "Software Engineer",
    startDate: "2025-02-01",
    employmentType: "Full-Time",
    salary: "750000",
    salaryType: "Yearly",
    equity: "2%",
    benefits: "Health Insurance, 401(k)",
    deadlineDate: "2025-02-15",
    hiringManagerName: "Alice Johnson",
    hiringManagerPosition: "Hiring Manager"
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'file'
            ? files[0]
            : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Offer Letter Form submitted with data:', formData);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">


        <div className="card-header bg-white text-secondary d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Offer Letter Generation</h3>
          <button type="button" class="btn btn-sm btn-primary">Submit</button>
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
                      className="form-control fixed-width-input"
                      name="companyAddress"
                      value={formData.companyAddress || ""}
                      onChange={handleChange}
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please enter the company address.</div>
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
                      className="form-control fixed-width-input"
                      name="companyCity"
                      value={formData.companyCity || ""}
                      onChange={handleChange}
                    />
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
                      className="form-control fixed-width-input"
                      name="companyState"
                      value={formData.companyState || ""}
                      onChange={handleChange}
                    />
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
                      className="form-control fixed-width-input"
                      name="companyZip"
                      value={formData.companyZip || ""}
                      onChange={handleChange}
                    />
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
                      className="form-control fixed-width-input"
                      name="companyName"
                      value={formData.companyName || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* Candidate Name */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Candidate Name</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control fixed-width-input"
                      name="candidateName"
                      value={formData.candidateName || ""}
                      onChange={handleChange}
                    />
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
                      className="form-control fixed-width-input"
                      name="candidateCity"
                      value={formData.candidateCity || ""}
                      onChange={handleChange}
                    />
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
                      className="form-control fixed-width-input"
                      name="candidateState"
                      value={formData.candidateState || ""}
                      onChange={handleChange}
                    />
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
                      className="form-control fixed-width-input"
                      name="candidateZip"
                      value={formData.candidateZip || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* Job Title */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Job Title</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control fixed-width-input"
                      name="jobTitle"
                      value={formData.jobTitle || ""}
                      onChange={handleChange}
                    />
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
                      className="form-control fixed-width-input"
                      name="startDate"
                      value={formData.startDate || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* Employment Type */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Employment Type</label>
                  <div className="flex-grow-1">
                    <select
                      className="form-select"
                      name="employmentType"
                      value={formData.employmentType || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Employment Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                    </select>
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
                      className="form-control fixed-width-input"
                      name="salary"
                      value={formData.salary || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* Salary Type */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Salary Type</label>
                  <div className="flex-grow-1">
                    <select
                      className="form-select"
                      name="salaryType"
                      value={formData.salaryType || ""}
                      onChange={handleChange}
                    >
                      <option value="">Select Salary Type</option>
                      <option value="Yearly">Yearly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Hourly">Hourly</option>
                    </select>
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
                      className="form-control fixed-width-input"
                      name="equity"
                      value={formData.equity || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* Benefits */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Benefits</label>
                  <div className="flex-grow-1">
                    <textarea
                      className="form-control fixed-width-input"
                      name="benefits"
                      value={formData.benefits || ""}
                      onChange={handleChange}
                    ></textarea>
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
                      className="form-control fixed-width-input"
                      name="deadlineDate"
                      value={formData.deadlineDate || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* Hiring Manager Name */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Hiring Manager Name</label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control fixed-width-input"
                      name="hiringManagerName"
                      value={formData.hiringManagerName || ""}
                      onChange={handleChange}
                    />
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
                      className="form-control fixed-width-input"
                      name="hiringManagerPosition"
                      value={formData.hiringManagerPosition || ""}
                      onChange={handleChange}
                    />
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
