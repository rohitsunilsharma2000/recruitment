"use client"; // Add this directive at the top

import { useEffect, useState } from "react";
import "./role.css";
import Link from "next/link";
import { createRole, fetchRoles, fetchRolesHierarchy } from "@/utils/restClient";
const RoleHierarchy = () => {
  const [roles, setHierarchyRoles] = useState([]);
  const [allRoles, setallRoles] = useState([]);
  const [error, setError] = useState("");
  const [showDiv1, setShowDiv1] = useState(true);

  const [apiStatus, setApiStatus] = useState(null); // State for API status

  const [roleName, setRoleName] = useState("");
  const [reportsTo, setReportsTo] = useState("");
  const [description, setDescription] = useState("");
  const [shareDataWithPeers, setShareDataWithPeers] = useState(true); // Default value as true
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleDiv = () => {
    setApiStatus(null); // Reset status
    setError(null); // Reset status
    setShowDiv1(!showDiv1);
  };

  const [expanded, setExpanded] = useState({
    bishnupadasahaAgency: false,
    recruiterAdmin: false,
    recruiter: false,
    hiringManager: false,
  });

  const handleToggle = (role) => {
    setExpanded((prevState) => ({
      ...prevState,
      [role]: !prevState[role],
    }));
  };


  const handleExpandAll = () => {
    const allExpanded = {};

    const expandRecursively = (roleList) => {
      roleList.forEach((role) => {
        allExpanded[role.id] = true; // Mark current role as expanded
        if (role.subordinates && role.subordinates.length > 0) {
          expandRecursively(role.subordinates); // Recursively expand subordinates
        }
      });
    };

    expandRecursively(roles); // Start from the top-level roles
    setExpanded(allExpanded); // Update state with all roles expanded
  };

  const handleCollapseAll = () => {
    setExpanded({
      bishnupadasahaAgency: false,
      recruiterAdmin: false,
      recruiter: false,
      hiringManager: false,
    });
  };

  useEffect(() => {
    const getRoles = async () => {
      try {
        const rolesData = await fetchRolesHierarchy();
        setHierarchyRoles(rolesData);
        setApiStatus("Success: Data fetched successfully!");

        const allRoles = await fetchRoles();
        setallRoles(allRoles);
        console.log(allRoles)
      } catch (err) {
        setApiStatus(`Error: ${response.status} - ${response.statusText}`);
        setError("Failed to load roles hierarchy");
      }
    };



    getRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!roleName || !reportsTo || !description) {
      setError("All fields are required");
      return; // Return early if validation fails
    }


    setIsSubmitting(true);
    // Clear error message if all fields are valid
    setError(null);

    // API request payload
    const payload = {
      name: roleName,
      description: description,
      reportsTo: {
        "id": reportsTo,
        "name": reportsTo
      } || null, // If reportsTo is empty, send null
      shareDataWithPeers: shareDataWithPeers,
    };

    try {
      const createdRole = await createRole(payload); // Call the API function

      // Handle successful response
      console.log("Role created successfully:", createdRole);
      setApiStatus("Role created successfully:", createdRole);

      alert(createdRole)
      // Add a timeout before calling handleToggleDiv
      setTimeout(() => {
        handleToggleDiv(); // Close the form after a delay (e.g., 2 seconds)
      }, 2000); // Timeout set to 2 seconds (2000 ms)
      // Reset form or handle success
    } catch (error) {
      console.error("Error creating role:", error);
      setApiStatus("Failed to create role. Please try again.", error);
      setError("Failed to create role. Please try again.", error);
    } finally {
      setIsSubmitting(false);
      setRoleName("");
      setReportsTo("");
      setDescription("");

    }
  };


  const renderHierarchy = (roleList) => {
    return roleList.map((role) => (
      <div key={role.id} className="hierarchy">
        <button
          className="btn-sm btn btn-link btn-toggle text-decoration-none fs-0-point-7"
          onClick={() => handleToggle(role.id)}
        >
          {role.name}
        </button>

        {/* Render subordinates if the role is expanded */}
        {expanded[role.id] &&
          role.subordinates &&
          role.subordinates.length > 0 && (
            <div className="hierarchy">
              {renderHierarchy(role.subordinates)}
            </div>
          )}
      </div>
    ));
  };

  // if (error) {
  //   return <p>{error}</p>;
  // }
  return (
    <div className="card">

      <div className="card-body">
        {error && (
          <div className="alert alert-danger d-flex align-items-center position-fixed bottom-0 start-0 m-3" role="alert">
            <span><i className="bi bi-exclamation-triangle-fill me-2"></i></span>
            <div>
              {error}
            </div>
          </div>
        )}

        {apiStatus && (
          <div className="alert alert-success d-flex align-items-center position-fixed bottom-0 start-0 m-3" role="alert">
            <span><i className="bi bi-check-circle-fill me-2"></i></span>
            <div>
              {apiStatus}
            </div>
          </div>
        )}


        {showDiv1 && (
          <div className="show-roles">
            <b className="mb-0 fs-0-point-7">Roles</b>
            <p className="mb-0 fs-0-point-7">
              This page helps you to define sharing of Recruit data among users as
              per your organization-wide role hierarchy.
            </p>

            {/* Expand/Collapse All */}
            <div className="d-flex justify-content-start my-3">
              {/* New Role Button */}
              <button className="btn btn  btn-primary btn-recruitment me-3 ">
                <span className="custom-font fw-700 " onClick={handleToggleDiv}>
                  {" "}
                  + New Role
                </span>
              </button>

              <a
                className="text-decoration-none text-primary nav-link fs-0-point-7  me-3"
                onClick={handleExpandAll}
              >
                Expand All
              </a>
              <a
                className="text-decoration-none text-primary nav-link fs-0-point-7"
                onClick={handleCollapseAll}
              >
                Collapse All
              </a>
            </div>

            {/* Render Role Hierarchy */}
            <div className="hierarchy">
              {roles.length > 0 ? (
                renderHierarchy(roles)
              ) : (
                <p>Loading roles...</p>
              )}
            </div>
          </div>
        )}
        {!showDiv1 && (
          <>
            <div className="create-role">
              <b className="mb-0 fs-0-point-7">New Role
              </b>
              <p className="mb-0 fs-0-point-7">
                This page helps you to create a new role as per your organization hierarchy. Before creating a new role, you must associate to the superior role.
              </p>
              <form onSubmit={handleSubmit}>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <label
                          htmlFor="roleName"
                          className="form-label fw-700 fs-0-point-7 opacity-50"
                        >
                          Role Name
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          className={`
                          form-control form-control-sm ps-4  small-placeholder ${!roleName && error ? 'is-invalid' : ''}`}
                          id="roleName"
                          placeholder="Role Name"
                          value={roleName}
                          onChange={(e) => setRoleName(e.target.value)}

                        />
                      </td>
                      <td className="text-danger">
                        {!roleName && error && (
                          <div className="form-text text-danger  fs-0-point-7  fs-0-point-7 ">Role Name cannot be empty</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="reportsTo"
                          className="form-label fw-700 fs-0-point-7 opacity-50"
                        >
                          Reports To
                        </label>
                      </td>
                      <td>
                        <select
                          className={`form-control form-control-sm small-placeholder ps-4 ${!reportsTo && error ? 'is-invalid' : ''}`}
                          id="reportsTo"
                          value={reportsTo}
                          onChange={(e) => setReportsTo(e.target.value)}
                        >
                          <option value="">Select a Role</option>
                          {allRoles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="text-danger">
                        {reportsTo === "" && (
                          <div className="form-text text-danger  fs-0-point-7">Reports To cannot be empty</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="description"
                          className="form-label fw-700 fs-0-point-7 opacity-50"
                        >
                          Description
                        </label>
                      </td>
                      <td>
                        <textarea
                          className={`form-control form-control-sm small-placeholder ps-4 ${!description && error ? 'is-invalid' : ''}`}
                          id="description"
                          placeholder="Enter Description"
                          rows="3"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </td>
                      <td className="text-danger">
                        {!description && error && (
                          <div className="form-text text-danger  fs-0-point-7">Description cannot be empty</div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">

                  <button className="btn btn  btn-sm btn btn-outline-danger   ">
                    <span className="custom-font fw-700 " onClick={handleToggleDiv}>
                      Cancel
                    </span>
                  </button>



                  <button className="btn btn  btn-primary "
                    disabled={isSubmitting}
                  >
                    <span className="custom-font fw-700 " >
                      {isSubmitting ? "Saving..." : "Save"}
                    </span>
                  </button>
                </div>
              </form>


            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default RoleHierarchy;