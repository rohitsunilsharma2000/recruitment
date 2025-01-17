"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchDepartments, fetchLeads } from "@/utils/restClient";

export default function AddDepartmentModal({ initialData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    departmentName: initialData.departmentName || "",
    parentDepartmentId: initialData.parentDepartmentId?.id || "",
    departmentLead: initialData.departmentLead?.id || "",
    attachmentPath: initialData.attachmentPath || "",
  });

  const [departments, setDepartments] = useState([
    // { id: 1, name: "Engineering" },
    // { id: 2, name: "HR" },
    // { id: 3, name: "Marketing" },
  ]);

  const [leads, setLeads] = useState([
    // { id: 6, name: "John Doe" },
    // { id: 7, name: "Jane Smith" },
    // { id: 8, name: "Robert Brown" },
  ]);

  // Dynamically set form values when the component mounts
  useEffect(() => {
    setFormData({
      departmentName: initialData.departmentName || "",
      parentDepartmentId: initialData.parentDepartmentId?.id || "",
      departmentLead: initialData.departmentLead?.id || "",
      attachmentPath: initialData.attachmentPath || "",
    });



    // Fetch countries and positions
    async function fetchDepartmentsData() {
      try {
        console.log("Fetching departments data...");
        const response = await fetchDepartments(); // Call the fetchDepartments function
        console.log("fetchDepartmentsData response : ", response);

        // Extract and return only the `id` and `departmentName` properties
        const departments = response.map(department => ({
          id: department.id,
          departmentName: department.departmentName,
        }));

        console.log("Extracted departments data : ", departments);

        setDepartments(departments); // Set the array of departments names into state
        console.log("Departments have been set into state");

      } catch (error) {
        console.error("Failed to fetch departments:", error);
        setDepartments([]); // Default to an empty array in case of error
        console.log("Setting empty departments array due to error");
      }
    }


    // Fetch countries and positions
    async function fetchLeadsData() {
      try {
        console.log("Fetching departments data...");
        const response = await fetchLeads(); // Call the fetchDepartments function
        console.log("fetchDepartmentsData response : ", response);

        // Extract and return only the `id` and `departmentName` properties
        const users = response.map(user => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        }));

        console.log("Extracted departments data : ", users);
        setLeads(users); // Set the array of departments names into state
        console.log("Departments have been set into state");

      } catch (error) {
        console.error("Failed to fetch departments:", error);
        setDepartments([]); // Default to an empty array in case of error
        console.log("Setting empty departments array due to error");
      }
    }


    fetchLeadsData();
    fetchDepartmentsData(); // Call the function
  }, [initialData]);

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

  return (
    <div className="modal show" style={{ display: "block" }} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Department</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSave}>
              {/* Department Name */}
              <div className="mb-3">
                <label htmlFor="departmentName" className="form-label">Department Name</label>
                <input
                  type="text"
                  name="departmentName"
                  value={formData.departmentName}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="parentDepartmentId" className="form-label">Parent Department</label>
                <select
                  name="parentDepartmentId"
                  value={formData.parentDepartmentId}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Parent Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="departmentLead" className="form-label">Department Lead</label>
                <select
                  name="departmentLead"
                  value={formData.departmentLead}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Department Lead</option>
                  {leads.map((lead) => (
                    <option key={lead.id} value={lead.id}>
                      {/* {lead.firstName} */}
                      {lead.firstName} {lead.lastName}


                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="attachmentPath" className="form-label">Attachment Path</label>
                <input
                  type="file"
                  name="attachmentPath"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
