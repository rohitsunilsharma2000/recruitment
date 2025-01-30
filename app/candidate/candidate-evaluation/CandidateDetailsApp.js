import { fetchCandidateDetailsById } from '@/utils/restClient';
import React, { useEffect, useState } from 'react';

const PersonalInfo = ({ data }) => {
  console.log("PersonalInfo data ", data)
  return (
    <>
      <section className="mb-4">
        <h4 className="mb-3">Basic Info </h4>
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>First Name:</strong></span>
              <div>{data.firstName}</div>
            </div>

            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Last Name:</strong></span>
              <div>{data.lastName}</div>
            </div>

            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Email:</strong></span>
              <div>{data.email}</div>
            </div>
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Phone:</strong></span>
              <div>{data.phone}</div>
            </div>
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Job Opening ID:</strong></span>
              <div>--</div>
            </div>
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Assigned Recruiter(s):</strong></span>
              <div>{data.email}</div>
            </div>

          </div>
          {/* Column 2 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Full Name:</strong></span>
              <div>{data.firstName} {data.lastName}</div>
            </div>
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Application ID:</strong></span>
              <div>--</div>
            </div>

            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Mobile      :</strong></span>
              <div>{data.mobile}</div>
            </div>
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Posting Title:</strong></span>
              <div>{data.currentJobTitle}</div>
            </div>
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Account Manager:</strong></span>
              <div>--</div>
            </div>
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Department Name:</strong></span>
              <div>--</div>
            </div>

          </div>
        </div>
      </section>
      <section className="mb-4">
        <h4 className="mb-3">Social Links</h4>
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>LinkedIn</strong></span>
              <div>{data.linkedIn}</div>
            </div>

            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Twitter</strong></span>
              <div>{data.twitter}</div>
            </div>
          </div>
          {/* Column 2 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Facebook</strong></span>
              <div>{data.facebook}</div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4">
        <h4 className="mb-3">Other Info</h4>
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Application Status:</strong></span>
              <div>--</div>
            </div>

            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Created By</strong></span>
              <div>--</div>
            </div>
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Modified By</strong></span>
              <div>--</div>
            </div>

          </div>
          {/* Column 2 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Application Source</strong></span>
              <div>--</div>
            </div>
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Created Time</strong></span>
              <div>--</div>
            </div>
            <div className="d-flex flex-column mb-2">
              <span className="opacity-75"><strong>Modified Time</strong></span>
              <div>--</div>
            </div>

          </div>
        </div>
      </section>



    </>
  );
};

const CandidateDetailsApp = ({ userId }) => {

  const [candidateDetails, setCandidateDetails] = useState({});

  // Call fetchJobApplicationsStatus from restClient.js in CreateCandidateForm
  useEffect(() => {
    async function fetchCandidateDetailsByIdData() {
      try {
        const response = await fetchCandidateDetailsById(userId); // Fetch data from the API
        console.log("Fetched Get Candidate by ID:", response); // Log the response for debugging
        setCandidateDetails(response); // Store the response data in state
      } catch (error) {
        setCandidateDetails([]); // Set an empty array in case of error
      }
    }

    fetchCandidateDetailsByIdData(); // Trigger the API call when the component mounts
  }, []); // The empty array ensures it runs only once when the component mounts


  return (
    <div>
      <PersonalInfo data={candidateDetails} />
    </div>
  );
};

export default CandidateDetailsApp;
