import Link from "next/link";

export default function AllJobOpening() {
  return (
    <div className="container-fluid p-3">
      <div className="row">
        {/* <!-- Left sidebar: filters --> */}
        <div className="col-12 col-md-3 col-xl-2 border-end">
          <h6 className="fw-bold mb-3">FILTER JOB OPENINGS BY</h6>
          <div className="mb-2">
            <input type="checkbox" id="filterTitle" />
            <label htmlFor="filterTitle" className="ms-1">Posting Title</label>
          </div>
          <div className="mb-2">
            <input type="checkbox" id="filterTodo" />
            <label htmlFor="filterTodo" className="ms-1">To-Dos</label>
          </div>
          <div className="mb-2">
            <input type="checkbox" id="filterNotes" />
            <label htmlFor="filterNotes" className="ms-1">Notes</label>
          </div>
          <div className="mb-2">
            <input type="checkbox" id="filterId" />
            <label htmlFor="filterId" className="ms-1">Job Opening ID</label>
          </div>
          <div className="mb-2">
            <input type="checkbox" id="filterRecruiter" />
            <label htmlFor="filterRecruiter" className="ms-1">Assigned Recruiter(s)</label>
          </div>
          <div className="mb-2">
            <input type="checkbox" id="filterDate" />
            <label htmlFor="filterDate" className="ms-1">Target Date</label>
          </div>
          <div className="mb-2">
            <input type="checkbox" id="filterStatus" />
            <label htmlFor="filterStatus" className="ms-1">Job Opening Status</label>
          </div>
          <div className="mb-2">
            <input type="checkbox" id="filterCity" />
            <label htmlFor="filterCity" className="ms-1">City</label>
          </div>
          <div className="mb-2">
            <input type="checkbox" id="filterDepartment" />
            <label htmlFor="filterDepartment" className="ms-1">Department Name</label>
          </div>
          <div className="mb-2">
            <input type="checkbox" id="filterManager" />
            <label htmlFor="filterManager" className="ms-1">Hiring Manager</label>
          </div>
          {/* <!-- Add additional filters as needed --> */}
        </div>

        {/* <!-- Main content --> */}
        <div className="col-12 col-md-9 col-xl-10">
          {/* <!-- Header row --> */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">All Job Openings</h4>
            <div>
              <Link className="btn btn-light me-2" href="/job-openings/create">Import</Link>

              <button className="btn btn-light">⋮</button>
            </div>
          </div>

          {/* <!-- Table of job openings --> */}
          <div className="table-responsive mb-2">
            <table className="table align-middle table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">
                    <input type="checkbox" />
                  </th>
                  <th scope="col">Job Opening ID</th>
                  <th scope="col">Posting Title</th>
                  <th scope="col">Assigned Recruiter(s)</th>
                  <th scope="col">Target Date</th>
                  <th scope="col">Job Opening Status</th>
                  <th scope="col">City</th>
                  <th scope="col">Department Name</th>
                  <th scope="col">Hiring Manager</th>
                </tr>
              </thead>
              <tbody>
                {/* <!-- Row 1 --> */}
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    {/* <!-- Example “icon + ID” --> */}
                    <span className="me-2 text-muted">🚴</span>
                    ZR_3_JOB
                  </td>
                  <td>
                    <a href="#!">Senior Accountant (Sample)</a>
                  </td>
                  <td>john@example.agency</td>
                  <td>01/18/2025</td>
                  <td>Waiting for approval</td>
                  <td>Tallahassee</td>
                  <td>Paula Rojas (Sample)</td>
                  <td>saha@bishnupadasaha.agency</td>
                </tr>
                {/* <!-- Row 2 --> */}
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <span className="me-2 text-muted">🚴</span>
                    ZR_2_JOB
                  </td>
                  <td>
                    <a href="#!">Sales Manager (Sample)</a>
                  </td>
                  <td>saha@bishnupadasaha.agency</td>
                  <td>01/18/2025</td>
                  <td>In-progress</td>
                  <td>Nil</td>
                  <td>Scott Fisher (Sample)</td>
                  <td>saha@bishnupadasaha.agency</td>
                </tr>
                {/* <!-- Row 3 --> */}
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    {/* <!-- Example “icon + ID” --> */}
                    <span className="me-2 text-danger">🚫</span>
                    ZR_1_JOB
                  </td>
                  <td>
                    <a href="#!">Product Analyst (Sample)</a>
                  </td>
                  <td>saha@bishnupadasaha.agency</td>
                  <td>01/18/2025</td>
                  <td>Filled</td>
                  <td>Biloxi</td>
                  <td>Quinn Rivers (Sample)</td>
                  <td>saha@bishnupadasaha.agency</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <!-- Footer row: total count, pagination controls --> */}
          <div className="d-flex justify-content-between">
            <div>Total Count: <strong>###</strong></div>
            <div>
              {/* <select className="form-select d-inline-block w-auto" aria-label="Records per page">
                <option value="10" selected="">10 Records per page</option>
                <option value="20">20 Records per page</option>
                <option value="50">50 Records per page</option>
              </select> */}
              <span className="ms-3">1 to 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}