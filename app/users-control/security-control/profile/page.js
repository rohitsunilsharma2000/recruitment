"use client"; // Add this directive at the top
import React, { useEffect, useState } from 'react';

import "./profile.css"
import AddProfileModal from '@/components/modal/add-profile/AddProfileModal';
import { fetchProfiles } from '@/utils/restClient';
export default function Profile() {


  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users


  useEffect(() => {
    // Fetch all users from the backend and set them into allusers
    async function fetchProfilesData() {
      try {
        const users = await fetchProfiles(); // Call to fetch all users
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

    fetchProfilesData();
  }, []);

  return (
    <div className="container">

      <b className="mb-0 fs-0-point-7">New Profiles
      </b>
      <p className="mb-0 fs-0-point-7 mb-2">
        This page helps you to manage module-level permissions for your users.
      </p>

      <div className='d-flex justify-content-end mb-3'>
        {/* <a href="#" className="btn btn-primary btn-new-profile">+ New Profile</a> */}
        <AddProfileModal />
      </div>

      <div className="card ">

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-sm align-middle ">
              <thead>

                <tr>
                  <th>Profile Name</th>
                  <th>Profile Description</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.description}</td>
                  </tr>
                ))}

                {/* <tr>
                  <td>Standard</td>
                  <td>This profile will not have administrative permissions.</td>
                </tr>
                <tr>
                  <td>Hiring Manager</td>
                  <td>Can create jobs, review candidates submitted, and add notes.</td>
                </tr>
                <tr>
                  <td>Employee</td>
                  <td>Can create referrals and give interview feedback submitted to them.</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>





    </div>
  );
}
