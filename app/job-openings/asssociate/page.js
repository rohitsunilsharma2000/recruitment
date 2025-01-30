"use client"
import { ValidationHelper } from "@/components/form-validator/ValidationHelper";
import { useState } from "react";

export default function AssociateJobOpening() {
  const [formData, setFormData] = useState({
    jobOpening: "",
    status: "",
    comments: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  const handleInputChange = (e) => {
    const { id, name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
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

    Object.keys(formData).forEach((field) => {
      const error = ValidationHelper.validateField(field, formData[field], typeof formData[field]);
      if (error) valid = false;
      newErrors[field] = error;
      touched[field] = true;
    });

    setFormErrors(newErrors);
    setTouchedFields(touched);

    if (valid) {
      console.log("Form submitted successfully!", formData);
    } else {
      console.log("Form has validation errors.", formErrors);
    }
  };
  return (
    <div>
      <div className="container mt-4">
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#jobApplicationModal">
          Open Job Application
        </button>
      </div>

      <div className="modal fade" id="jobApplicationModal" tabIndex="-1" aria-labelledby="jobApplicationModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
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
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Data Analyst">Data Analyst</option>
                </select>

                <div
                  className={ValidationHelper.getFeedbackClass("jobOpening", touchedFields, formErrors)}
                  style={{ marginTop: "5px", width: "100%", clear: "both", textAlign: "right" }}
                >
                  {ValidationHelper.getFeedbackMessage("jobOpening", touchedFields, formErrors)}
                </div>

              </div>



              <div className="mb-3 d-flex align-items-center">
                <label htmlFor="status" className="form-label text-end" style={{ width: "180px" }}>
                  Application Status
                </label>
                <select id="status"
                  name="status"
                  className="form-select ms-3" style={{ flex: "1" }} value={formData.status} onChange={handleInputChange}>
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="mb-3 d-flex align-items-center">
                <label htmlFor="comments" className="form-label text-end" style={{ width: "180px" }}>
                  Comments
                </label>
                <textarea id="comments"
                  name="comments"
                  className="form-control ms-3" style={{ flex: "1" }} rows="2" value={formData.comments} onChange={handleInputChange}></textarea>
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
