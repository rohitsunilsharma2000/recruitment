"use client";
import React from "react";


function InterviewTable() {
   
    return (
      <div className="table-responsive mb-5">
        <table className="table table-bordered table-striped align-middle">
          <thead className="table-light">
            <tr>
              <th>File Name</th>
              <th>Candidate Name</th>
              <th>Posting Title</th>
              <th>Department Name</th>
              <th>Employment Type</th>
              <th>Expected Joining Date</th>
              <th>Expiry Date</th>
              <th>Sent On</th>
              <th>Medium</th>
              <th>Compensation Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
              <tr >
                <td>OfferLetter_01.pdf</td>
                <td>John Doe</td>
                <td>Senior Accountant (Sample)</td>
                <td>Accounting</td>
                <td>Full time</td>
                <td>01/25/2025</td>
                <td>01/30/2025</td>
                <td>12/20/2024</td>
                <td>Email</td>
                <td>$70,000</td>
                <td>Pending</td>
              </tr>
            {/* Additional rows can be added here */}
          </tbody>
        </table>
      </div>
    );
  }
  export default InterviewTable;
