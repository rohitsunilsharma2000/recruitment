"use client";
import React, {  } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import InterviewTable from "./InterviewTable";
import JobAccordion from "./JobAccordion";
import Link from "next/link";
import PipelineCard from "./PipelineCard";



//
// Main App Component
//
function JobDescription() {
  return (
    <div className="px-4 my-4">

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
      <div className="d-flex justify-content-end gap-2 mb-3">
        {/* <button type="button" className="btn btn-sm btn-primary">
          Generate Offer Letter  candidate/offer-letter
        </button> */}
        <Link
          href="/candidate/offer-letter"
          className="btn btn-sm btn-primary"
        >
         Generate Offer Letter  
        </Link>
        <Link
          href="/candidate/interviews"
          className="btn  btn-sm btn-secondary"
        >
          Schedule Interview
        </Link>
      </div>

      <InterviewTable />

      <JobAccordion />
    </div>
  );
}

export default JobDescription;
