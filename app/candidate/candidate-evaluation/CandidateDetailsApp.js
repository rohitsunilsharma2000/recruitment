import { fetchCandidateDetailsById } from '@/utils/restClient';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";

const PersonalInfo = ({ data }) => {
  console.log("PersonalInfo data ", data)
  return (
    <>
      <section className="mb-4">
        <h6 className="my-3">Basic Info </h6>
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>First Name:</label></span>
              <div>{data.firstName}</div>
            </div>

            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Last Name:</label></span>
              <div>{data.lastName}</div>
            </div>

            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Email:</label></span>
              <div>{data.email}</div>
            </div>
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Phone:</label></span>
              <div>{data.phone}</div>
            </div>
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Job Opening ID:</label></span>
              <div>--</div>
            </div>
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Assigned Recruiter(s):</label></span>
              <div>{data.email}</div>
            </div>

          </div>
          {/* Column 2 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Full Name:</label></span>
              <div>{data.firstName} {data.lastName}</div>
            </div>
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Application ID:</label></span>
              <div>--</div>
            </div>

            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Mobile      :</label></span>
              <div>{data.mobile}</div>
            </div>
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Posting Title:</label></span>
              <div>{data.currentJobTitle}</div>
            </div>
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Account Manager:</label></span>
              <div>--</div>
            </div>
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Department Name:</label></span>
              <div>--</div>
            </div>

          </div>
        </div>
      </section>
      <section className="mb-4">
        <h6 className="mb-3">Social Links</h6>
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>LinkedIn</label></span>
              <div>{data.linkedIn}</div>
            </div>

            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Twitter</label></span>
              <div>{data.twitter}</div>
            </div>
          </div>
          {/* Column 2 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Facebook</label></span>
              <div>{data.facebook}</div>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-4">
        <h6 className="mb-3">Other Info</h6>
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Application Status:</label></span>
              <div>--</div>
            </div>

            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Created By</label></span>
              <div>--</div>
            </div>
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Modified By</label></span>
              <div>--</div>
            </div>

          </div>
          {/* Column 2 */}
          <div className="col-md-6">
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Application Source</label></span>
              <div>--</div>
            </div>
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Created Time</label></span>
              <div>--</div>
            </div>
            <div className="d-flex flex-column mb-1">
              <span className="opacity-75"><label>Modified Time</label></span>
              <div>--</div>
            </div>

          </div>
        </div>
      </section>



    </>
  );
};

const CandidateDetailsApp = () => {

  const [candidateDetails, setCandidateDetails] = useState({});
  const searchParams = useSearchParams();
  const userId = searchParams.get("id"); // Get `id` from query params

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