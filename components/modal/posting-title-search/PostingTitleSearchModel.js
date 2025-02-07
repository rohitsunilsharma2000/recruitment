"use client";
import React, { useState, useEffect } from "react";
import { fetchAllJobs } from "@/utils/restClient"; // Assuming this function fetches postingTitles

export default function PostingTitleSearchModel({
  onClose,
  onSave,
}) {
  // Now even if no initialData is passed, you'll fall back to {}
  // Initialize formData to hold postingId and postingTitle
  const [formData, setFormData] = useState({
    postingId: "", // Default to initialData.postingId if provided
    postingTitle: "", // Default to initialData.postingTitle if provided
  });

  // id: postingDetail.id,
  //   fullName: `${postingDetail.assignedRecruiter} `,
  //   postingTitle: `${postingDetail.postingTitle} `,

  const [postingTitles, setPostingTitles] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state to track search input
  const [fllteredPostingTitles, setFilteredPostingTitles] = useState([]); // New state for filtered postingTitles

  // Fetch postingTitles on component mount
  useEffect(() => {
    async function fetchAllJobsData() {
      try {
        console.log("Fetching postingTitles data...");
        const response = await fetchAllJobs();
        console.log("fetchpostingTitleData response:", response);

        const postingTitles = response.map((postingTitlesDetails) => ({
          id: postingTitlesDetails.id,
          assignedRecruiter: `${postingTitlesDetails.assignedRecruiter} `,
          postingTitle: `${postingTitlesDetails.postingTitle} `,

        }));

        setPostingTitles(postingTitles);
        setFilteredPostingTitles(postingTitles); // Set initial filtered postingTitles to all postingTitles
        console.log("postingTitle have been set into state");
      } catch (error) {
        console.error("Failed to fetch postingTitles:", error);
        setPostingTitles([]);
        setFilteredPostingTitles([]); // Handle error by setting empty array
      }
    }

    fetchAllJobsData(); // Call the function to fetch postingTitles
  }, []);

  // Filter postingTitles based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = postingTitles.filter((postingData) =>
        postingData.postingTitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPostingTitles(filtered); // Update filtered postingTitles state
    } else {
      setFilteredPostingTitles(postingTitles); // If no search query, show all postingTitles
    }
  }, [searchQuery, postingTitles]);

  // Handle save (pass selected postingData data to onSave)
  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the current form data to onSave
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "postingId") {
      // Look up the selected postingDetail using its id.
      const selectedPosting = postingTitles.find(
        (posting) => String(posting.id) === value
      );
      setFormData({
        ...formData,
        postingId: value,
        postingTitle: selectedPosting ? selectedPosting.postingTitle : "", // Use "" if not found
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
                    <th scope="col">Posting Title</th>
                    <th scope="col">Assigned Recruiter </th>

                  </tr>
                </thead>
                <tbody>
                  {fllteredPostingTitles.map((postingDetail) => (
                    <tr key={postingDetail.id}>
                      <th scope="row">
                        <input
                          type="radio"
                          name="postingId"
                          value={postingDetail.id}
                          checked={
                            String(formData.postingId) ===
                            String(postingDetail.id)
                          }
                          onChange={handleChange}
                        />
                      </th>
                      <td>{postingDetail.postingTitle}</td>

                      <td>{postingDetail.assignedRecruiter}</td>



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
