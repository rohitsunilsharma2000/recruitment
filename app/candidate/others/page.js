

"use client";
import React, { useState } from 'react';

const CreateCandidateDynamicForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    phone: '',
    website: '',
    secondaryEmail: '',
    street: '',
    province: '',
    city: '',
    postalCode: '',
    country: '',
    experience: '',
    currentJobTitle: '',
    expectedSalary: '',
    skillSet: '',
    skypeID: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    candidateStatus: '',
    candidateOwner: '',
    emailOptOut: false,
    institute: '',
    major: '',
    degree: '',
    durationStartMonth: '',
    durationStartYear: '',
    durationEndMonth: '',
    durationEndYear: '',
    currentlyPursuing: false,
    occupationTitle: '',
    company: '',
    summary: '',
    workStartMonth: '',
    workStartYear: '',
    workEndMonth: '',
    workEndYear: '',
    currentlyWorking: false,
    resume: null,
    coverLetter: null,
    others: null,
    offer: null,
    contracts: null,
  });

  // New state for educational details
  const [educationalDetails, setEducationalDetails] = useState([
    {
      institute: '',
      major: '',
      degree: '',
      durationStartMonth: '',
      durationStartYear: '',
      durationEndMonth: '',
      durationEndYear: '',
      currentlyPursuing: false,
    },
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const oldData = { ...formData };  // Copy the old data before the change

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    const newData = { ...formData };  // Copy the updated form data
    console.log('Old Form Data:', oldData);
    console.log('New Form Data:', newData);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const oldData = { ...formData };  // Copy the old data before the change

    setFormData({
      ...formData,
      [name]: files[0],
    });

    const newData = { ...formData };  // Copy the updated form data
    console.log('Old Form Data:', oldData);
    console.log('New Form Data:', newData);
  };

  // Function to handle the addition of new educational details
  const addEducationalDetail = () => {
    setEducationalDetails([
      ...educationalDetails,
      {
        institute: '',
        major: '',
        degree: '',
        durationStartMonth: '',
        durationStartYear: '',
        durationEndMonth: '',
        durationEndYear: '',
        currentlyPursuing: false,
      },
    ]);
  };

  // Function to handle changes in educational details input fields
  const handleEducationalDetailChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const oldEducationalDetails = [...educationalDetails]; // Copy the old educational details

    const updatedEducationalDetails = [...educationalDetails];
    if (type === 'checkbox') {
      updatedEducationalDetails[index][name] = checked;
    } else {
      updatedEducationalDetails[index][name] = value;
    }
    setEducationalDetails(updatedEducationalDetails);

    const newEducationalDetails = [...updatedEducationalDetails];  // Copy the updated educational details
    console.log('Old Educational Details:', oldEducationalDetails);
    console.log('New Educational Details:', newEducationalDetails);
  };

  return (
    <div className="container mt-5">
      <h2>Create Candidate</h2>
      <form>
        <table className="table table-bordered">
          <tbody>
            <tr className="border">
              <th colSpan="4" className="border">Basic Info</th>
            </tr>
            {/* Basic Info fields */}
            {/* Address, Professional, Social, Other Info fields */}

            <tr className="border">
              <th colSpan="4" className="border">Educational Details</th>
            </tr>
            {educationalDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <tr className="border-0">
                  <td className="border-0 text-end">Institute / School</td>
                  <td className="border-0"><input type="text" className="form-control" placeholder="Institute / School" name="institute" value={detail.institute} onChange={(e) => handleEducationalDetailChange(index, e)} /></td>
                  <td className="border-0 text-end">Major / Department</td>
                  <td className="border-0"><input type="text" className="form-control" placeholder="Major / Department" name="major" value={detail.major} onChange={(e) => handleEducationalDetailChange(index, e)} /></td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">Degree</td>
                  <td className="border-0"><input type="text" className="form-control" placeholder="Degree" name="degree" value={detail.degree} onChange={(e) => handleEducationalDetailChange(index, e)} /></td>
                  <td className="border-0 text-end">Duration</td>
                  <td className="border-0">
                    <div className="d-flex">
                      <select className="form-select" name="durationStartMonth" value={detail.durationStartMonth} onChange={(e) => handleEducationalDetailChange(index, e)}>
                        <option>Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                      </select>
                      <select className="form-select" name="durationStartYear" value={detail.durationStartYear} onChange={(e) => handleEducationalDetailChange(index, e)}>
                        <option>Year</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                      </select>
                      <span className="mx-2">To</span>
                      <select className="form-select" name="durationEndMonth" value={detail.durationEndMonth} onChange={(e) => handleEducationalDetailChange(index, e)}>
                        <option>Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                      </select>
                      <select className="form-select" name="durationEndYear" value={detail.durationEndYear} onChange={(e) => handleEducationalDetailChange(index, e)}>
                        <option>Year</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">Currently Pursuing</td>
                  <td className="border-0">
                    <input className="form-check-input" type="checkbox" name="currentlyPursuing" checked={detail.currentlyPursuing} onChange={(e) => handleEducationalDetailChange(index, e)} />
                  </td>
                  <td className="border-0"></td>
                  <td className="border-0"></td>
                </tr>
              </React.Fragment>
            ))}
            <tr className="border">
              <th colSpan="4" className="border">
                <button type="button" className="btn btn-link text-primary" onClick={addEducationalDetail}>+ Add Educational Details</button>
              </th>
            </tr>

            {/* Experience, Attachment, etc. */}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateCandidateDynamicForm;