'use client';
import { useState, useEffect } from "react";

import { createRole, fetchRoles, fetchRolesHierarchy } from "@/utils/restClient";

export default function AddProfileModal() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("- None -");
  const [profile, setProfile] = useState("- None -");
  const [territory, setTerritory] = useState("");

  const [roles, setHierarchyRoles] = useState([]);
  const [allRoles, setallRoles] = useState([]);
  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState(null); // State for API status

  const [showDiv1, setShowDiv1] = useState(true);


  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [shareDataWithPeers, setShareDataWithPeers] = useState(true); // Default value as true
  const [isSubmitting, setIsSubmitting] = useState(false);

  const entities = [
    'Home',
    'Job Openings',
    'Applications',
    'Candidates',
    'Referrals',
    'Interviews',
    'Departments',
    'Analytics',
    'Metrics',
    'Dashboards',
    'Reports',
    'Campaigns',
    'Assessments',
    'To-Dos',
    'Vendors',
    'Notes',
    'RecruiterInbox',
    'My Actions',
    'Emails',
    'Documents',
    'Submissions',
    'Offers',
    'Social Permissions: (Social Admin)',
  ];

  const [permissions, setPermissions] = useState(
    entities.reduce((acc, entity) => {
      acc[entity] = {
        tabVisible: false,
        view: false,
        create: false,
        edit: false,
        delete: false,
      };
      return acc;
    }, {})
  );

  useEffect(() => {
    // Fetch all roles from the backend and set them into allRoles
    async function fetchRolesData() {
      try {
        const roles = await fetchRoles(); // Call to fetch all roles
        setallRoles(roles);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    }
    fetchRolesData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!roleName || !description) {
      setError("All fields are required");
      return; // Return early if validation fails
    }

    setIsSubmitting(true);
    // Clear error message if all fields are valid
    setError(null);

    // Prepare module permissions based on selected checkboxes
    const modulePermissions = Object.keys(permissions).map((entity) => ({
      entity,
      tabVisible: permissions[entity].tabVisible,
      view: permissions[entity].view,
      create: permissions[entity].create,
      edit: permissions[entity].edit,
      delete: permissions[entity].delete,
    }));

    // Prepare the role payload
    const payload = {
      name: roleName,
      description: description,
      permissions: {
        modulePermissions,
        socialPermissions: {
          socialAdmin: true,   // Assuming `true` for all social permissions
          managePosts: true,   // Assuming `true` for all social permissions
          viewAnalytics: true, // Assuming `true` for all social permissions
        },
      }
    };

    // Set the Authorization token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Authentication required");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create role');
      }

      const createdRole = await response.json();
      console.log("Role created successfully:", createdRole);
      setApiStatus("Role created successfully");

      // Optionally reset form or handle success (for example, show a confirmation message)
      alert("Role created successfully");

      // Reset the form fields after successful submission
      setRoleName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating role:", error);
      setApiStatus("Failed to create role. Please try again.");
      setError("Failed to create role. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (entity, permission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [entity]: {
        ...prevPermissions[entity],
        [permission]: !prevPermissions[entity][permission],
      },
    }));
  };

  const renderRow = (entity) => (
    <tr key={entity}>
      <td>{entity}</td>
      <td>
        <input
          type="checkbox"
          checked={permissions[entity].tabVisible}
          onChange={() => handleCheckboxChange(entity, 'tabVisible')}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={permissions[entity].view}
          onChange={() => handleCheckboxChange(entity, 'view')}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={permissions[entity].create}
          onChange={() => handleCheckboxChange(entity, 'create')}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={permissions[entity].edit}
          onChange={() => handleCheckboxChange(entity, 'edit')}
        />
      </td>
      <td>
        <input
          type="checkbox"
          checked={permissions[entity].delete}
          onChange={() => handleCheckboxChange(entity, 'delete')}
        />
      </td>
    </tr>
  );

  return (
    <>
      <button className="btn btn-sm btn-primary btn-recruitment" data-bs-toggle="modal" data-bs-target="#addUserModal">
        <span className="custom-font fw-700">+ Add New Profile</span>
      </button>
      {/* Modal */}
      <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title fw-700" id="addUserModalLabel">Add New User</p>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Form to Add New Profile */}
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
                          className={`form-control form-control-sm ps-4 small-placeholder ${!roleName && error ? 'is-invalid' : ''}`}
                          id="roleName"
                          placeholder="Role Name"
                          value={roleName}
                          onChange={(e) => setRoleName(e.target.value)}
                        />
                      </td>
                      <td className="text-danger">
                        {!roleName && error && (
                          <div className="form-text text-danger fs-0-point-7 fs-0-point-7">Role Name cannot be empty</div>
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
                          <div className="form-text text-danger fs-0-point-7">Description cannot be empty</div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="table">
                  <thead>
                    <tr>
                      <th>Entity</th>
                      <th>Tab Visible</th>
                      <th>View</th>
                      <th>Create</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entities.map((entity) => renderRow(entity))}
                  </tbody>
                </table>

                <div className="d-flex justify-content-end  mt-3">
                  <button type="submit" className="btn btn-sm btn-primary btn-recruitment" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                  {apiStatus && <div>{apiStatus}</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
