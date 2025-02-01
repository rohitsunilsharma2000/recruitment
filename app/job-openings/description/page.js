"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "next/navigation";
import { fetchJobOpeningById } from "@/utils/restClient";
import InterviewTable from "./InterviewTable";
import JobAccordion from "./JobAccordion";



//
// PipelineCard Component
// Displays a card for a pipeline stage. The title is clickable to toggle a dropdown.
//
function PipelineCard({ label, count }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

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

      <InterviewTable/>


      <JobAccordion />
    </div>
  );
}

export default JobDescription;
