
"use client"
import { ValidationHelper } from "@/components/form-validator/ValidationHelper";
import StatusMessage from "@/components/status-message/StatusMessage";
import { fetchJobApplicationsStatus, fetchAllJobs, createBulkJobApplications } from "@/utils/restClient";
import { useEffect, useState } from "react";

export default function AssociateJobOpening({ selectedCandidateIds = [] }) {
  const [formData, setFormData] = useState({
    jobOpening: "",
    status: "",
    comments: "",
  });
  console.log("Received selectedCandidates:", selectedCandidateIds); // Debugging

  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [allJobOpenings, setAllJobOpening] = useState([]);
  const [allJobstatus, setallJobstatus] = useState([]);
  const [status, setStatus] = useState(''); // State to track status (loading, success, error)
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { id, name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    // Validate the field using ValidationHelper
    const error = ValidationHelper.validateField(name, value, typeof value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));

  };



  async function createBulkJobApplicationsData(payload) {
    setStatus('loading');
    try {
      const response = await createBulkJobApplications(payload);
      setStatus('success -  Job opening created successfully!');
      console.log("evaluateCandidateWithId ", evaluateCandidateResponse);
      setFormData('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};
    const touched = {};

    Object.keys(formData).forEach((field) => {
      const error = ValidationHelper.validateField(field, formData[field], typeof formData[field]);
      if (error) valid = false;
      newErrors[field] = error;
      touched[field] = true;
    });

    setFormErrors(newErrors);
    setTouchedFields(touched);

    if (valid) {
      const payload = {
        "candidateIds": selectedCandidateIds,
        "jobOpeningId": formData.jobOpening,
        "status": formData.status,
        "comments": formData.comments
      };


      createBulkJobApplicationsData(payload);
      console.log("Form submitted successfully!", formData);
    } else {
      console.log("Form has validation errors.", formErrors);
    }
  };


  useEffect(() => {

    async function getAllJobOpeningsData() {
      try {
        const response = await fetchAllJobs(); // Fetch data from the API
        const filteredJobs = response.map(({ id, postingTitle }) => ({ id, postingTitle }));
        console.log("Get all job Opening:", filteredJobs); // Log the response for debugging

        setAllJobOpening(filteredJobs); // Store the response data in state
      } catch (error) {
        console.error("Error fetching job opening data:", error.message);
        setAllJobOpening([]); // Set an empty array in case of error
      }
    }



    async function allJobstatusData() {
      try {
        const statusCategories = await fetchJobApplicationsStatus(); // Fetch data from the API
        const flatStatusList = Object.values(statusCategories).flat();
        console.log("Flat Status List:", flatStatusList); // Log the response for debugging

        setallJobstatus(flatStatusList); // Store the response data in state
      } catch (error) {
        console.error("Error fetching job status data:", error.message);
        setallJobstatus([]); // Set an empty array in case of error
      }
    }
    getAllJobOpeningsData(); // Trigger the API call when the component mounts
    allJobstatusData(); // Trigger the API call when the component mounts
  }, []);

  return (
    <div>
      <div className="container ">

        {/* <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#jobApplicationModal">
          Open Job Application
        </button> */}

        <button type="button" className="btn-sm btn btn-success" data-bs-toggle="modal" data-bs-target="#jobApplicationModal">
          Associate Now
        </button>
      </div>

      <div className="modal fade" id="jobApplicationModal" tabIndex="-1" aria-labelledby="jobApplicationModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <pre style={{ background: "#f4f4f4", color: 'black', padding: "10px", borderRadius: "5px" }}>
              {JSON.stringify(selectedCandidateIds, null, 2)}
            </pre> */}

            <StatusMessage status={status} errorMessage={errorMessage} />

            <div className="modal-header">
              <h5 className="modal-title" id="jobApplicationModalLabel">Associate Job Opening</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="mb-3 d-flex flex-wrap align-items-center">

                <label htmlFor="jobOpening" className="form-label text-end" style={{ width: "180px" }}>
                  Choose Job Opening
                  <span className="text-danger fs-5">*</span>
                </label>

                <select
                  id="jobOpening"
                  name="jobOpening"
                  style={{ flex: "1", maxWidth: "300px" }}
                  className={`form-control ${ValidationHelper.getValidationClass("jobOpening", touchedFields, formErrors)}`}
                  value={formData.jobOpening}
                  onChange={handleInputChange}
                >
                  <option value="">Select a job</option>
                  {allJobOpenings.map((job) => (
                    // <option value="Software Engineer">Software Engineer</option>
                    <option key={job.id} value={job.id}>
                      {job.postingTitle}
                    </option>

                  ))}
                </select>

                <div
                  className={ValidationHelper.getFeedbackClass("jobOpening", touchedFields, formErrors)}
                  style={{ marginTop: "5px", width: "100%", clear: "both", textAlign: "right" }}
                >
                  {ValidationHelper.getFeedbackMessage("jobOpening", touchedFields, formErrors)}
                </div>

              </div>



              <div className="mb-3 d-flex flex-wrap align-items-center">
                <label htmlFor="status" className="form-label text-end" style={{ width: "180px" }}>
                  Application Status
                </label>
                <select id="status"
                  name="status"
                  className={`form-select ms-3 ${ValidationHelper.getValidationClass("status", touchedFields, formErrors)}`}

                  style={{ flex: "1" }} value={formData.status} onChange={handleInputChange}>
                  <option value=""> Select a Status </option>
                  {allJobstatus.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <div
                  className={ValidationHelper.getFeedbackClass("status", touchedFields, formErrors)}
                  style={{ marginTop: "5px", width: "100%", clear: "both", textAlign: "right" }}
                >
                  {ValidationHelper.getFeedbackMessage("status", touchedFields, formErrors)}
                </div>


              </div>

              <div className="mb-3 d-flex flex-wrap align-items-center">
                <label htmlFor="comments" className="form-label text-end" style={{ width: "180px" }}>
                  Comments
                </label>
                <textarea id="comments"
                  name="comments"
                  className={`form-select ms-3 ${ValidationHelper.getValidationClass("comments", touchedFields, formErrors)}`}
                  style={{ flex: "1" }} rows="2" value={formData.comments} onChange={handleInputChange}></textarea>
                <div
                  className={ValidationHelper.getFeedbackClass("comments", touchedFields, formErrors)}
                  style={{ marginTop: "5px", width: "100%", clear: "both", textAlign: "right" }}
                >
                  {ValidationHelper.getFeedbackMessage("comments", touchedFields, formErrors)}
                </div>
              </div>
            </div>


            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary" id="submitBtn" onClick={handleSubmit}>
                Submit
              </button>
            </div>



          </div>
        </div>
      </div>





    </div>
  );
}

