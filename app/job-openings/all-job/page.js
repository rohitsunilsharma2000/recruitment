"use client";
import React, { useEffect, useState } from "react";
import SidebarBarJobFilter from "@/components/setup-side-bar-job-filter/SidebarBarJobFilter";
import Link from "next/link";
import { fetchAllCandidates, fetchAllJobs } from "@/utils/restClient";
import AssociateJobOpening from "@/app/job-openings/asssociate/page";
import { useRouter } from 'next/navigation';


export default function AllCandidates() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [seletedCandidateIds, setseletedCandidateIds] = useState([]);

  const router = useRouter();
const handleNavigate = (id) => {
  console.log('Navigating to:', id);  // This should log only when the button is clicked
  router.push(`/job-openings/description?id=${id}`);
};

  
  useEffect(() => {
    async function fetchAllCandidatesData() {
      try {
        const response = await fetchAllJobs(); // Fetch data from the API
        console.log("Fetched all candidates :", response); // Log the response for debugging
        setCandidates(response); // Store the response data in state
      } catch (error) {
        setCandidates([]); // Set an empty array in case of error
      }
    }
    fetchAllCandidatesData(); // Trigger the API call when the component mounts
  }, []);

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


   // Method to handle checkbox change
   const handleCheckboxChange = (candidateId) => {
    setseletedCandidateIds((prevCandidateIds) => {
      let updatedCandidateIds;
  
      if (prevCandidateIds.includes(candidateId)) {
        // If candidateId already exists, remove it
        updatedCandidateIds = prevCandidateIds.filter(id => id !== candidateId);
        console.log(`Removing candidateId: ${candidateId}`);
      } else {
        // If candidateId doesn't exist, add it
        updatedCandidateIds = [...prevCandidateIds, candidateId];
        console.log(`Adding candidateId: ${candidateId}`);
      }
  
      console.log(`All selected Candidate Ids:`, updatedCandidateIds); // Log the updated list
      return updatedCandidateIds;
    });
  };
  

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg p-3" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <span className="navbar-brand">
            <button className="btn-sm btn btn-light" onClick={toggleSidebar}>
              <i className="bi bi-funnel"></i>
            </button>
            <b> All Job Opening</b>
            
          </span>
          
          <div className="d-flex justify-content-end gap-3 mt-1">
             <AssociateJobOpening/>
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

            <div className="row ">Filters</div>
     
          </div>
        )}
        <div className={`col-md-${showSidebar ? "10" : "12"} p-3`}>
          <div className="table-responsive">


            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Asociate</th>
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
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(candidate.id)}
                      />
                    </td>
                    <td></td>
                    <td>
                      <button onClick={() => handleNavigate(candidate.id)}>
                        {candidate.postingTitle}
                      </button>
                    </td>

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