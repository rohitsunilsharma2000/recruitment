"use client";
import React, { useState, useEffect } from "react";
import { fetchAllCandidates } from "@/utils/restClient"; // Assuming this function fetches candidates

export default function CandidateSelectionModal({
  onClose,
  onSave,
}) {
  // Now even if no initialData is passed, you'll fall back to {}
  // Initialize formData to hold candidateId and candidateName
  const [formData, setFormData] = useState({
    candidateId:  "", // Default to initialData.candidateId if provided
    candidateName:  "", // Default to initialData.candidateName if provided
  });

  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state to track search input
  const [filteredCandidates, setFilteredCandidates] = useState([]); // New state for filtered candidates

  // Fetch candidates on component mount
  useEffect(() => {
    async function fetchCandidatesData() {
      try {
        console.log("Fetching candidates data...");
        const response = await fetchAllCandidates();
        console.log("fetchCandidatesData response:", response);

        const candidates = response.map((candidate) => ({
          id: candidate.id,
          fullName: `${candidate.firstName} ${candidate.lastName}`,
          currentJobTitle: `${candidate.currentJobTitle} `,

        }));

        setCandidates(candidates);
        setFilteredCandidates(candidates); // Set initial filtered candidates to all candidates
        console.log("Candidates have been set into state");
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
        setCandidates([]);
        setFilteredCandidates([]); // Handle error by setting empty array
      }
    }

    fetchCandidatesData(); // Call the function to fetch candidates
  }, []);

  // Filter candidates based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = candidates.filter((candidate) =>
        candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCandidates(filtered); // Update filtered candidates state
    } else {
      setFilteredCandidates(candidates); // If no search query, show all candidates
    }
  }, [searchQuery, candidates]);

  // Handle save (pass selected candidate data to onSave)
  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the current form data to onSave
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "candidateId") {
      // Look up the selected candidate using its id.
      const selectedCandidate = candidates.find(
        (candidate) => String(candidate.id) === value
      );
      setFormData({
        ...formData,
        candidateId: value,
        candidateName: selectedCandidate ? selectedCandidate.fullName : "", // Use "" if not found
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state on input change
  };

  return (
    <div
      className="modal show"
      style={{ display: "block" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select Candidate :</h5>

            <div className="position-relative ms-auto">
              <input
                className="form-control ps-5 bg-light"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange} // Handle search query change
              />
              <button
                className="btn bg-transparent px-2 py-0 position-absolute top-50 start-0 translate-middle-y"
                type="submit"
              >
                <i className="bi bi-search fs-5"></i>
              </button>
            </div>

            <button type="button" className="btn-md btn btn-primary ms-2">
              <span>
                <i className="bi bi-plus-lg me-1 "></i>
              </span>
              <span>New Candidate</span>
            </button>

            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSave}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Candidate Name</th>
                    <th scope="col">currentJobTitle </th>

                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <th scope="row">
                        <input
                          type="radio"
                          name="candidateId"
                          value={candidate.id}
                          checked={
                            String(formData.candidateId) ===
                            String(candidate.id)
                          }
                          onChange={handleChange}
                        />
                      </th>
                      <td>{candidate.fullName}</td>
                      <td>{candidate.currentJobTitle}</td>


                      
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-sm btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>
                <button type="submit" className="btn-sm btn btn-primary">
                  Save Selection
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
