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

  // useEffect(() => {
  //   // Fetch data from API
  //   const fetchJobOpeningByIdData = async (id) => {
  //     try {
  //       console.log("fetchCandidateData id  ", id);
  //       const response = await fetchJobOpeningById(id);
  //       console.log(" response ", response);
  //       setJobOpeningData(response);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   if (id) fetchJobOpeningByIdData(id);
  // }, [id]);

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
                  <strong>Salary:</strong> 
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
                  <strong>Required Skills:</strong> 
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
  export default JobAccordion;
