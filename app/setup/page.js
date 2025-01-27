import React from 'react';
import Link from 'next/link';

const SetupPage = () => {
  return (
    <div className="container my-5">
      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-12 col-md-6">
          <div className="position-relative">
            <input
              id="searchInput"
              className="form-control"
              type="text"
              placeholder="Search..."

            />
            {/* Example of a static dropdown for suggestions */}
            <ul
              id="searchDropdown"
              className="dropdown-menu w-100"
              style={{ top: '100%', left: '0' }}
            >
              <li><Link href="#quickApply" className="dropdown-item">Quick Apply</Link></li>
              <li><Link href="#zoho" className="dropdown-item">Zoho</Link></li>
              <li><Link href="#zapierIntegration" className="dropdown-item">Zapier Integration</Link></li>
              <li><Link href="#dataBackup" className="dropdown-item">Data Backup</Link></li>
              <li><Link href="#smsGateway" className="dropdown-item">SMS Gateway</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
        {/* 1: General */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">General</h5>
              <ul className="list-unstyled mb-0">
                <li>Personal Settings</li>
                <li>Company Details</li>
                <li>Calendar Settings <span className="badge bg-warning text-dark">✨</span></li>
                <li>Email Settings</li>
                <li>Notification Settings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2: Users and Control */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Users and Control</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <Link
                    href="/users-control/users"
                    className="text-decoration-none"
                  >
                    User
                  </Link>
                </li>

                <li>
                  <Link
                    href="/users-control/security-control/roles"
                    className="text-decoration-none"
                  >
                    Security Control
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users-control/registration"
                    className="text-decoration-none"
                  >
                    Registration
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users-control/registration-single-state-object"
                    className="text-decoration-none"
                  >
                    Registration as single state object
                  </Link>
                </li>

                <li>
                  <Link
                    href="/candidate/others"
                    className="text-decoration-none"
                  >
                    Dynamic Educational Form
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3: Customization */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Customization</h5>
              <ul className="list-unstyled mb-0">
                <li>Modules</li>
                <li>Templates</li>
                <li>Hiring Pipeline</li>
                <li>Copy Customization</li>
                <li>Customize Home page</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4: Resume Management */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Resume Management</h5>
              <ul className="list-unstyled mb-0">
                <li>Resume Parser Mapping</li>
                <li>Resume Inbox</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5: Portal Setup */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Portal Setup</h5>
              <ul className="list-unstyled mb-0">
                <li>Portal</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6: Career Website */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Career Website</h5>
              <ul className="list-unstyled mb-0">
                <li>Career Site</li>
                <li>Webforms</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 7: Job Board Hub */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Job Board Hub</h5>
              <ul className="list-unstyled mb-0">
                <li id="quickApply">Source Boosters</li>
                <li>Job Boards</li>
                <li>Quick Apply</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8: Automation */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Automation</h5>
              <ul className="list-unstyled mb-0">
                <li>Workflow Rules</li>
                <li>Actions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 9: Marketplace */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Marketplace</h5>
              <ul className="list-unstyled mb-0">
                <li id="zoho">Zoho</li>
                <li>Google</li>
                <li>Microsoft</li>
                <li id="zapierIntegration">Zapier</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 10: Data Administration */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Data Administration</h5>
              <ul className="list-unstyled mb-0">
                <li>Data Migration</li>
                <li>Export</li>
                <li>Remove Sample Data</li>
                <li id="dataBackup">Data Backup</li>
                <li>Storage</li>
                <li>Recycle Bin</li>
                <li>Audit Log</li>
                <li>Activity Log</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 11: Developer Space */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Developer Space</h5>
              <ul className="list-unstyled mb-0">
                <li>APIs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 12: Telephony */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Telephony</h5>
              <ul className="list-unstyled mb-0">
                <li>Instant Messaging <span className="badge bg-warning text-dark">✨</span></li>
                <li>Mobile Apps</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 13: Compliance */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Compliance</h5>
              <ul className="list-unstyled mb-0">
                <li>GDPR</li>
                <li>Sub Processors</li>
                <li>EEO Compliance</li>
                <li>OFCCP</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 14: Zia */}
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Zia</h5>
              <ul className="list-unstyled mb-0">
                <li>Chatbot</li>
                <li>AI Assist <span className="badge bg-warning text-dark">✨</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Bootstrap </h5>
              <ul className="list-unstyled mb-0">
              <li>
                  <Link
                    href="/template/all-form"
                    className="text-decoration-none"
                  >
                  All Bootstrap Components  
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
