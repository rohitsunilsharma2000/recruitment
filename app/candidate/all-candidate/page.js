"use client";
import React, { useEffect, useState } from "react";
import SidebarBarJobFilter from "@/components/setup-side-bar-job-filter/SidebarBarJobFilter";
import Link from "next/link";
import { fetchAllCandidates } from "@/utils/restClient";

export default function AllCandidates() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    async function fetchAllCandidatesData() {
      try {
        const response = await fetchAllCandidates(); // Fetch data from the API
        console.log("Fetched all candidates :", response); // Log the response for debugging
        setCandidates(response); // Store the response data in state
      } catch (error) {
        setCandidates([]); // Set an empty array in case of error
      }
    }
    fetchAllCandidatesData(); // Trigger the API call when the component mounts
  }, []);


  const jobData = [
    {
      "Job Opening ID": "ZR_5_JOB",
      "Posting Title": "Operations Manager",
      "Assigned Recruiter(s)": "recruiter5@example.com",
      "Target Date": "01/17/2025",
      "Job Opening Status": "Overdue",
      "City": "Miami",
      "Department Name": "Operations",
      "Hiring Manager": "manager5@example.com",
      "Job Type": "Full time",
      "Number of Applications": "0",
      "To Do's": "Pending documentation approval",
      "Last Activity Time": "01/06/2025 02:00 PM",
      "Date Opened": "12/16/2024",
      "Province": "Florida",
      "Country": "United States",
      "Number of Positions": "2"
    },
  ];
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  function formatDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = date.getDate().toString().padStart(2, '0'); // Pad day with leading zero if necessary
    const year = date.getFullYear(); // Get the full year

    // Return the formatted date as mm/dd/yyyy
    return `${month}/${day}/${year}`;
  }

  const handleClearFilters = () => {
    setFilters({
      selectFilter: "",
      inputFilter: "",
      globalSearch: "",
      todoFilter: "",
      todoSubFilter: "",
    });
    setFilteredJobData(jobData);
  };


  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg p-3" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <span className="navbar-brand">
            <button className="btn-sm btn btn-light" onClick={toggleSidebar}>
              <i className="bi bi-funnel"></i>
            </button>
            <b> All Job Openings</b>
          </span>
          <div className="d-flex justify-content-end gap-3 mt-1">
            <button type="button" className="btn-sm btn btn-secondary">
              Cancel
            </button>
            <Link className="btn-sm btn btn-primary me-2" href="/job-openings/create">
              Create Job Opening
            </Link>
          </div>
        </div>
      </nav>

      <div className="row">
        {showSidebar && (
          <div className="col-md-2 bg-light p-3">

            <div className="row bg-danger">Left</div>
            {/* <SidebarBarJobFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            /> */}
          </div>
        )}
        <div className={`col-md-${showSidebar ? "10" : "12"} p-3`}>
          <div className="table-responsive">


            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>

                  <th scope="col">Rating</th>
                  <th scope="col">Candidate Name</th>
                  <th scope="col">City</th>
                  <th scope="col">Candidate Stage</th>
                  <th scope="col">Modified Time</th>
                  <th scope="col">Source</th>
                  <th scope="col">Candidate Owner</th>

                </tr>
              </thead>
              <tbody>

                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <th scope="row">{candidate.id}</th>
                    <td >
                      <Link href="/candidate/candidate-evaluation" passHref>
                        <button type="button" className="btn btn-sm btn-outline-secondary">
                          5.4 <i className="bi bi-star text-warning"></i>
                        </button>
                      </Link>

                    </td>
                    <td>{candidate.firstName} {candidate.lastName}</td>
                    <td>{candidate.addressInformation.city} </td>
                    <td>{candidate.candidateStatus} </td>
                    <td >NA</td>
                    <td>{candidate.source}</td>
                    <td>{candidate.candidateOwner.firstName} {candidate.candidateOwner.lastName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div>Total Jobs: {filteredJobData.length}</div> */}
        </div>
      </div>
    </div >
  );
}