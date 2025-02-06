"use client";

import AddDepartmentModal from "@/components/modal/add-department/add-department";
import CandidateSelectionModal from "@/components/modal/candidate-selection/CandidateSelectionModal";
import React, { useState } from "react";

const InterviewFormHandler = () => {
  const [formData, setFormData] = useState({
    interviewName: "",
    parentDepartmentId: "",
    departmentName: "",
    from: "",
    interviewers: "",
    location: "",
    candidateId: "",
    candidateName: "",
    postingTitle: "",
    to: "",
    interviewOwner: "",
    scheduleComments: "",
    assessmentName: "",
    reminder: "",
  });
  // 1. Main data in the parent
  const [data, setData] = useState({
    departmentName: "",
    parentDepartmentId: "",
    departmentLead: {
      firstName: "",
      lastName: "",
      email: "",
    },
    attachmentPath: "",
  });
  // 2. Toggle whether the modal is visible or not
  const [showModal, setShowModal] = useState(null);

  // Function to open the modal with a specific modal type
  const handleOpenModal = (modalType) => {
    setShowModal(modalType);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  const handleSaveData = (updatedData) => {
    setData(updatedData);
    console.log("updatedData", updatedData);

    // Optionally set formData again if needed when saving
    setFormData((prevFormData) => ({
      ...prevFormData,
      departmentName: updatedData.departmentName || prevFormData.departmentName || "",
      parentDepartmentId: updatedData.parentDepartmentId || prevFormData.parentDepartmentId || "",
      // If updatedData contains candidate data, set it to the form data
      candidateId: updatedData.candidateId || prevFormData.candidateId || "",
      candidateName: updatedData.candidateName || prevFormData.candidateName || "",
    }));
  };

  return (
    <div className="container mt-5">
      {/* Conditionally render modals based on the showModal state */}
      {showModal === "department" && (
        <AddDepartmentModal
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
      {showModal === "candidate" && (
        <CandidateSelectionModal
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
      <div className="card shadow-sm ">
        <div className="card-header bg-white text-secondary d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Interview Information</h3>
          <button type="button" class="btn btn-sm btn-primary">Submit</button>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="row g-3">
              {/* Interview Name */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">
                    Interview Name
                    <span className="text-danger fs-5">*</span>
                  </label>
                  <div className="flex-grow-1">
                    <select
                      className="form-select"
                      name="interviewName"
                      value={formData.interviewName}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Interview</option>
                      <option value="Technical">Technical</option>
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                    </select>
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">
                      Please select an interview name.
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Name */}
              <div className="col-md-6">
                <div className="d-flex align-items-center position-relative">
                  <label className="form-label fixed-width-label">
                    Department Name
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      name="departmentName"
                      value={formData.departmentName}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    className="btn  btn-light  py-0 position-absolute top-50 end-0 translate-middle-y "
                    style={{
                      whiteSpace: "nowrap",
                      height: "33.1px",
                      marginRight: "0.8px",
                      borderRadius: "0px 3.2px 3.2px 0px",
                    }}
                    onClick={() => handleOpenModal("department")}
                  >
                    <i className="bi bi-buildings fs-6 "></i>
                  </button>
                </div>
              </div>

              {/* From (Datetime) */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">From</label>
                  <div className="flex-grow-1">
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Interviewers */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">
                    Interviewer(s)
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      name="interviewers"
                      value={formData.interviewers}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">
                    Location
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Candidate Name */}
              <div className="col-md-6">
                <div className="d-flex align-items-center position-relative">
                  <label className="form-label fixed-width-label">
                    Candidate Name
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      name="candidateName"
                      value={formData.candidateName || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    className="btn  btn-light  py-0 position-absolute top-50 end-0 translate-middle-y "
                    style={{
                      whiteSpace: "nowrap",
                      height: "33.1px",
                      marginRight: "0.8px",
                      borderRadius: "0px 3.2px 3.2px 0px",
                    }}
                    onClick={() => handleOpenModal("candidate")}
                  >
                    <i className="bi bi-buildings fs-6 "></i>
                  </button>
                </div>
              </div>

              {/* Posting Title */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">
                    Posting Title
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      name="postingTitle"
                      value={formData.postingTitle}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* To (Datetime) */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">To</label>
                  <div className="flex-grow-1">
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Interview Owner */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">
                    Interview Owner
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      name="interviewOwner"
                      value={formData.interviewOwner}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Schedule Comments (Textarea) */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">
                    Schedule Comments
                  </label>
                  <div className="flex-grow-1">
                    <textarea
                      className="form-control"
                      name="scheduleComments"
                      value={formData.scheduleComments}
                      onChange={handleChange}

                    />
                  </div>
                </div>
              </div>

              {/* Assessment Name */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">
                    Assessment Name
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      name="assessmentName"
                      value={formData.assessmentName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Reminder */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">
                    Reminder
                  </label>
                  <div className="flex-grow-1">
                    <select
                      className="form-select"
                      name="reminder"
                      value={formData.reminder}
                      onChange={handleChange}
                    >
                      <option value="">Select Reminder</option>
                      <option value="1 Day">1 Day Before</option>
                      <option value="2 Days">2 Days Before</option>
                      <option value="1 Week">1 Week Before</option>
                    </select>
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

export default InterviewFormHandler;
