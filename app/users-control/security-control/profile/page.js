"use client"; // Add this directive at the top
import React, { useState } from 'react';

import "./profile.css"
import AddProfileModal from '@/components/modal/add-profile/AddProfileModal';
export default function Profile() {

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
                <tr>
                  <td>Administrator</td>
                  <td>This profile will have all the permissions</td>
                </tr>
                <tr>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>





    </div>
  );
}
