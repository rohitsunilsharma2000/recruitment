"use client";
import React, { useState, useEffect } from "react";

import { fetchDepartments, fetchLeads } from "@/utils/restClient";

export default function AddDepartmentModal({ initialData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    departmentName: initialData.departmentName || "",
    parentDepartmentId: initialData.parentDepartmentId?.id || "",
    departmentLead: initialData.departmentLead?.id || "",
    attachmentPath: initialData.attachmentPath || "",
  });

  const [departments, setDepartments] = useState([]);
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state to track search input
  const [filteredDepartments, setFilteredDepartments] = useState([]); // New state for filtered departments

  // Dynamically set form values when the component mounts
  useEffect(() => {
    setFormData({
      departmentName: initialData.departmentName || "",
      parentDepartmentId: initialData.parentDepartmentId?.id || "",
      departmentLead: initialData.departmentLead?.id || "",
      attachmentPath: initialData.attachmentPath || "",
    });

    async function fetchDepartmentsData() {
      try {
        console.log("Fetching departments data...");
        const response = await fetchDepartments();
        console.log("fetchDepartmentsData response : ", response);

        const departments = response.map(department => ({
          id: department.id,
          departmentName: department.departmentName,
          departmentLeadName: department.departmentLeadName
        }));

        setDepartments(departments);
        setFilteredDepartments(departments); // Set initial filtered departments to all departments
        console.log("Departments have been set into state");

      } catch (error) {
        console.error("Failed to fetch departments:", error);
        setDepartments([]);
        setFilteredDepartments([]); // Handle error by setting empty array
      }
    }

    async function fetchLeadsData() {
      try {
        const response = await fetchLeads();
        console.log("fetchLeadsData response : ", response);

        const users = response.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        }));

        setLeads(users);
      } catch (error) {
        console.error("Failed to fetchLeadsData:", error);
        setLeads([]); // Handle error by setting empty array
      }
    }

    fetchLeadsData();
    fetchDepartmentsData(); // Call the function
  }, [initialData]);

  // Filter departments based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = departments.filter(department =>
        department.departmentName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDepartments(filtered); // Update filtered departments state
    } else {
      setFilteredDepartments(departments); // If no search query, show all departments
    }
  }, [searchQuery, departments]);

  const handleSave = (e) => {
    e.preventDefault();
    alert("Call depart create API");
    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state on input change
  };

  return (
    <div className="modal show" style={{ display: "block" }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Show :</h5>

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

            <button type="button" className="btn-md  btn btn-primary ms-2">
              <span>
                <i className="bi bi-plus-lg me-1 "></i>
              </span>
              <span className="">
                New Department
              </span>
            </button>

            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSave}>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Department Name</th>
                    <th scope="col">Department Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepartments.map((department) => (
                    <tr key={department.id}>
                      <th scope="row">
                        <input
                          type="radio"
                          name="parentDepartmentId"
                          value={department.id}
                          onClick={(e) => handleChange(e)} // Update form data
                        />
                      </th>
                      <td>{department.departmentName}</td>
                      <td>{department.departmentLeadName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="modal-footer">
                <button type="button" className="btn-sm btn btn-secondary" onClick={onClose}>Close</button>
                <button type="submit" className="btn-sm btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
