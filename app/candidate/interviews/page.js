"use client";

import { ValidationHelper } from "@/components/form-validator/ValidationHelper";
import AddDepartmentModal from "@/components/modal/add-department/add-department";
import CandidateSelectionModal from "@/components/modal/candidate-selection/CandidateSelectionModal";
import LocationSelectionModal from "@/components/modal/location-search/LocationSelectionModal";
import PostingTitleSearchModel from "@/components/modal/posting-title-search/PostingTitleSearchModel";
import MultiSelectSearch from "@/components/multi-select-search/MultiSelectSearch";
import StatusMessage from "@/components/status-message/StatusMessage";
import { fetchAllQuestion, fetchUsers, scheduleInterview } from "@/utils/restClient";
import React, { useEffect, useState } from "react";



const InterviewFormHandler = () => {
  const [formData, setFormData] = useState({
    interviewName: "",
    parentDepartmentId: "",
    departmentName: "",
    from: "",
    interviewers: [],
    location: "",
    candidateId: "",
    candidateName: "",
    postingTitle: "",
    postingId: "",
    to: "",
    interviewOwner: [],
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
  const [questionTypes, setQuestionType] = useState([]);

  // 2. Toggle whether the modal is visible or not
  const [showModal, setShowModal] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [interviewOwners, setInterviewOwners] = useState([]);



  const [formErrors, setFormErrors] = useState({});//track if any form validation error
  const [touchedFields, setTouchedFields] = useState({});//track if any fields touched 

  const [status, setStatus] = useState(''); // State to track status (loading, success, error) from api response 
  const [errorMessage, setErrorMessage] = useState('');//api error

  // Function to open the modal with a specific modal type
  const handleOpenModal = (modalType) => {
    setShowModal(modalType);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    console.log("Event triggered:", { name, value, type, checked });

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox" ? checked :
          type === "file" ? files[0] :
            value,
    }));
    // console.log("formdata ", formData)
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
      console.log("✅ All input fields are filled. Submitting form...");
      // Constructing the payload with the required structure
      const payload =
      {
        "interviewName": formData.interviewName,
        "departmentName": formData.departmentName,
        "fromDateTime": new Date(formData.from).toISOString().slice(0, 19),
        "toDateTime": new Date(formData.to).toISOString().slice(0, 19),
        "interviewerIds": formData.interviewers.map(item => item.id),
        "location": formData.location,
        "candidateId": formData.candidateId,
        "postingTitle": formData.postingTitle,
        "interviewOwnerId": formData.interviewOwner[0]?.id,
        "scheduleComments": formData.scheduleComments,
        "assessmentName": formData.assessmentName,
        "reminder": formData.reminder,
        "attachments": [
          {
            "attachmentType": "Interview Guide",
            "filePath": "/attachments/technical_interview_guide.pdf",
            "interviewId": 5
          }
        ]
      }
        ;
      // Constructing the payload with the required structure
      createInterview(payload);
      alert("✅ Form is valid and ready to submit!");
      console.log("Form Payload for submission:", payload);
      console.log("Form submitted successfully!", formData);
    } else {
      console.log(
        "❌ Form has missing inputs fields. Fix errors before submitting."
      );
      alert("⚠️ Some  input fields are missing. Please fill them in.");
      console.log("Form has validation errors.");
    }
  };
  async function createInterview(payload) {
    setStatus('loading');
    try {
      const createInterviewResponse = await scheduleInterview(payload);
      setStatus('success -  Internal created successfully!');
      console.log("Create Interview Response ", createInterviewResponse);

      setFormData((prev) => ({
        ...prev,
        interviewName: "",
        parentDepartmentId: "",
        departmentName: "",
        from: "",
        interviewers: [],
        location: "",
        candidateId: "",
        candidateName: "",
        postingTitle: "",
        postingId: "",
        to: "",
        interviewOwner: [],
        scheduleComments: "",
        assessmentName: "",
        reminder: "",
      }));

    } catch (error) {

      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'An unexpected error occurred';

      console.error("Failed to evalute Candidate:", errorMessage);
      setStatus('error');
      setErrorMessage(errorMessage);

    } finally {
      // setTimeout(() => {
      //   setStatus('');
      //   setErrorMessage('');
      // }, 10000);
    }

  }
  const handleSaveData = (updatedData) => {
    setData(updatedData);
    console.log("updatedData", updatedData);

    // Optionally set formData again if needed when saving
    setFormData((prevFormData) => ({
      ...prevFormData,

      // Ensure department data updates only if it's provided
      departmentName: updatedData.departmentName !== undefined ? updatedData.departmentName : prevFormData.departmentName,
      parentDepartmentId: updatedData.parentDepartmentId !== undefined ? updatedData.parentDepartmentId : prevFormData.parentDepartmentId,

      // Ensure candidate data updates only if it's provided
      candidateId: updatedData.candidateId !== undefined ? updatedData.candidateId : prevFormData.candidateId,
      candidateName: updatedData.candidateName !== undefined ? updatedData.candidateName : prevFormData.candidateName,

      // Ensure location updates only if it's provided
      location: updatedData.countryName !== undefined ? updatedData.countryName : prevFormData.location,

      // Ensure posting data updates only if it's provided
      postingTitle: updatedData.postingTitle !== undefined ? updatedData.postingTitle : prevFormData.postingTitle,
      postingId: updatedData.postingId !== undefined ? updatedData.postingId : prevFormData.postingId,
    }));

  };

  useEffect(() => {

    async function AllQuestionData() {
      try {
        const response = await fetchAllQuestion(); // Fetch data from the API

        // Extract unique competencyTypes and map to the desired format
        const assessmentOptions = [
          ...new Set(response.map((item) => item.competencyType)),
        ].map((type) => ({
          value: type,
          label: type,
        }));

        console.log(assessmentOptions);
        console.log("Fetched all question types:", assessmentOptions);
        setQuestionType(assessmentOptions);
      } catch (error) {
        console.error("Failed to fetch all question types :", error);
        setQuestionType([]);
      }
    }

    async function fetchUsersData() {
      try {
        const users = await fetchUsers(); // Call to fetch all users
        if (Array.isArray(users)) {
          const formattedUsers = Array.from(
            new Map(
              users.map(user => [
                `${user.firstName} ${user.lastName}`, // Key for uniqueness
                {
                  id: user.id,
                  value: `${user.firstName} ${user.lastName}`,
                  label: `${user.firstName} ${user.lastName}`
                }
              ])
            ).values()
          );


          setInterviewOwners(formattedUsers); // Set formatted users
          console.log("formattedUsers  response:", formattedUsers);

        } else {
          console.error("Invalid users response:", users);
          setInterviewOwners([]);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setInterviewOwners([]);
      }
    }
    fetchUsersData()
    AllQuestionData();
  }, []);



  const clearAll = () => {
    setFormData("");
  };
  const clearSelection = (name) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: [],
    }));
  };


  return (
    <div className="container mt-3">
      {/* Use the StatusMessage component */}
      <StatusMessage status={status} errorMessage={errorMessage} />

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
      {showModal === "location" && (
        <LocationSelectionModal
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
      {showModal === "postingTitle" && (
        <PostingTitleSearchModel
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}



      <div className="card shadow-sm ">
        <div className="card-header bg-white text-secondary d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Interview Information</h3>
          <button type="button" className="btn btn-sm btn-primary" onClick={handleSubmit}>Submit</button>
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
                      className={`form-control ${ValidationHelper.getValidationClass("interviewName", touchedFields, formErrors)}`}
                      name="interviewName"
                      value={formData.interviewName}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Interview</option>
                      <option value="Technical">Technical</option>
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                    </select>
                    <div className={ValidationHelper.getFeedbackClass("interviewName", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("interviewName", touchedFields, formErrors)}
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
                      // className={`form-control ${ValidationHelper.getValidationClass("departmentName", touchedFields, formErrors)}`}
                      name="departmentName"
                      value={formData.departmentName}
                      onChange={handleInputChange}
                    />
                    {/* <div className={ValidationHelper.getFeedbackClass("departmentName", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("departmentName", touchedFields, formErrors)}
                    </div> */}
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
                    type="button"
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
                      className={`form-control ${ValidationHelper.getValidationClass("from", touchedFields, formErrors)}`} name="from"
                      value={formData.from}
                      onChange={handleInputChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("from", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("from", touchedFields, formErrors)}
                    </div>
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
                    {/* <input
                      type="text"
                      className="form-control"
                      // className={`form-control ${ValidationHelper.getValidationClass("interviewers", touchedFields, formErrors)}`}
                      name="interviewers"
                      value={formData.interviewers}
                      onChange={handleInputChange}
                    /> */}
                    {/* <div className={ValidationHelper.getFeedbackClass("interviewers", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("interviewers", touchedFields, formErrors)}
                    </div> */}

                    <MultiSelectSearch options={interviewOwners} name="interviewers" formData={formData} handleChange={handleInputChange} clearSelection={clearSelection}
                    />

                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="col-md-6">
                <div className="d-flex align-items-center position-relative">
                  <label className="form-label fixed-width-label">

                    Location
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      // className={`form-control ${ValidationHelper.getValidationClass("location", touchedFields, formErrors)}`}
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                    {/* <div className={ValidationHelper.getFeedbackClass("location", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("location", touchedFields, formErrors)}
                    </div> */}
                  </div>
                  <button
                    className="btn  btn-light  py-0 position-absolute top-50 end-0 translate-middle-y "
                    style={{
                      whiteSpace: "nowrap",
                      height: "33.1px",
                      marginRight: "0.8px",
                      borderRadius: "0px 3.2px 3.2px 0px",
                    }}
                    onClick={() => handleOpenModal("location")}
                    type="button"

                  >
                    <i className="bi bi-buildings fs-6 "></i>
                  </button>
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
                      // className={`form-control ${ValidationHelper.getValidationClass("candidateName", touchedFields, formErrors)}`}
                      name="candidateName"
                      value={formData.candidateName || ""}
                      onChange={handleInputChange}
                    />
                    {/* <div className={ValidationHelper.getFeedbackClass("candidateName", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("candidateName", touchedFields, formErrors)}
                    </div> */}
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
                    type="button"

                  >
                    <i className="bi bi-buildings fs-6 "></i>
                  </button>
                </div>
              </div>

              {/* Posting Title */}
              <div className="col-md-6">
                <div className="d-flex align-items-center position-relative">
                  <label className="form-label fixed-width-label">
                    Posting Title
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      // className={`form-control ${ValidationHelper.getValidationClass("postingTitle", touchedFields, formErrors)}`}
                      name="postingTitle"
                      value={formData.postingTitle}
                      onChange={handleInputChange}
                    />
                    {/* <div className={ValidationHelper.getFeedbackClass("postingTitle", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("postingTitle", touchedFields, formErrors)}
                    </div> */}
                  </div>
                  <button
                    className="btn  btn-light  py-0 position-absolute top-50 end-0 translate-middle-y "
                    style={{
                      whiteSpace: "nowrap",
                      height: "33.1px",
                      marginRight: "0.8px",
                      borderRadius: "0px 3.2px 3.2px 0px",
                    }}
                    onClick={() => handleOpenModal("postingTitle")}
                    type="button"

                  >
                    <i className="bi bi-buildings fs-6 "></i>
                  </button>
                </div>
              </div>

              {/* To (Datetime) */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">To</label>
                  <div className="flex-grow-1">
                    <input
                      type="datetime-local"
                      className={`form-control ${ValidationHelper.getValidationClass("to", touchedFields, formErrors)}`}
                      name="to"
                      value={formData.to}
                      onChange={handleInputChange}
                    />
                    <div className={ValidationHelper.getFeedbackClass("to", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("to", touchedFields, formErrors)}
                    </div>
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

                    <MultiSelectSearch options={interviewOwners} name="interviewOwner" formData={formData} handleChange={handleInputChange} clearSelection={clearSelection}
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
                      className={`form-control ${ValidationHelper.getValidationClass("scheduleComments", touchedFields, formErrors)}`}
                      name="scheduleComments"
                      value={formData.scheduleComments}
                      onChange={handleInputChange}

                    />
                    <div className={ValidationHelper.getFeedbackClass("scheduleComments", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("scheduleComments", touchedFields, formErrors)}
                    </div>
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
                    <select
                      id="assessmentName"
                      name="assessmentName"
                      className={`form-control ${ValidationHelper.getValidationClass("assessmentName", touchedFields, formErrors)}`}
                      value={formData.assessmentName}
                      onChange={handleInputChange}
                      required
                    >

                      <option value="" >Choose Assessment</option>
                      {questionTypes.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className={ValidationHelper.getFeedbackClass("assessmentName", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("assessmentName", touchedFields, formErrors)}
                    </div>
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
                      className={`form-control ${ValidationHelper.getValidationClass("reminder", touchedFields, formErrors)}`}
                      name="reminder"
                      value={formData.reminder}
                      onChange={handleInputChange}
                    >

                      <option value="">Select Reminder</option>
                      <option value="1 Day">1 Day Before</option>
                      <option value="2 Days">2 Days Before</option>
                      <option value="1 Week">1 Week Before</option>
                    </select>
                    <div className={ValidationHelper.getFeedbackClass("reminder", touchedFields, formErrors)}>
                      {ValidationHelper.getFeedbackMessage("reminder", touchedFields, formErrors)}
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

export default InterviewFormHandler;
