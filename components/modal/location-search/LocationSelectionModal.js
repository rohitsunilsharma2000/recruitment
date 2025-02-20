"use client";
import React, { useState, useEffect } from "react";
import { fetchCountries } from "@/utils/restClient"; // Function to fetch countries

export default function LocationSelectionModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({ countryName: "" });
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of countries displayed per page

  // Fetch countries on component mount
  useEffect(() => {
    async function fetchCountriesData() {
      try {
        const response = await fetchCountries();
        const countryNames = response.map((country, index) => ({
          countryId: index + 1,
          countryName: country.name,
        }));
        setCountries(countryNames);
        setFilteredCountries(countryNames);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        setCountries([]);
        setFilteredCountries([]);
      }
    }

    fetchCountriesData();
  }, []);

  // Filter countries based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = countries.filter((country) =>
        country.countryName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
      setCurrentPage(1); // Reset to the first page on search
    } else {
      setFilteredCountries(countries);
    }
  }, [searchQuery, countries]);

  // Save selected country
  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  // Handle selection change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      const selectedCountry = countries.find(
        (country) => country.countryName === value
      );
      setFormData({
        ...formData,
        countryName: selectedCountry ? selectedCountry.countryName : "",
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredCountries.length / pageSize);
  const currentCountries = filteredCountries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }} tabIndex="-1" role="dialog">
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
                    <th></th>
                    <th>Country ID</th>
                    <th>Country Name</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCountries.map((country) => (
                    <tr key={country.countryId}>
                      <td>
                        <input
                          type="radio"
                          name="country"
                          value={country.countryName}
                          checked={formData.countryName === country.countryName}
                          onChange={handleChange}
                        />
                      </td>
                      <td>{country.countryId}</td>
                      <td>{country.countryName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  disabled={currentPage === 1}
                  onClick={handlePrevPage}
                >
                  Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  Next
                </button>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-sm btn btn-secondary"
                  onClick={onClose}
                >
                  Close
                </button>

                {filteredCountries.length === 0 || !formData.countryName ? (
                  <p style={{ color: "red", margin: 0 }}>
                    Please select one country.
                  </p>
                ) : (
                  <button type="submit" className="btn-sm btn btn-primary">
                    Save Selection
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
