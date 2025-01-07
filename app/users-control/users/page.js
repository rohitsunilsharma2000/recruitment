"use client"; // Add this directive at the top

import AddUserModal from "@/components/modal/add-user/AddUserModal";
import "./users.css";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/utils/restClient";

export default function UserList() {
  
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users

  useEffect(() => {
    // Fetch all users from the backend and set them into allusers
    async function fetchUsersData() {
      try {
        const users = await fetchUsers(); // Call to fetch all users
        if (Array.isArray(users)) {
          setUsers(users); // Set users if the response is an array
          setFilteredUsers(users);
        } else {
          console.error("Invalid users response:", users);
          setUsers([]); // Default to an empty array
          setFilteredUsers([]);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]); // Default to an empty array in case of error
        setFilteredUsers([]);
      }
    }

    fetchUsersData();
  }, []);

  // Filter users based on search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.role.name.toLowerCase().includes(term)
      )
    );
  };

  return (
    <div className="bg-light- ps-2">
      <div className="row profile-details">
        {/* <!-- User List --> */}
        <div className="col-6 border-end">
          {/* <!-- Header Row --> */}
          <div className="d-flex justify-content-between align-items-center mb-3  ">
            {/* <!-- Dropdown --> */}
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Active Users (2)
              </button>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Active Users
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Inactive Users
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Unconfirmed Users
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Deleted Users
                  </a>
                </li>
              </ul>
            </div>

            {/* <!-- Add New User Button --> */}
            {/* <button className="btn btn-primary">
        + Add New User
      </button> */}
            <AddUserModal />
          </div>

          {/* <!-- Search Bar --> */}
          <div className="input-group mb-3 ">
            <span className="input-group-text" id="searchIcon">
              <i className="bi bi-search"></i>
              {/* <!-- Bootstrap Icons --> */}
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="searchIcon"
              onChange={handleSearch}              
            />
          </div>

          <div className="border-bottom mb-4"></div>

          {/* <!-- User List --> */}
          <h5 className="mb-3">Trial Users</h5>
          <div className="list-group">
            {/* <!-- User 1 --> */}
            {/* <div className="list-group-item d-flex align-items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="rounded-circle me-3"
              />
              <div className="flex-grow-1">
                <h6 className="mb-0">Debnath Saha</h6>
                <small className="text-muted">Employee, Employee</small>
                <br />
                <small className="text-muted">dsdebnath4663@gmail.com</small>
              </div>
            </div> */}

            {/* <!-- User 2 --> */}

            {filteredUsers.map((user) => (
              <div
                className="list-group-item d-flex align-items-center"
                key={user.id}
              >
                <img
                  src="https://via.placeholder.com/40/28a745/FFFFFF/?text=R"
                  alt="User Avatar"
                  className="rounded-circle me-3"
                />
                <div className="flex-grow-1">
                  <h6 className="mb-0">
                    {user.firstName + " " + user.lastName}
                  </h6>
                  <small className="text-muted">
                    {user.role.name}
                    {/* Recruiter Admin, Administrator */}
                  </small>
                  <br />
                  <small className="text-muted">{user.email}</small>
                </div>
                <span className="ms-auto">
                  <i className="bi bi-star-fill text-warning"></i>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* <!-- Profile Details --> */}

        <div className="col-6">
          {/* <!-- Profile Header --> */}
          <div className="d-flex align-items-start mb-4 ">
            {/* <!-- User Avatar --> */}
            <div className="me-4">
              <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center avatar">
                R
              </div>
              <a
                href="#"
                className="d-block text-decoration-none text-primary mt-2"
              >
                Change
              </a>
            </div>

            {/* <!-- User Details --> */}
            <div className="flex-grow-1">
              <h4 className="mb-1">
                Rohit Sharma{" "}
                <span className="badge bg-secondary">Administrator</span>
              </h4>
              <p className="mb-1 text-muted">
                Recruiter Admin at bishnupadasha.agency
              </p>
              <p className="mb-1 text-muted">
                <i className="bi bi-envelope me-1"></i>{" "}
                saha@bishnupadasha.agency
              </p>
            </div>
          </div>

          {/* <!-- Locale Information --> */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-3">Locale Information</h5>
              <a href="#" className="text-primary">
                <i className="bi bi-pencil"></i>
              </a>
            </div>
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Language</td>
                  <td className="text-muted">English (United Kingdom)</td>
                </tr>
                <tr>
                  <td>Country Locale</td>
                  <td className="text-muted">United States</td>
                </tr>
                <tr>
                  <td>Date Format</td>
                  <td className="text-muted">MM/DD/YYYY</td>
                </tr>
                <tr>
                  <td>Time Format</td>
                  <td className="text-muted">12 Hours</td>
                </tr>
                <tr>
                  <td>Time Zone</td>
                  <td className="text-muted">India Standard Time</td>
                </tr>
                <tr>
                  <td>Shift Hour</td>
                  <td className="text-muted">- None -</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <!-- Territories --> */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-3">Territories</h5>
              <a href="#" className="text-primary">
                <i className="bi bi-pencil"></i>
              </a>
            </div>
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>bishnupadasha.agency</td>
                  <td className="text-muted">Manager</td>
                </tr>
                <tr>
                  <td>Recruiter Admin</td>
                  <td></td>
                </tr>
                <tr>
                  <td>India</td>
                  <td className="text-muted">Manager</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <!-- Reporting Hierarchy --> */}
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-3">Reporting Hierarchy</h5>
              <a href="#" className="text-primary">
                <i className="bi bi-pencil"></i>
              </a>
            </div>
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Reporting Manager</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Subordinates</td>
                  <td className="text-muted">Suresh Menon</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
