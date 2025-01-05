'use client';

import { useEffect, useState } from 'react';
import { fetchUserData } from '../../utils/restClient';
import { useRouter } from 'next/navigation';

import "./dashboard.css"

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if no token found
      router.push('/authentication/card/sign-in');
      return;
    }

    // const fetchData = async () => {
    //   try {
    //     const data = await fetchUserData();
    //     setUserData(data);
    //   } catch (error) {
    //     // Handle error or redirect to login
    //     router.push('/about');
    //   }
    // };

    // fetchData();
  }, [router]);

  // if (!userData) return <p>Loading...</p>;

  return (

    // <body className="bg-light">
    <div className="container-fluid py-3">
      {/* Row 1: Hiring Pipeline (1 card across entire row) --> */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <p className="mb-0 fw-700 ">Hiring Pipeline</p>

              <div>
                {/* Example filters on the right side: All Users, All Departments --> */}
                <select className="form-select form-select-sm d-inline-block w-auto me-2">
                  <option>All Users</option>
                  <option>User A</option>
                  <option>User B</option>
                </select>
                <select className="form-select form-select-sm d-inline-block w-auto">
                  <option>All Departments</option>
                  <option>Department A</option>
                  <option>Department B</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              {/* Pipeline stages across the top --> */}
              {/* <div className="d-flex mb-3 flex-wrap">
                <div className="stage-badge">Screening</div>
                <div className="stage-badge">Submissions</div>
                <div className="stage-badge">Interview</div>
                <div className="stage-badge">Offered</div>
                <div className="stage-badge">Hired</div>
                <div className="stage-badge">Rejected</div>
                <div className="stage-badge">Archived</div>
              </div> */}
              {/* Example pipeline items --> */}
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="">
                    <tr>
                      <th>Posting Title / Dept. Name</th>
                      <th>
                        <div className="position-relative">
                          <div
                            className="position-absolute top-0 border-top border-3 border-danger border-0 border-top th-top-border">
                          </div>
                          Screening
                        </div>
                      </th>
                      <th>
                        <div className="position-relative">
                          <div
                            className="position-absolute top-0 border-top border-3 border-warning border-0 border-top th-top-border">
                          </div>
                          Submissions
                        </div></th>
                      <th>Interview</th>
                      <th>Offered</th>
                      <th>Hired</th>
                      <th>Rejected</th>
                      <th>Archived</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a href="#!">Sales Manager (Sample)</a><br />
                        <small className="text-muted">Scott Fisher (Sample)</small>
                      </td>
                      <td><span className="text-danger">✘</span></td>
                      <td><span className="text-muted">0</span></td>
                      {/* <td><span className=" text-dark">1</span></td> --> */}
                      <td>
                        <div className="arrow-choc">
                          <a href="#" className="text-decoration-none text-body">
                            3
                          </a>
                        </div>
                      </td>
                      <td><span className="text-muted">0</span></td>
                      <td><span className="text-muted">0</span></td>
                      <td><span className="text-muted">0</span></td>
                      <td><span className="text-muted">–</span></td>
                      <td><span className="text-muted">–</span></td>
                    </tr>
                    <tr>
                      <td>
                        <a href="#!">Product Analyst (Sample)</a><br />
                        <small className="text-muted">Quinn Rivers (Sample)</small>
                      </td>
                      <td>
                        <div className="arrow-choc ">
                          <a href="#" className="text-decoration-none text-body ">
                            3
                          </a>
                        </div>
                      </td>
                      <td><span className="text-muted">0</span></td>
                      <td><span className="text-muted">0</span></td>
                      <td><span className="badge bg-success">1</span></td>
                      <td><span className="text-muted">0</span></td>
                      <td><span className="text-muted">–</span></td>
                      <td><span className="text-muted">–</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Time-to-fill & Time-to-hire (2 cards max) --> */}
      <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
        {/* Card: Time-to-fill --> */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <p className="mb-0 fw-700 ">Time-to-fill</p>
              <div>
                <select className="form-select form-select-sm d-inline-block w-auto me-2">
                  <option>All Users</option>
                  <option>User A</option>
                  <option>User B</option>
                </select>
                <select className="form-select form-select-sm d-inline-block w-auto">
                  <option>Any time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              {/* Example table for Time-to-fill --> */}
              <div className="table-responsive">
                <table className="table table-sm align-middle">
                  <thead className="">
                    <tr>
                      <th>Job Opening</th>
                      <th>Candidates/position</th>
                      <th>Time-to-fill</th>
                      <th>Delay</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>All Jobs</td>
                      <td>15</td>
                      <td>3</td>
                      <td>0</td>
                      <td>On-track</td>
                    </tr>
                    <tr>
                      <td>Product Analyst (Sample)</td>
                      <td>1</td>
                      <td>15</td>
                      <td>0</td>
                      <td>On-track</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Card: Time-to-hire --> */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <p className="mb-0 fw-700 ">Time-to-hire</p>
              <div>
                <select className="form-select form-select-sm d-inline-block w-auto me-2">
                  <option>All Users</option>
                  <option>User A</option>
                  <option>User B</option>
                </select>
                <select className="form-select form-select-sm d-inline-block w-auto">
                  <option>Any time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              {/* Example table for Time-to-hire --> */}
              <div className="table-responsive">
                <table className="table table-sm align-middle">
                  <thead className="">
                    <tr>
                      <th>Candidate</th>
                      <th>Job Opening</th>
                      <th>Time-to-hire</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Christine Madsen (Sample)</td>
                      <td>Product Analyst (Sample)</td>
                      <td>15</td>
                    </tr>
                    {/* Additional rows as needed --> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Age of Job & Offer Acceptance Rate --> */}
      <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
        {/* Card: Age of Job --> */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <p className="mb-0 fw-700 ">Age of Job</p>
              <div>
                <select className="form-select form-select-sm d-inline-block w-auto me-2">
                  <option>All Users</option>
                  <option>User A</option>
                  <option>User B</option>
                </select>
                <select className="form-select form-select-sm d-inline-block w-auto">
                  <option>Any time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              {/* Example table for Age of Job --> */}
              <div className="table-responsive">
                <table className="table table-sm align-middle">
                  <thead className="">
                    <tr>
                      <th>Job Opening</th>
                      <th># Positions</th>
                      <th>Age (Since Creation)</th>
                      <th>Delay</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sales Manager (Sample)</td>
                      <td>2</td>
                      <td>15</td>
                      <td>0</td>
                      <td>On-track</td>
                    </tr>
                    <tr>
                      <td>Senior Accountant (Sample)</td>
                      <td>6</td>
                      <td>16</td>
                      <td>0</td>
                      <td>On-radar</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Card: Offer Acceptance Rate --> */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <p className="mb-0 fw-700 ">Offer Acceptance Rate</p>
              <div>
                <select className="form-select form-select-sm d-inline-block w-auto me-2">
                  <option>All Users</option>
                  <option>User A</option>
                  <option>User B</option>
                </select>
                <select className="form-select form-select-sm d-inline-block w-auto">
                  <option>Any time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              {/* Placeholder for data --> */}
              <p className="text-muted">No records found</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: My Unattended Calls & Upcoming Interviews --> */}
      <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
        {/* Card: My Unattended Calls --> */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-header">
              <p className="mb-0 fw-700 ">My Unattended Calls</p>
            </div>
            <div className="card-body">
              {/* Example table for calls --> */}
              <div className="table-responsive">
                <table className="table table-sm align-middle">
                  <thead className="">
                    <tr>
                      <th>Subject</th>
                      <th>Related To</th>
                      <th>Call Start Time</th>
                      <th>Activity Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><a href="#!">Call Client on Job Opening</a></td>
                      <td>Product Analyst (Sample)</td>
                      <td>Oct 1, 2021 10:05 AM</td>
                      <td>Call</td>
                    </tr>
                    <tr>
                      <td>Conversation on Call</td>
                      <td>Product Analyst (Sample)</td>
                      <td>Nov 7, 2019 12:06 AM</td>
                      <td>Call</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Card: Upcoming Interviews --> */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-header">
              <p className="mb-0 fw-700 ">Upcoming Interviews</p>
            </div>
            <div className="card-body">
              <p className="text-muted">No interviews found</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Completed Interviews & My Actions --> */}
      <div className="row row-cols-1 row-cols-md-2 g-4 mb-4">
        {/* Card: Completed Interviews --> */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-header">
              <p className="mb-0 fw-700 ">Completed Interviews</p>
            </div>
            <div className="card-body">
              {/* Example table for completed interviews --> */}
              <div className="table-responsive">
                <table className="table table-sm align-middle">
                  <thead className="">
                    <tr>
                      <th>Interview Name</th>
                      <th>Date/Time</th>
                      <th>Interview Status</th>
                      <th>Candidate Name</th>
                      <th>Department Name</th>
                      <th>Posting Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Internal Interview</td>
                      <td>Dec 24, 2024 (3:30 PM - 6:00 PM)</td>
                      <td>On-Hold</td>
                      <td>Aaron Brown (Sample)</td>
                      <td>Scott Fisher (Sample)</td>
                      <td>Sales Manager (Sample)</td>
                    </tr>
                    <tr>
                      <td>General Interview</td>
                      <td>Dec 24, 2024 (3:30 PM - 6:00 PM)</td>
                      <td>Strong Hire</td>
                      <td>Christine Madsen (Sample)</td>
                      <td>Quinn Rivers (Sample)</td>
                      <td>Product Analyst (Sample)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Card: My Actions --> */}
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <p className="mb-0 fw-700 ">My Actions</p>
              <div>
                <select className="form-select form-select-sm d-inline-block w-auto">
                  <option>Any time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              {/* Example: Upcoming to-dos / interviews --> */}
              <p className="fw-semibold mb-1">
                Interview scheduled for Senior Accountant (Sample) on Dec 19,
                2024
              </p>
              {/* Add more items as needed --> */}
            </div>
          </div>
        </div>
      </div>

      {/* Row 6: All Activities (single card across full row) --> */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <p className="mb-0 fw-700 ">All Activities</p>
              <div>
                <select className="form-select form-select-sm d-inline-block w-auto me-2">
                  <option>All Users</option>
                  <option>User A</option>
                  <option>User B</option>
                </select>
                <select className="form-select form-select-sm d-inline-block w-auto me-2">
                  <option>Any time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
                <select className="form-select form-select-sm d-inline-block w-auto">
                  <option>All Activities</option>
                  <option>Job Openings</option>
                  <option>Candidates</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>
                  <small className="text-muted">Yesterday • 09:32 AM</small><br />
                  saha@bishnupadasaha.agency has published the job opening
                  <strong>Product Analyst (Sample)</strong> on job boards
                </li>
                <hr />
                <li>
                  <small className="text-muted">09:30 AM</small><br />
                  saha@bishnupadasaha.agency added candidates
                  <strong>Martha Hills (Sample)</strong>
                </li>
                <hr />
                <li>
                  <small className="text-muted">09:20 AM</small><br />
                  saha@bishnupadasaha.agency added candidates
                  <strong>Aaron Brown (Sample)</strong>
                </li>
                {/*  More items as needed --> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
