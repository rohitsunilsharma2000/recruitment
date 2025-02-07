"use client";
import React, { useState, useEffect } from "react";
import { fetchAllCandidates, fetchCountries } from "@/utils/restClient"; // Assuming this function fetches candidates

export default function LocationSelectionModal({
  onClose,
  onSave,
}) {
  // Now even if no initialData is passed, you'll fall back to {}
  // Initialize formData to hold countryId and countryName
  const [formData, setFormData] = useState({
    countryName: "", // Default to initialData.countryName if provided
  });

  const [countries, setCountry] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state to track search input
  const [filteredCountries, setFilteredCountries] = useState([]); // New state for filtered candidates

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of countries per page
  // Fetch candidates on component mount
  useEffect(() => {
    async function fetchCandidatesData() {
      try {
        console.log("Fetching candidates data...");
        const response = await fetchCountries();



        const countryNames = response.map((country, index) =>
        (
          {
            countryId: index + 1,  // Adding an id starting from 1
            countryName: country.name
          }
        )
        );
        console.log("fetchCandidatesData response:", countryNames);

        setCountry(countryNames);
        setFilteredCountries(countryNames); // Set initial filtered candidates to all candidates
        console.log("Candidates have been set into state");
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
        setCountry([]);
        setFilteredCountries([]); // Handle error by setting empty array
      }
    }

    fetchCandidatesData(); // Call the function to fetch candidates
  }, []);

  // Filter candidates based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = countries.filter((candidate) =>
        candidate.countryName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered); // Update filtered candidates state
    } else {
      setFilteredCountries(countries); // If no search query, show all candidates
    }
  }, [searchQuery, countries]);

  // Handle save (pass selected candidate data to onSave)
  const handleSave = (e) => {
    e.preventDefault();
    console.log("formData ", formData)
    onSave(formData); // Pass the current form data to onSave
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      // Look up the selected candidate using its id.
      const selectedCandidate = countries.find(
        (country) => String(country.countryName) === value
      );
      setFormData({
        ...formData,
        countryName: selectedCandidate ? selectedCandidate.countryName : "", // Use "" if not found
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
                    <th scope="col">Country Name </th>

                  </tr>
                </thead>
                <tbody>
                  {filteredCountries.map((country) => (
                    <tr key={country.countryId}>
                      <th scope="row">
                        <input
                          type="radio"
                          name="country"
                          value={country.countryName}
                          checked={
                            String(formData.countryName) ===
                            String(country.countryName)
                          }
                          onChange={handleChange}
                        />
                      </th>
                      <td>{country.countryId}</td>
                      <td>{country.countryName}</td>



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

                {/* filteredCountries */}
                {filteredCountries.length === 0 || !formData.countryName ? (
                  <p style={{ color: "red", margin: '0' }}>
                    Please select  one country.
                  </p>
                ) : (
                  <div> {/* Wrap inside a div */}

                    <button type="submit" className="btn-sm btn btn-primary">
                      Save Selection
                    </button>

                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
