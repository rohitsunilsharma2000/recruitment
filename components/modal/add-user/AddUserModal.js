'use client';
import { fetchProfiles, fetchRoles, fetchRolesHierarchy } from "@/utils/restClient";
import { useEffect, useState } from "react";

export default function AddUserModal() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [allRoles, setAllRoles] = useState([]);
  const [profiles, setProfile] = useState([]);
  const [territory, setTerritory] = useState("");

  const [selectedRole, setSelectedRole] = useState(""); // Selected role ID
  const [selectedProfile, setSelectedProfile] = useState(""); // Selected profile ID


  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState(null); // State for API status


  useEffect(() => {


    // Fetch all roles from the backend and set them into allRoles
    async function fetchRolesData() {
      try {
        const roles = await fetchRoles(); // Call to fetch all roles
        if (Array.isArray(roles)) {
          setAllRoles(roles); // Set roles if the response is an array
        } else {
          console.error("Invalid roles response:", roles);
          setAllRoles([]); // Default to an empty array
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
        setAllRoles([]); // Default to an empty array in case of error
      }
    }


    // Fetch all profiles from the backend and set them into all profiles
    async function fetchProfilesData() {
      try {
        const profiles = await fetchProfiles(); // Call to fetch all profiles
        if (Array.isArray(profiles)) {
          setProfile(profiles); // Set profiles if the response is an array
        } else {
          console.error("Invalid profiles response:", profiles);
          setProfile([]); // Default to an empty array
        }
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
        setProfile([]); // Default to an empty array in case of error
      }
    }




    fetchProfilesData();

    fetchRolesData();
  }, []);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value); // Update only the selected role
  };

  const handleProfileChange = (e) => {
    setSelectedProfile(e.target.value); // Update only the selected profile
  };

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!selectedRole) newErrors.selectedRole = "Role is required";
    if (!selectedProfile) newErrors.selectedProfile = "Profile is required";

    if (!territory.trim()) newErrors.territory = "Territory is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Form is valid if no errors
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform submission logic

      console.log("Form submitted successfully!");
    } else {
      console.log("Validation errors", errors);
    }
  };


  return (
    <>


      <button className="btn btn-sm btn-primary btn-recruitment" data-bs-toggle="modal" data-bs-target="#addUserModal">
        <span className="custom-font fw-700"> Add New User</span>
      </button>
      {/* Modal */}
      <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="addUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title fw-700 " id="addUserModalLabel">Add New User</p>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

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

              {/* Form to Add New User */}
              <form>
                <table className="table">
                  <tbody>
                    <tr>
                      <td><label htmlFor="firstName" className=" form-label fw-700 fs-0-point-7 opacity-50 ">First Name</label></td>
                      <td><input type="text" className="form-control form-control-sm ps-4 small-placeholder" id="firstName" placeholder="First Name"

                        value={firstName}
                        // onChange={(e) => setFirstName(e.target.value)}
                        onChange={handleRoleChange}

                      /></td>
                    </tr>
                    <tr>
                      <td><label htmlFor="lastName" className="form-label fw-700 fs-0-point-7 opacity-50">Last Name</label></td>
                      <td><input type="text" className="form-control form-control-sm ps-4 small-placeholder" id="lastName" placeholder="Last Name"



                        value={lastName}
                        // onChange={(e) => setLastName(e.target.value)}
                        onChange={handleProfileChange}



                      /></td>
                    </tr>
                    <tr>
                      <td><label htmlFor="email" className="form-label fw-700 fs-0-point-7 opacity-50">Email</label></td>
                      <td><input type="email" className="form-control form-control-sm ps-4 small-placeholder" id="email" placeholder="Email" required


                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                      /></td>
                    </tr>
                    <tr>

                      <td><label htmlFor="role" className="form-label fw-700 fs-0-point-7 opacity-50">Role</label></td>
                      <td>
                        {/* <select
                          className={`form-control form-control-sm small-placeholder ps-4 ${!allRoles && error ? 'is-invalid' : ''}`}
                          id="allRoles"
                          value={allRoles}
                          onChange={(e) => setallRoles(e.target.value)}
                        >
                          <option value="">Select a Role</option>
                          {allRoles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select> */}
                        <select
                          className="form-control form-control-sm small-placeholder ps-4"
                          id="allRoles"
                          value={selectedRole}
                          onChange={handleRoleChange}
                        >
                          <option value="">Select a Role</option>
                          {Array.isArray(allRoles) && allRoles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>

                      </td>
                      <td className="text-danger">
                        {allRoles === "" && (
                          <div className="form-text text-danger  fs-0-point-7">Reports To cannot be empty</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="profile" className="form-label fw-700 fs-0-point-7 opacity-50">Profile</label></td>
                      <td>
                        <select
                          className={`form-control form-control-sm small-placeholder ps-4 ${!profiles && error ? 'is-invalid' : ''}`}
                          id="profiles"
                          value={profiles}
                          onChange={(e) => setProfile(e.target.value)}
                        >
                          <option value="">Select a profile</option>
                          {Array.isArray(profiles) && profiles.map((profile) => (
                            <option key={profile.id} value={profile.id}>
                              {profile.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="territory" className="form-label fw-700 fs-0-point-7 opacity-50">Territory</label></td>
                      <td><input type="text" className="form-control form-control-sm ps-4 small-placeholder" id="territory" placeholder="Search Territory"


                        value={territory}
                        onChange={(e) => setTerritory(e.target.value)}

                      /></td>
                    </tr>
                  </tbody>
                </table>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
