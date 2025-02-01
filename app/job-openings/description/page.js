"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "next/navigation";
import { fetchJobOpeningById } from "@/utils/restClient";
//
// PipelineCard Component
// Displays a card for a pipeline stage. The title is clickable to toggle a dropdown.
//
function PipelineCard({ label, count }) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get `id` from query params

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [candidateData, setCandidateData] = useState();
  const [error, setError] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    // Fetch data from API
    const fetchCandidateData = async (id) => {
      try {
        console.log("fetchCandidateData id  ", id);
        const response = await fetchJobOpeningById(id);
        // console.log(" response ", response);
        setCandidateData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) fetchCandidateData(id);
  }, [id]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="col-6 col-md-2 mb-3">
      <div className="card">
        <div className="card-body position-relative">
          {/* The title acts as a clickable dropdown trigger */}
          <h6
            className="card-title d-inline-block"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            {label} <span className="dropdown-toggle"></span>
          </h6>

          {/* Dropdown menu; note that we force it to display by using show and static positioning */}
          {dropdownOpen && (
            <ul
              className="dropdown-menu show mt-1"
              style={{ position: "static", display: "block" }}
            >
              <li>
                <a className="dropdown-item" href="#">
                  Action 1
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Action 2
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Action 3
                </a>
              </li>
            </ul>
          )}

          <p className="card-text fs-4 mt-2">{count}</p>
        </div>
      </div>
    </div>
  );
}

//
// InterviewTable Component
// Renders a table with interview details.
//
function InterviewTable() {
  return (
    <div className="table-responsive mb-5">
      <table className="table table-bordered table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th>File Name</th>
            <th>Candidate Name</th>
            <th>Posting Title</th>
            <th>Department Name</th>
            <th>Employment Type</th>
            <th>Expected Joining Date</th>
            <th>Expiry Date</th>
            <th>Sent On</th>
            <th>Medium</th>
            <th>Compensation Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OfferLetter_01.pdf</td>
            <td>John Doe</td>
            <td>Senior Accountant (Sample)</td>
            <td>Accounting</td>
            <td>Full time</td>
            <td>01/25/2025</td>
            <td>01/30/2025</td>
            <td>12/20/2024</td>
            <td>Email</td>
            <td>$70,000</td>
            <td>Pending</td>
          </tr>
          {/* Additional rows can be added here */}
        </tbody>
      </table>
    </div>
  );
}

//
// JobAccordion Component
// Uses Bootstrap’s accordion markup to show/hide job opening details.
//
function JobAccordion() {
  return (
    <div className="accordion" id="jobOpeningAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingJobOpening">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseJobOpening"
            aria-expanded="true"
            aria-controls="collapseJobOpening"
          >
            Job Opening Information
          </button>
        </h2>
        <div
          id="collapseJobOpening"
          className="accordion-collapse collapse show"
          aria-labelledby="headingJobOpening"
          data-bs-parent="#jobOpeningAccordion"
        >
          <div className="accordion-body">
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Posting Title:</strong> Senior Accountant (Sample)
              </div>
              <div className="col-md-6">
                <strong>Assigned Recruiter(s):</strong>{" "}
                saha@bishnupadasaha.agency
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Target Date:</strong> 01/18/2025
              </div>
              <div className="col-md-6">
                <strong>Job Opening Status:</strong> Waiting for approval
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Industry:</strong> Accounting
              </div>
              <div className="col-md-6">
                <strong>Salary:</strong> {/* Salary can be added here */}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Created By:</strong> saha@bishnupadasaha.agency
              </div>
              <div className="col-md-6">
                <strong>Created On:</strong> Thu, 19 Dec 2024 05:30 AM
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Job Opening ID:</strong> ZR_3_JOB
              </div>
              <div className="col-md-6">
                <strong>Department Name:</strong> Paula Rojas (Sample)
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Hiring Manager:</strong> saha@bishnupadasaha.agency
              </div>
              <div className="col-md-6">
                <strong>Number of Positions:</strong> 5
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Date Opened:</strong> 12/19/2024
              </div>
              <div className="col-md-6">
                <strong>Job Type:</strong> Full time
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Work Experience:</strong> Fresher
              </div>
              <div className="col-md-6">
                <strong>Required Skills:</strong> {/* Add skills here */}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Modified By:</strong> saha@bishnupadasaha.agency
              </div>
              <div className="col-md-6">
                <strong>Modified On:</strong> Thu, 30 Jan 2025 11:15 AM
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>City:</strong> Tallahassee
              </div>
              <div className="col-md-6">
                <strong>State/Province:</strong> Florida
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Country:</strong> United States
              </div>
              <div className="col-md-6">
                <strong>Zip/Postal Code:</strong> 32301
              </div>
            </div>
            <div className="row">
              <div className="col">
                <strong>Job Description:</strong>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
          {/* accordion-body */}
        </div>
      </div>
    </div>
  );
}

//
// Main App Component
//
function JobDescription() {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Customize Pipeline</h1>

      {/* Pipeline Status Cards */}
      <div className="row text-center mb-4">
        <PipelineCard label="Screening" count="1" />
        <PipelineCard label="Submissions" count="0" />
        <PipelineCard label="Interview" count="0" />
        <PipelineCard label="Offered" count="1" />
        <PipelineCard label="Hired" count="0" />
        <PipelineCard label="Rejected" count="0" />
      </div>

      {/* Interview Details Section */}
      <h2 className="mb-3">Interview Details</h2>
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button type="button" className="btn btn-primary">
          Generate Offer Letter
        </button>
        <button type="button" className="btn btn-secondary">
          Schedule Interviews
        </button>
      </div>

      <InterviewTable />

      <JobAccordion />
    </div>
  );
}

export default JobDescription;
