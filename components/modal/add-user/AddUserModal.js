"use client";
import {
  createUser,
  fetchProfiles,
  fetchRoles,
  fetchRolesHierarchy,
} from "@/utils/restClient";
import { useEffect, useRef, useState } from "react";

export default function AddUserModal() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [allRoles, setAllRoles] = useState([]); // All role ID
  const [profiles, setProfile] = useState([]); // All profile ID
  const [territory, setTerritory] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [selectedRole, setSelectedRole] = useState(""); // Selected role ID
  const [selectedProfile, setSelectedProfile] = useState(""); // Selected profile ID

  const [error, setErrors] = useState("");
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

    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!address.trim()) newErrors.address = "Address is required";

    if (!territory.trim()) newErrors.territory = "Territory is required";

    // setErrors(newErrors);
    // Combine errors into a single string
    const errorMessages = Object.values(newErrors).join(", ");
    setErrors(errorMessages); // Store the string in error

    return Object.keys(newErrors).length === 0; // Form is valid if no errors
  };

  const handleCancel = () => {
    const modalElement = document.getElementById("addUserModal");
    if (modalElement) {
      // Hide the modal
      modalElement.classList.remove("show");
      modalElement.setAttribute("aria-hidden", "true");
      modalElement.style.display = "none";

      // Reset body classes and styles
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0";

      // Remove the backdrop manually
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) {
        backdrop.parentNode.removeChild(backdrop);
      }
    }
  };


  async function createUserService(payload) {
    try {
      const createdUser = await createUser(payload); // Call the API function

      // Handle successful response
      console.log("User created successfully for :", createdUser.email);
      setApiStatus(`User created successfully for : ${createdUser.email}`);
      alert(`User created successfully for : ${createdUser.email}`);

      handleCancel(); // Custom cancel handler called for sucess case only
    } catch (error) {
      console.error("Error creating user:", error);
      setApiStatus("Failed to create user. Please try again.");
      setErrors("Failed to create user. Please try again.");
    } finally {
      // Clear all form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setSelectedRole("");
      setSelectedProfile("");
      setTerritory("");
      setPhone("");
      setAddress("");

      // Reset any other state as necessary
      // setIsSubmitting(false);
    }
  }

  // API request payload
  const payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: {
      id: selectedRole,
    },
    profile: {
      id: selectedProfile,
    },
    phone: phone,
    address: address,
    territory: territory,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform submission logic
      createUserService(payload);
      console.log("Form submitted successfully!");
    } else {
      console.log("Validation errors", error);
    }
  };


  return (
    <>
      <button
        className="btn btn-sm btn-primary btn-recruitment"
        data-bs-toggle="modal"
        data-bs-target="#addUserModal"
      >
        <span className="custom-font fw-700">+ Add New User</span>
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="addUserModal"
        tabIndex="-1"
        aria-labelledby="addUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title fw-700 " id="addUserModalLabel">
                Add New User
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {error && (
                <div
                  className="alert alert-danger d-flex align-items-center position-fixed bottom-0 start-0 m-3"
                  role="alert"
                >
                  <span>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  </span>
                  <div>{error}</div>
                </div>
              )}

              {apiStatus && (
                <div
                  className="alert alert-success d-flex align-items-center position-fixed bottom-0 start-0 m-3"
                  role="alert"
                >
                  <span>
                    <i className="bi bi-check-circle-fill me-2"></i>
                  </span>
                  <div>{apiStatus}</div>
                </div>
              )}

              {/* Form to Add New User */}
              <form>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <label
                          htmlFor="firstName"
                          className=" form-label fw-700 fs-0-point-7 opacity-50 "
                        >
                          First Name
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          //  className="form-control form-control-sm ps-4 small-placeholder"
                          className={`form-control form-control-sm small-placeholder ps-4 ${!firstName && error ? "is-invalid" : ""
                            }`}
                          id="firstName"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        // onChange={handleRoleChange}
                        />
                      </td>
                      <td className="text-danger">
                        {firstName === "" && (
                          <div className="form-text text-danger  fs-0-point-7">
                            First name is required
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="lastName"
                          className="form-label fw-700 fs-0-point-7 opacity-50"
                        >
                          Last Name
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          //  className="form-control form-control-sm ps-4 small-placeholder"
                          className={`form-control form-control-sm small-placeholder ps-4 ${!lastName && error ? "is-invalid" : ""
                            }`}
                          id="lastName"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        // onChange={handleProfileChange}
                        />
                      </td>
                      <td className="text-danger">
                        {lastName === "" && (
                          <div className="form-text text-danger  fs-0-point-7">
                            Last name is required
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="email"
                          className="form-label fw-700 fs-0-point-7 opacity-50"
                        >
                          Email
                        </label>
                      </td>
                      <td>
                        <input
                          type="email"
                          // className="form-control form-control-sm ps-4 small-placeholder"
                          className={`form-control form-control-sm small-placeholder ps-4 ${!email && error ? "is-invalid" : ""
                            }`}
                          id="email"
                          placeholder="Email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </td>
                      <td className="text-danger">
                        {lastName === "" && (
                          <div className="form-text text-danger  fs-0-point-7">
                            Email is required
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="role"
                          className="form-label fw-700 fs-0-point-7 opacity-50"
                        >
                          Role
                        </label>
                      </td>
                      <td>
                        <select
                          // className="form-control form-control-sm small-placeholder ps-4"
                          className={`form-control form-control-sm small-placeholder ps-4 ${!selectedRole && error ? "is-invalid" : ""
                            }`}
                          id="allRoles"
                          value={selectedRole}
                          onChange={handleRoleChange}
                        >
                          <option value="">Select a Role</option>
                          {Array.isArray(allRoles) &&
                            allRoles.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="text-danger">
                        {selectedRole === "" && (
                          <div className="form-text text-danger  fs-0-point-7">
                            Select a role
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="profile"
                          className="form-label fw-700 fs-0-point-7 opacity-50"
                        >
                          Profile
                        </label>
                      </td>
                      <td>
                        <select
                          className={`form-control form-control-sm small-placeholder ps-4 ${!selectedProfile && error ? "is-invalid" : ""
                            }`}
                          id="profiles"
                          // value={profiles}
                          // onChange={(e) => setProfile(e.target.value)}
                          value={selectedProfile} // Use the scalar value state
                          onChange={handleProfileChange}
                        >
                          <option value="">Select a profile</option>
                          {Array.isArray(profiles) &&
                            profiles.map((profile) => (
                              <option key={profile.id} value={profile.id}>
                                {profile.name}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="text-danger">
                        {selectedProfile === "" && (
                          <div className="form-text text-danger  fs-0-point-7">
                            Select a profile
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label
                          htmlFor="phone"
                          className="form-label fw-700 fs-0-point-7 opacity-50"
                        >
                          Phone
                        </label>
                      </td>
                      <td>
                        <input
                          type="number"
                          className={`form-control form-control-sm small-placeholder ps-4 ${!territory && error ? "is-invalid" : ""
                            }`}
                          id="phone"
                          placeholder="Phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </td>
                      <td className="text-danger">
                        {phone === "" && (
                          <div className="form-text text-danger  fs-0-point-7">
                            Phone number is required
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <label
                          htmlFor="phone"
                          className="form-label fw-700 fs-0-point-7 opacity-50"
                        >
                          Address
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          className={`form-control form-control-sm small-placeholder ps-4 ${!address && error ? "is-invalid" : ""
                            }`}
                          id="address"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </td>
                      <td className="text-danger">
                        {address === "" && (
                          <div className="form-text text-danger  fs-0-point-7">
                            Address is required
                          </div>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <label
                          htmlFor="territory"
                          className="form-label fw-700 fs-0-point-7 opacity-50"
                        >
                          Territory
                        </label>
                      </td>
                      <td>
                        <input
                          type="text"
                          // className="form-control form-control-sm ps-4 small-placeholder"
                          className={`form-control form-control-sm small-placeholder ps-4 ${!territory && error ? "is-invalid" : ""
                            }`}
                          id="territory"
                          placeholder="Search Territory"
                          value={territory}
                          onChange={(e) => setTerritory(e.target.value)}
                        />
                      </td>
                      <td className="text-danger">
                        {territory === "" && (
                          <div className="form-text text-danger  fs-0-point-7">
                            Territory is required
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}