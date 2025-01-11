"use client";
import React from 'react';

const CreateCandidateForm = () => {
  return (
    <div className="container mt-5">
      <h2>Create Candidate</h2>
      <form>
        <table className="table table-bordered">
          <tbody>
            <tr className="border">
              <th colSpan="4" className="border">Basic Info</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="firstName" className="form-label">First Name</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="firstName" placeholder="First Name" /></td>
              <td className="border-0 text-end">
                <label htmlFor="lastName" className="form-label">Last Name</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="lastName" placeholder="Last Name" /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="email" className="form-label">Email</label>
              </td>
              <td className="border-0"><input type="email" className="form-control " id="email" placeholder="Email" /></td>
              <td className="border-0 text-end">
                <label htmlFor="mobile" className="form-label">Mobile</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="mobile" placeholder="Mobile" /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="phone" className="form-label">Phone</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="phone" placeholder="Phone" /></td>
              <td className="border-0 text-end">
                <label htmlFor="website" className="form-label">Website</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="website" placeholder="Website" /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="secondaryEmail" className="form-label">Secondary Email</label>
              </td>
              <td className="border-0"><input type="email" className="form-control " id="secondaryEmail" placeholder="Secondary Email" /></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Address Information</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="street" className="form-label">Street</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="street" placeholder="Street" /></td>
              <td className="border-0 text-end">
                <label htmlFor="province" className="form-label">Province</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="province" placeholder="Province" /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="city" className="form-label">City</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="city" placeholder="City" /></td>
              <td className="border-0 text-end">
                <label htmlFor="postalCode" className="form-label">Postal Code</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="postalCode" placeholder="Postal Code" /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="country" className="form-label">Country</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="country" placeholder="Country" /></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Professional Details</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="experience" className="form-label">Experience in Years</label>
              </td>
              <td className="border-0"><input type="number" className="form-control " id="experience" placeholder="Experience" /></td>
              <td className="border-0 text-end">
                <label htmlFor="currentJobTitle" className="form-label">Current Job Title</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="currentJobTitle" placeholder="Current Job Title" /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="expectedSalary" className="form-label">Expected Salary</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="expectedSalary" placeholder="Expected Salary" /></td>
              <td className="border-0 text-end">
                <label htmlFor="skillSet" className="form-label">Skill Set</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="skillSet" placeholder="Skill Set" /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="skypeId" className="form-label">Skype ID</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="skypeId" placeholder="Skype ID" /></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Social Links</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="linkedin" className="form-label">LinkedIn</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="linkedin" placeholder="LinkedIn" /></td>
              <td className="border-0 text-end">
                <label htmlFor="twitter" className="form-label">Twitter</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="twitter" placeholder="Twitter" /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="facebook" className="form-label">Facebook</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="facebook" placeholder="Facebook" /></td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Other Info</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="candidateStatus" className="form-label">Candidate Status</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="candidateStatus" placeholder="Candidate Status" /></td>
              <td className="border-0 text-end">
                <label htmlFor="candidateOwner" className="form-label">Candidate Owner</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="candidateOwner" placeholder="Candidate Owner" /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="emailOptOut" className="form-label">Email Opt Out</label>
              </td>
              <td className="border-0">
                <input type="checkbox" className="form-check-input" id="emailOptOut" />
              </td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Educational Details</th>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="institute" className="form-label">Institute / School</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="institute" placeholder="Institute / School" /></td>
              <td className="border-0 text-end">
                <label htmlFor="major" className="form-label">Major / Department</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="major" placeholder="Major / Department" /></td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="degree" className="form-label">Degree</label>
              </td>
              <td className="border-0"><input type="text" className="form-control " id="degree" placeholder="Degree" /></td>
              <td className="border-0 text-end">
                <label htmlFor="duration" className="form-label">Duration</label>
              </td>
              <td className="border-0">
                <div className="d-flex">
                  <select className="form-select" id="startMonth">
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select className="form-select" id="startYear">
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                  <span className="mx-2">To</span>
                  <select className="form-select" id="endMonth">
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select className="form-select" id="endYear">
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="border-0 text-end">
                <label htmlFor="currentlyPursuing" className="form-label">Currently Pursuing</label>
              </td>
              <td className="border-0">
                <input className="form-check-input" type="checkbox" id="currentlyPursuing" />
              </td>
              <td className="border-0"></td>
              <td className="border-0"></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">
                <button className="btn btn-link text-primary" type="button">+ Add Educational Details</button>
              </th>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">Experience Details</th>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">
                <label htmlFor="occupation" className="form-label">Occupation / Title</label>
              </td>
              <td className="border-0" colSpan="3"><input type="text" className="form-control " id="occupation" placeholder="Occupation / Title" /></td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">
                <label htmlFor="company" className="form-label">Company</label>
              </td>
              <td className="border-0" colSpan="3"><input type="text" className="form-control " id="company" placeholder="Company" /></td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">
                <label htmlFor="summary" className="form-label">Summary</label>
              </td>
              <td className="border-0" colSpan="3"><textarea className="form-control " rows="3" id="summary" placeholder="Summary"></textarea></td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">
                <label htmlFor="workDuration" className="form-label">Work Duration</label>
              </td>
              <td className="border-0">
                <div className="d-flex">
                  <select className="form-select" id="workStartMonth">
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select className="form-select" id="workStartYear">
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                  <span className="mx-2">To</span>
                  <select className="form-select" id="workEndMonth">
                    <option>Month</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                  </select>
                  <select className="form-select" id="workEndYear">
                    <option>Year</option>
                    <option>2020</option>
                    <option>2021</option>
                    <option>2022</option>
                  </select>
                </div>
              </td>
            </tr>
            <tr className="border-0">
              <td className="text-end border-0">
                <label htmlFor="currentlyWorking" className="form-label">I currently work here</label>
              </td>
              <td className="border-0" colSpan="3"><input className="form-check-input" type="checkbox" id="currentlyWorking" /></td>
            </tr>

            <tr className="border">
              <th colSpan="4" className="border">
                <button className="btn btn-link text-primary" type="button">+ Add Experience</button>
              </th>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateCandidateForm;
