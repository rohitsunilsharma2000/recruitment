"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSearchParams } from "next/navigation";
import { fetchJobOpeningById } from "@/utils/restClient";


function JobAccordion() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get `id` from query params

  const [jobOpeningData, setJobOpeningData] = useState();
  const [error, setError] = useState(null);



  useEffect(() => {
    async function fetchJobOpeningByIdData() {
      try {
        const response = await fetchJobOpeningById(id);
        console.log("Fetched all Job Opening :", response); // Log the response for debugging
        setJobOpeningData(response); // Store the response data in state
      } catch (error) {
        setJobOpeningData([]); // Set an empty array in case of error
      }
    }
    fetchJobOpeningByIdData(); // Trigger the API call when the component mounts
  }, []);


  if (error) return <p>Error: {error}</p>;
  if (!jobOpeningData) return <p>Loading....</p>;


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
                <strong>Posting Title:</strong> {jobOpeningData.postingTitle}
              </div>
              <div className="col-md-6">
                <strong>Assigned Recruiter(s):</strong>{" "}
                saha@bishnupadasaha.agency
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Target Date:</strong> {jobOpeningData.targetDate}
              </div>
              <div className="col-md-6">
                <strong>Job Opening Status:</strong>  {jobOpeningData.targetDate}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Industry:</strong>  {jobOpeningData.industry}
              </div>
              <div className="col-md-6">
                <strong>Salary:</strong> {jobOpeningData.salary}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Created By:</strong>  {jobOpeningData.createdBy}
              </div>
              <div className="col-md-6">
                <strong>Created On:</strong>   {jobOpeningData.createdOn}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Job Opening ID:</strong> ZR_3_JOB
              </div>
              <div className="col-md-6">
                <strong>Department Name:</strong>  {jobOpeningData.departmentName}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Hiring Manager:</strong> saha@bishnupadasaha.agency  {jobOpeningData.hiringManager}
              </div>
              <div className="col-md-6">
                <strong>Number of Positions:</strong> 5 {jobOpeningData.numberOfPositions}
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <strong>Date Opened:</strong> 12/19/2024 {jobOpeningData.dateOpened}
              </div>
            </div>
            <div className="col-md-6">
              <strong>Job Type:</strong> Full time  {jobOpeningData.jobType}
            </div>
            <div className="row mb-3">
            <div className="col-md-6">
              <strong>Work Experience:</strong> Fresher   {jobOpeningData.workExperience}
            </div>
            <div className="col-md-6">
              <strong>Required Skills:</strong>  {jobOpeningData.requiredSkills}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Modified By:</strong> saha@bishnupadasaha.agency  {jobOpeningData.modifiedBy}
            </div>
            <div className="col-md-6">
              <strong>Modified On:</strong> Thu, 30 Jan 2025 11:15 AM  {jobOpeningData.modifiedOn}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>City:</strong> Tallahassee {jobOpeningData.city}
            </div>
            <div className="col-md-6">
              <strong>State/Province:</strong> Florida {jobOpeningData.stateProvince}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Country:</strong> United States  {jobOpeningData.country}
            </div>
            <div className="col-md-6">
              <strong>Zip/Postal Code:</strong> 32301 {jobOpeningData.zipPostalCode}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <strong>Job Description:</strong>
              <p> {jobOpeningData.jobDescription}</p>
            </div>
          </div>
          </div>
          

        </div>

        {/* accordion-body */}

      </div>
    </div>
  );
}
export default JobAccordion;
