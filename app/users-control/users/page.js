import AddUserModal from "@/components/modal/add-user/AddUserModal";
import "./users.css"
export default function Users() {

  
  return (
    <div className="bg-light">
      <div className="row">
        {/* <!-- User List --> */}
        <div className="col-6 ">
          <div className="user-list">

            <div className="user-item">
              <div>
                <h5>Active Users (2)</h5>
              </div>
              {/* <!-- Button to Trigger Modal --> */}
              {/* <button className="btn btn-sm btn-primary btn-recruitment " data-bs-toggle="modal" data-bs-target="#addUserModal">
                <span className="custom-font fw-700"> Add New User</span>
              </button> */}
              <AddUserModal />
            </div>
            <div className="user-item">
              <div>
                <span>saha@bishnupadasaha.agency</span>
                <p className="small text-muted mb-0">Recruiter Admin, Administrator</p>
              </div>
              <button className="btn btn-sm btn-danger">Deactivate</button>
            </div>
            <div className="user-item">
              <div>
                <span>rohit sunil</span>
                <p className="small text-muted mb-0">Recruiter, Administrator</p>
              </div>
              <button className="btn btn-sm btn-secondary">Activate</button>
            </div>
          </div>
        </div>

        {/* <!-- Profile Details --> */}
        <div className="col-6">
          <div className="profile-details">
            <div className="profile-section">
              <div>
                <h5>saha@bishnupadasaha.agency</h5>
                <p className="small text-muted">Recruiter Admin at</p>
                <p>meghnadsaha222@gmail.com</p>
              </div>
              <img src="https://via.placeholder.com/50" alt="User Image" className="rounded-circle" />
            </div>
          </div>
          {/* <!-- Locale Information --> */}
          <div className="locale-info mt-3">
            <h6>Locale Information</h6>
            <p><strong>Language:</strong> English (United Kingdom)</p>
            <p><strong>Country Locale:</strong> United States</p>
            <p><strong>Date Format:</strong> MM/DD/YYYY</p>
            <p><strong>Time Format:</strong> 12 Hours</p>
            <p><strong>Time Zone:</strong> India Standard Time</p>
          </div>

          {/* <!-- Reporting Hierarchy --> */}
          <div className="reporting-hierarchy mt-3">
            <h6>Reporting Hierarchy</h6>
            <p><strong>Reporting Manager:</strong> saha@bishnupadasaha.agency</p>
            <p><strong>Subordinates:</strong> rohit sunil</p>
          </div>

          {/* <!-- Signature Section --> */}
          <div className="signature-section mt-3">
            <h6>Signature</h6>
            <p>No Signature</p>
          </div>
        </div>
      </div>


    </div>
  );
}
