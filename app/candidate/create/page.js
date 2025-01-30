"use client";
import React, { useEffect, useState } from "react";
import "../candidate.css";
import { ValidationHelper } from "@/components/form-validator/ValidationHelper";
import { createCandidate, fetchjobApplications, fetchJobApplicationsStatus, fetchJobResourceList, fetchLeads } from "@/utils/restClient";
import TypeAheadDropdown from "@/components/TypeAheadDropdown/TypeAheadDropdown";
import StatusMessage from "@/components/status-message/StatusMessage";
const CreateCandidateForm = () => {
  // Initial state for form data
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    phone: "",
    website: "",
    secondaryEmail: "",
    street: "",
    province: "",
    city: "",
    postalCode: "",
    country: "",
    // experience: "",
    currentJobTitle: "",
    expectedSalary: "",
    currentSalary: "",
    skillSet: "",
    skypeId: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    candidateStatus: "",
    candidateOwner: "",
    emailOptOut: false,
    resume: null,
    coverLetter: null,
    others: null,
    offer: null,
    contracts: null,
    currentJobTitle: "",
    currentEmployer: "",
    highestQualificationHeld: "",
    additionalInfo: "",
    source: "",//Job Reference Sources
    experienceInYears: ""
  };

  const educationalQualificationsList = [
    { "id": 1, "listValue": "High School Diploma" },
    { "id": 2, "listValue": "Bachelor of Arts in History" },
    { "id": 3, "listValue": "Bachelor of Science in Biology" },
    { "id": 4, "listValue": "Master of Science in Physics" },
    { "id": 5, "listValue": "Master of Arts in English" },
    { "id": 6, "listValue": "Doctor of Philosophy in Psychology" },
    { "id": 7, "listValue": "Associate Degree in Nursing" },
    { "id": 8, "listValue": "Diploma in Graphic Design" },
    { "id": 9, "listValue": "Bachelor of Business Administration" },
    { "id": 10, "listValue": "Master of Business Administration (MBA)" },
    { "id": 11, "listValue": "Bachelor of Engineering in Civil" },
    { "id": 12, "listValue": "Master of Technology in Computer Science" },
    { "id": 13, "listValue": "Certificate in Digital Marketing" },
    { "id": 14, "listValue": "Postgraduate Diploma in Management" },
    { "id": 15, "listValue": "Bachelor of Fine Arts" },
    { "id": 16, "listValue": "Doctor of Medicine (MD)" },
    { "id": 17, "listValue": "Bachelor of Science in Nursing" },
    { "id": 18, "listValue": "Master of Science in Environmental Science" },
    { "id": 19, "listValue": "Master of Arts in Political Science" },
    { "id": 20, "listValue": "Bachelor of Science in Information Technology" }
  ]


  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [candidateOwnerOptions, setCandidateOwner] = useState([]);
  const [statusCategories, setStatusCategories] = useState([]);
  const [searchToolboxData, setSearchToolboxData] = useState([]);
  const [jobResourceListData, setJobResourceListData] = useState([]);
  const [attachments, setAttachments] = useState([]);


  const [showErrorModal, setShowErrorModal] = useState(false); // State for controlling modal visibility

  // State for educational details
  const [educationalDetails, setEducationalDetails] = useState([
    {
      institute: "",
      major: "",
      degree: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      currentlyPursuing: false,
    },
  ]);

  // State for experience details
  const [experienceDetails, setExperienceDetails] = useState([
    {
      occupation: "",
      company: "",
      summary: "",
      // workDuration: "",

      workStartMonth: "",
      workStartYear: "",

      workEndMonth: "",
      workEndYear: "",

      currentlyWorking: false,
    },
  ]);






  // Helper function to get validation classes for fields
  const getValidationClass = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return ""; // No class if the field isn't touched
    }
    return formErrors[fieldName] ? "is-invalid" : "is-valid";
  };

  // Helper function to get feedback classes for validation messages
  const getFeedbackClass = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return ""; // No class if the field isn't touched
    }
    return formErrors[fieldName] ? "invalid-feedback" : "valid-feedback";
  };

  // Helper function to get feedback messages for fields
  const getFeedbackMessage = (fieldName) => {
    if (!touchedFields[fieldName]) {
      return ""; // No message if the field isn't touched
    }
    return formErrors[fieldName] || "Looks good!";
  };


  // Handler for changes in educational details
  const handleEducationChange = (index, field, value) => {
    console.log(
      `Updating educational detail at index ${index}, field ${field} with value: ${value}`
    );

    // const updatedDetails = educationalDetails.map((detail, idx) =>
    //   idx === index ? { ...detail, [field]: value } : detail
    // );
    // setEducationalDetails(updatedDetails);

    // Update educational details (asynchronously)
    setEducationalDetails((prevDetails) => {
      const updatedDetails = prevDetails.map((detail, idx) =>
        idx === index ? { ...detail, [field]: value } : detail
      );

      // Log the updated value based on field and index
      if (typeof value === "object" && value !== null) {
        // If value is an object (including arrays), stringify and log it
        console.log(
          `${field} at index ${index} : ${JSON.stringify(value, null, 2)}`
        );
      } else {
        // If value is a primitive (string, number, or boolean), log it directly
        console.log(`${field} at index ${index} : ${value}`);
      }

      // Log the updated educational details inside the setEducationalDetails callback
      console.log("Updated educationalDetails: ", updatedDetails);

      return updatedDetails;
    });

    const fieldKey = `edu-${index}-${field}`;
    setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));

    const error = ValidationHelper.validateField(fieldKey, value, typeof value);
    setFormErrors((prev) => ({ ...prev, [fieldKey]: error }));
  };

  // Handler for changes in experience details
  // const handleExperienceDetailsChange = (index, field, value) => {
  //   console.log(
  //     `Updating experience detail at index ${index}, field ${field} with value: ${value}`
  //   );
  //   const updatedDetails = experienceDetails.map((detail, idx) =>
  //     idx === index ? { ...detail, [field]: value } : detail
  //   );
  //   setExperienceDetails(updatedDetails);

  //   const fieldKey = `exp-${index}-${field}`;
  //   setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));

  //   const error = ValidationHelper.validateField(fieldKey, value, typeof value);
  //   setFormErrors((prev) => ({ ...prev, [fieldKey]: error }));
  // };
  const handleExperienceDetailsChange = (index, field, value) => {
    // Log the change of the field and its value
    if (typeof value === "object" && value !== null) {
      // If value is an object (including arrays), stringify and log it
      console.log(
        `${field} at index ${index} : ${JSON.stringify(value, null, 2)}`
      );
    } else {
      // If value is a primitive (string, number, or boolean), log it directly
      console.log(`${field} at index ${index} : ${value}`);
    }

    // Update experience details
    const updatedDetails = experienceDetails.map((detail, idx) =>
      idx === index ? { ...detail, [field]: value } : detail
    );

    // Log the updated experience details
    console.log("Updated experienceDetails: ", updatedDetails);

    // Set the updated experience details state
    setExperienceDetails(updatedDetails);

    // Update the touched fields state
    const fieldKey = `exp-${index}-${field}`;
    setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));

    // Validate the field and log any errors
    const error = ValidationHelper.validateField(fieldKey, value, typeof value);
    setFormErrors((prev) => ({ ...prev, [fieldKey]: error }));
  };

  // Add a new educational detail entry
  const addEducationalDetail = () => {
    console.log("Adding a new educational detail.");
    setEducationalDetails([
      ...educationalDetails,
      {
        institute: "",
        major: "",
        degree: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        currentlyPursuing: false,
      },
    ]);
  };



  // Function to convert month name to a number (e.g., January -> 01)
  function convertMonthToNumber(month) {
    const months = {
      "January": "01",
      "February": "02",
      "March": "03",
      "April": "04",
      "May": "05",
      "June": "06",
      "July": "07",
      "August": "08",
      "September": "09",
      "October": "10",
      "November": "11",
      "December": "12"
    };
    return months[month];
  }

  // Function to transform the education data
  function transformEducationData(data) {
    return data.map(item => {
      const startDate = `${item.startYear}-${convertMonthToNumber(item.startMonth)}`;
      const endDate = `${item.endYear}-${convertMonthToNumber(item.endMonth)}`;

      return {
        institute: item.institute,
        major: item.major,
        degree: item.degree,
        currentlyPursuing: item.currentlyPursuing,
        durationFrom: startDate,
        durationTo: endDate
      };
    });
  }

  function transformExperienceData(data) {
    return data.map(item => {
      const startDate = `${item.workStartYear}-${convertMonthToNumber(item.workStartMonth)}`;
      const endDate = `${item.workEndYear}-${convertMonthToNumber(item.workEndMonth)}`;

      return {
        occupation: item.occupation,
        company: item.company,
        summary: item.currentlyPursuing,
        currentlyWorkingHere: item.currentlyWorkingHere,
        durationFrom: startDate,
        durationTo: endDate
      };
    });
  }

  // Call the function to transform the data
  // const transformedData = transformEducationData(educationData);

  // // Log the transformed data
  // console.log(transformedData);


  // Add a new experience detail entry
  const addExperienceDetail = () => {
    console.log("Adding a new experience detail.");
    setExperienceDetails([
      ...experienceDetails,
      {
        occupation: "",
        company: "",
        summary: "",
        workDuration: "",
        workStartMonth: "",
        workStartYear: "",
        workEndMonth: "",
        workEndYear: "",
        currentlyWorking: false,
      },
    ]);
  };

  // Remove an experience detail entry
  const removeExperienceDetail = (index) => {
    console.log(`Removing experience detail at index ${index}.`);
    setExperienceDetails(experienceDetails.filter((_, idx) => idx !== index));
  };

  // Remove an educational detail entry
  const removeEducationalDetail = (index) => {
    console.log(`Removing educational detail at index ${index}.`);
    setEducationalDetails(educationalDetails.filter((_, idx) => idx !== index));
  };



  // Handle changes in general form inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const newValue =
      type === "file"
        ? files
          ? files[0]
          : null // Retrieve the first file
        : type === "checkbox"
          ? checked
          : value;

    // Log the new value (based on input type)
    if (type === "file" && files && files.length > 0) {
      const file = files[0]; // Get the selected file (assuming single file)
      console.log(name + " : " + file.name);  // Log the file name

      // Use setAttachments with the correct syntax
      setAttachments(prevAttachments => [
        ...prevAttachments,  // Keep the previous attachments
        {
          attachmentType: name,  // Dynamic name (e.g., "resume")
          filePath: "/attachments/resume/"  //for now HardCoded
        }
      ]);
    }
    else if (typeof newValue === "object" && newValue !== null) {
      // If newValue is an object (including arrays), stringify and log it
      console.log(name + " : " + JSON.stringify(newValue, null, 2));
    } else {
      // If newValue is a primitive (string, number, or boolean), log it directly
      console.log(name + " : " + newValue);
    }

    // setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Update form data (asynchronously)
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: newValue };
      // Log the updated form data inside the setFormData callback to see the result
      console.log("Updated formData: ", updatedFormData);
      return updatedFormData;
    });

    setTouchedFields((prev) => ({ ...prev, [name]: true }));

    const error = ValidationHelper.validateField(name, newValue, type);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  // async function createCandidateData() {
  //   try {
  //     const createCandidateOptions = await createCandidate();
  //     // Call the fetchCountries function

  //     console.log(
  //       "createCandidateOptionsWithId ",
  //       createCandidateOptionsWithId
  //     );
  //     setworkExperienceOptions(createCandidateOptionsWithId);
  //   } catch (error) {
  //     console.error("Failed to create Candidate:", error);
  //     setworkExperienceOptions([]);
  //     // Default to an empty array in case of error
  //   }
  // }

  // Submission state (you can use this to show a success message, etc.)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState(''); // State to track status (loading, success, error)
  const [errorMessage, setErrorMessage] = useState('');


  async function createCandidateData(payload) {
    setStatus('loading');
    try {
      const createCandidateResponse = await createCandidate(payload);
      setStatus('success');
      console.log("createCandidateOptionsWithId ", createCandidateResponse);
    } catch (error) {

      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'An unexpected error occurred';
      console.error("Failed to create Candidate:", errorMessage);
      setStatus('error');
      setErrorMessage(errorMessage);
    } finally {
      // setTimeout(() => {
      //   setStatus('');
      //   setErrorMessage('');
      // }, 10000);
    }
  }

  // Helper function to get all invalid feedback messages
  const getInvalidFeedbackMessages = () => {
    return Object.keys(formErrors).reduce((messages, fieldName) => {
      // If the field has an error, get the feedback message
      if (formErrors[fieldName]) {
        messages.push(getFeedbackMessage(fieldName)); // Collect the feedback message
      }
      return messages;
    }, []);
  };

  const invalidMessages = getInvalidFeedbackMessages();


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submission started.");

    let valid = true;
    const newErrors = {};
    const touched = {};

    // Validate formData
    Object.keys(formData).forEach((field) => {
      const error = ValidationHelper.validateField(
        field,
        formData[field],
        typeof formData[field]
      );
      if (error) valid = false;
      newErrors[field] = error;
      touched[field] = true;
    });

    setFormErrors(newErrors);
    setTouchedFields(touched);
    const payload = buildCreateCandidatePayload();
    console.log("payload ", payload);

    if (valid) {
      const finalData = {
        ...formData,
        educationalDetails,
        experienceDetails,
      };
      // Build the payload dynamically using the helper function
      createCandidateData(payload);

      console.log("Form submitted successfully with data:", finalData);
      alert("Form submitted successfully!");
    } else {
      // Usage example:
      // console.log("Invalid Feedback Messages:", invalidMessages);

      console.log(
        "Form submission failed due to validation errors.",
        invalidMessages
      );
      // If validation fails, show the error modal
      setShowErrorModal(true); // Display the modal

    }
  };

  const buildCreateCandidatePayload = () => {
    // Initialize the payload object
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      secondaryEmail: formData.secondaryEmail,
      phone: formData.phone,
      mobile: formData.mobile,
      fax: "123-456-789",
      website: formData.website,
      addressInformation: {
        city: formData.city,
        province: formData.province,
        country: formData.country,
        postalCode: formData.postalCode,
      },
      experienceInYears: formData.experienceInYears,
      currentJobTitle: formData.currentJobTitle,
      expectedSalary: formData.expectedSalary,
      currentSalary: formData.currentSalary,
      currentEmployer: formData.currentEmployer,
      highestQualificationHeld: formData.highestQualificationHeld.listValue,
      additionalInfo: formData.additionalInfo,
      skypeId: formData.skypeId,
      skillSet: [...formData.skillSet],
      linkedIn: formData.linkedin,
      twitter: formData.twitter,
      facebook: formData.facebook,
      candidateStatus: formData.candidateStatus.listValue,
      candidateOwnerId: formData.candidateOwner.id,
      source: formData.source.listValue,
      optOut: formData.optOut,
      educationalDetails: transformEducationData(educationalDetails),
      experienceDetails: transformExperienceData(experienceDetails),
      attachments: attachments,
    };

    return payload;
  };


  // Helper function to generate status options
  // Flatten all status options and assign an id to each status
  const getAllStatusesOptions = (statusCategories) => {
    return Object.entries(statusCategories).flatMap(([category, statuses]) =>
      statuses.map((status, index) => ({
        id: `${category}-${index}`, // Generate a unique ID (combining category and index)
        listValue: status
      }))
    );
  };

  // Render the form (Add JSX for rendering form inputs as required)
  useEffect(() => {


    async function fetchJobApplicationsStatusData() {
      try {
        const response = await fetchJobApplicationsStatus();
        // console.log("fetchJobApplicationsStatus ", response)
        const allCategories = getAllStatusesOptions(response);
        setStatusCategories(allCategories); // Set the array of departments names into state
      } catch (error) {
        setStatusCategories([]);
      }
    }

    async function fetchCandidateOwnerData() {
      try {
        const response = await fetchLeads();
        console.log("Extracted candidate Owner   response : ", response);

        const recruters = response
          .filter((user) => user.role.name === ("Recruiter" || "Hiring Manager"))
          .map((user) => ({
            id: user.id,
            listValue: user.firstName + " " + user.lastName
          }));
        // console.log("Extracted candidate Owner data : ", recruters);
        setCandidateOwner(recruters); // Set the array of departments names into state
        console.log("Candidate Owner have been set into state");
        console.log("Extracted candidate Owner data : ", recruters);

      } catch (error) {
        console.error("Failed to fetch  candidate Owner data :", error);
        setCandidateOwner([]);
        console.log("Setting empty recruiters array due to error");
      }
    }

    async function fetchJobResourceListData() {
      try {
        const response = await fetchJobResourceList(); // Fetch data from the API
        const resourceList = response
          .map((resource, index) => ({
            id: index + 1,
            listValue: resource
          }));
        console.log("fetched job resource list data:", response); // Log the response for debugging
        setJobResourceListData(resourceList); // Store the response data in state
      } catch (error) {
        setJobResourceListData([]); // Set an empty array in case of error
      }
    }

    fetchJobResourceListData();

    fetchCandidateOwnerData();
    fetchJobApplicationsStatusData();

  }, []);
  return (
    <div className="container ">


      <nav
        className="navbar navbar-expand-lg p-3"
        style={{ backgroundColor: "#e3f2fd" }}
      >


        {/* Bootstrap Modal for errors */}
        {showErrorModal && (
          <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }} aria-hidden="false">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Validation Errors</h5>
                  <button type="button" className="close" onClick={() => setShowErrorModal(false)} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul>
                    {invalidMessages.length > 0 ? (
                      invalidMessages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                      ))
                    ) : (
                      <li>No validation errors found.</li>
                    )}
                  </ul>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowErrorModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        )}




        <div className="container-fluid">
          <span className="navbar-brand">
            <b> Create Candidate</b>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            {/* Add your new content here */}
            <div className="d-flex justify-content-end gap-3 mt-1">
              <button type="button" className="btn-sm btn btn-secondary">
                Cancel
              </button>
              <button
                type="submit"
                className="btn-sm btn btn-primary"
                onClick={handleSubmit}
              >
                Save and Publish
              </button>
            </div>
          </div>
        </div>

      </nav>
      {/* Use the StatusMessage component */}
      <StatusMessage status={status} errorMessage={errorMessage} />
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handleSubmit}>
            {/* ACTIONS */}

            <table className="table table-bordered">
              <tbody>
                <tr className="border">
                  <th colSpan="4" className="border">
                    Basic Info
                  </th>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "firstName"
                      )}`}
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("firstName")}>
                      {getFeedbackMessage("firstName")}
                    </div>
                  </td>
                  <td className="border-0 text-end">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "lastName"
                      )}`}
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("lastName")}>
                      {getFeedbackMessage("lastName")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "email"
                      )}`}
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("email")}>
                      {getFeedbackMessage("email")}
                    </div>
                  </td>
                  <td className="border-0 text-end">
                    <label htmlFor="mobile" className="form-label">
                      Mobile
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "mobile"
                      )}`}
                      id="mobile"
                      name="mobile"
                      placeholder="Mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("mobile")}>
                      {getFeedbackMessage("mobile")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "phone"
                      )}`}
                      id="phone"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("phone")}>
                      {getFeedbackMessage("phone")}
                    </div>
                  </td>
                  <td className="border-0 text-end">
                    <label htmlFor="website" className="form-label">
                      Website
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "website"
                      )}`}
                      id="website"
                      name="website"
                      placeholder="Website"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("website")}>
                      {getFeedbackMessage("website")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="secondaryEmail" className="form-label">
                      Secondary Email
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "secondaryEmail"
                      )}`}
                      id="secondaryEmail"
                      name="secondaryEmail"
                      placeholder="SecondaryEmail"
                      value={formData.secondaryEmail}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("secondaryEmail")}>
                      {getFeedbackMessage("secondaryEmail")}
                    </div>
                  </td>
                  <td colSpan={2} className="border-0 "></td>
                </tr>
                <tr className="border">
                  <th colSpan="4" className="border">
                    Address Information
                  </th>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="street" className="form-label">
                      Street
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "street"
                      )}`}
                      id="street"
                      name="street"
                      placeholder="Street"
                      value={formData.street}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("street")}>
                      {getFeedbackMessage("street")}
                    </div>
                  </td>
                  <td className="border-0 text-end">
                    <label htmlFor="province" className="form-label">
                      Province
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "province"
                      )}`}
                      id="province"
                      name="province"
                      placeholder="Province"
                      value={formData.province}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("province")}>
                      {getFeedbackMessage("province")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "city"
                      )}`}
                      id="city"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("city")}>
                      {getFeedbackMessage("city")}
                    </div>
                  </td>
                  <td className="border-0 text-end">
                    <label htmlFor="postalCode" className="form-label">
                      Postal Code
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "postalCode"
                      )}`}
                      id="postalCode"
                      name="postalCode"
                      placeholder="PostalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("postalCode")}>
                      {getFeedbackMessage("postalCode")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="country"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "country"
                      )}`}
                      id="country"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("country")}>
                      {getFeedbackMessage("country")}
                    </div>
                  </td>
                  <td className="border-0"></td>
                  <td className="border-0"></td>
                </tr>
                <tr className="border-0">
                  <th colSpan="4" className="border-bottom">
                    Professional Details
                  </th>
                </tr>

                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="experience" className="form-label">
                      Experience in Years
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="number"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "experienceInYears"
                      )}`}
                      id="experienceInYears"
                      name="experienceInYears"
                      placeholder="experienceInYears"
                      value={formData.experienceInYears}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("experienceInYears")}>
                      {getFeedbackMessage("experienceInYears")}
                    </div>
                  </td>




                  <td className="border-0 text-end">
                    <label htmlFor="currentJobTitle" className="form-label">
                      Current Job Title
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "currentJobTitle"
                      )}`}
                      id="currentJobTitle"
                      name="currentJobTitle"
                      placeholder=" Current Job Title"
                      value={formData.currentJobTitle}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("currentJobTitle")}>
                      {getFeedbackMessage("currentJobTitle")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="expectedSalary" className="form-label">
                      Expected Salary
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="number"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "expectedSalary"
                      )}`}
                      id="expectedSalary"
                      name="expectedSalary"
                      placeholder=" Expected Salary"
                      value={formData.expectedSalary}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("expectedSalary")}>
                      {getFeedbackMessage("expectedSalary")}
                    </div>
                  </td>

                  <td className="border-0 text-end">
                    <label htmlFor="skillSet" className="form-label">
                      Skill Set
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "skillSet"
                      )}`}
                      id="skillSet"
                      name="skillSet"
                      placeholder=" skillSet"
                      value={formData.skillSet}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("skillSet")}>
                      {getFeedbackMessage("skillSet")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="skypeId" className="form-label">
                      Skype ID
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "skypeId"
                      )}`}
                      id="skypeId"
                      name="skypeId"
                      placeholder=" skypeId"
                      value={formData.skypeId}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("skypeId")}>
                      {getFeedbackMessage("skypeId")}
                    </div>
                  </td>
                  <td className="border-0 text-end">
                    <label htmlFor="currentSalary" className="form-label">
                      currentSalary
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="number"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "currentSalary"
                      )}`}
                      id="currentSalary"
                      name="currentSalary"
                      placeholder=" currentSalary"
                      value={formData.currentSalary}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("currentSalary")}>
                      {getFeedbackMessage("currentSalary")}
                    </div>
                  </td>
                </tr>
                {/* Start  */}
                <tr className="border-0">

                  {/* left input */}
                  <td className="border-0 text-end">
                    <label htmlFor="skypeId" className="form-label">
                      Current Employer
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "currentEmployer"
                      )}`}
                      id="currentEmployer"
                      name="currentEmployer"
                      placeholder=" currentEmployer"
                      value={formData.currentEmployer}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("currentEmployer")}>
                      {getFeedbackMessage("currentEmployer")}
                    </div>
                  </td>

                  {/* right input */}
                  <td className="border-0 text-end">
                    <label htmlFor="skypeId" className="form-label">
                      Highest Qualification held
                    </label>
                  </td>
                  <td className="border-0">
                    {/* <input
                      type="number"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "highestQualificationHeld"
                      )}`}
                      id="highestQualificationHeld"
                      name="highestQualificationHeld"
                      placeholder=" highestQualificationHeld"
                      value={formData.highestQualificationHeld}
                      onChange={handleInputChange}
                    /> */}
                    <TypeAheadDropdown
                      id="highestQualificationHeld"
                      name="highestQualificationHeld"
                      options={educationalQualificationsList}
                      selectedValue={formData.highestQualificationHeld}
                      placeholder="Choose a Qualification"
                      onSelect={(selectedOption) => setFormData((prev) => ({
                        ...prev,
                        highestQualificationHeld: selectedOption,
                      }))}
                      value={formData.highestQualificationHeld}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass(
                        "highestQualificationHeld"
                      )}`}
                      getValidationclassName={getValidationClass} />
                    <div className={getFeedbackClass("highestQualificationHeld")}>
                      {getFeedbackMessage("highestQualificationHeld")}
                    </div>
                  </td>

                </tr>

                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="skypeId" className="form-label">
                      Additional Info
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "additionalInfo"
                      )}`}
                      id="additionalInfo"
                      name="additionalInfo"
                      placeholder=" additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("additionalInfo")}>
                      {getFeedbackMessage("additionalInfo")}
                    </div>
                  </td>
                </tr>

                {/* end */}

                <tr className="border-0">
                  <th colSpan="4" className="border-bottom">
                    Social Links
                  </th>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="linkedin" className="form-label">
                      LinkedIn
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "linkedin"
                      )}`}
                      id="linkedin"
                      name="linkedin"
                      placeholder=" linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("linkedin")}>
                      {getFeedbackMessage("linkedin")}
                    </div>
                  </td>
                  <td className="border-0 text-end">
                    <label htmlFor="twitter" className="form-label">
                      Twitter
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "twitter"
                      )}`}
                      id="twitter"
                      name="twitter"
                      placeholder=" twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("twitter")}>
                      {getFeedbackMessage("twitter")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="facebook" className="form-label">
                      Facebook
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "facebook"
                      )}`}
                      id="facebook"
                      name="facebook"
                      placeholder=" facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("facebook")}>
                      {getFeedbackMessage("facebook")}
                    </div>
                  </td>
                  <td className="border-0"></td>
                  <td className="border-0"></td>
                </tr>

                <tr className="border-0">
                  <th colSpan="4" className="border-bottom">
                    Other Info
                  </th>
                </tr>
                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="candidateStatus" className="form-label">
                      Candidate Status
                    </label>
                  </td>
                  <td className="border-0">
                    {/* <input
                      type="text"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "candidateStatus"
                      )}`}
                      id="candidateStatus"
                      name="candidateStatus"
                      placeholder=" candidateStatus"
                      value={formData.candidateStatus}
                      onChange={handleInputChange}
                    /> */}
                    <TypeAheadDropdown
                      id="candidateStatus"
                      name="candidateStatus"
                      options={statusCategories}
                      selectedValue={formData.candidateStatus}
                      placeholder="Choose a candidateStatus"
                      onSelect={(selectedOption) => setFormData((prev) => ({
                        ...prev,
                        candidateStatus: selectedOption,
                      }))}
                      value={formData.candidateStatus}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass(
                        "candidateStatus"
                      )}`}
                      getValidationclassName={getValidationClass} />

                    <div className={getFeedbackClass("candidateStatus")}>
                      {getFeedbackMessage("candidateStatus")}
                    </div>
                  </td>
                  <td className="border-0 text-end">
                    <label htmlFor="candidateOwner" className="form-label">
                      Candidate Owner
                    </label>
                  </td>
                  <td className="border-0">


                    <TypeAheadDropdown
                      id="candidateOwner"
                      name="candidateOwner"
                      options={candidateOwnerOptions}
                      selectedValue={formData.candidateOwner}
                      placeholder="Choose a candidateOwner"
                      onSelect={(selectedOption) => setFormData((prev) => ({
                        ...prev,
                        candidateOwner: selectedOption,
                      }))}
                      value={formData.candidateOwner}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass(
                        "candidateOwner"
                      )}`}
                      getValidationclassName={getValidationClass} />

                    <div className={getFeedbackClass("candidateOwner")}>
                      {getFeedbackMessage("candidateOwner")}
                    </div>
                  </td>
                </tr>


                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="skypeId" className="form-label">
                      Source / Job Search Toolbox
                    </label>
                  </td>
                  <td className="border-0">
                    <TypeAheadDropdown
                      id="source"
                      name="source"
                      options={jobResourceListData}
                      selectedValue={formData.source}
                      placeholder="Choose a source"
                      onSelect={(selectedOption) => setFormData((prev) => ({
                        ...prev,
                        source: selectedOption,
                      }))}
                      value={formData.source}
                      onChange={handleInputChange}
                      className={`form-select form-select-sm small-placeholder ${getValidationClass(
                        "source"
                      )}`}
                      getValidationclassName={getValidationClass} />

                    <div className={getFeedbackClass("source")}>
                      {getFeedbackMessage("source")}
                    </div>
                  </td>
                </tr>

                <tr className="border-0">
                  <td className="border-0 text-end">
                    <label htmlFor="emailOptOut" className="form-label">
                      Email Opt Out
                    </label>
                  </td>
                  <td className="border-0">
                    <input
                      type="checkbox"
                      className={`form-check-input ${getValidationClass(
                        "emailOptOut"
                      )}`}
                      id="emailOptOut"
                      name="emailOptOut"
                      checked={formData.emailOptOut}
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("emailOptOut")}>
                      {getFeedbackMessage("emailOptOut")}
                    </div>
                  </td>
                  <td className="border-0"></td>
                  <td className="border-0"></td>
                </tr>

                {/* EDUCATIONAL DETAILS */}

                <tr className="border">
                  <th colSpan="4" className="border">
                    Educational Details
                  </th>
                </tr>
                {educationalDetails.map((detail, index) => (
                  <React.Fragment key={index}>
                    <tr className="border-0">
                      <td colSpan="4" className="border-0  text-center">
                        <p>
                          {
                            index === 0
                              ? "10th"
                              : index === 1
                                ? "12th or Diploma"
                                : index === 2
                                  ? "Graduation"
                                  : index === 3
                                    ? "Postgraduation"
                                    : index === 4
                                      ? "PhD"
                                      : `Others - ${index - 4}` // Dynamically calculate "Others - {index-4}" for index > 4
                          }
                        </p>
                      </td>
                    </tr>
                    <tr className="border-0">
                      <td className="border-0 text-end">
                        <label
                          htmlFor={`edu-${index}-institute`}
                          className="form-label"
                          style={{
                            position: "relative",
                          }}
                        >
                          Institute / School
                          <span
                            type="button"
                            className="btn btn   btn-outline-secondary  rounded-pill"
                            style={{
                              position: "absolute",
                              top: 12,
                              left: "-31%",
                              transform: "translate(-50%, -50%)",
                              width: "2rem",
                              height: "2rem",
                            }}
                          >
                            {index + 1}
                          </span>
                          <div
                            className="d-flex"
                            style={{
                              position: "absolute",
                              top: 62,
                              left: "-14%",
                              transform: "translate(-50%, -50%)",
                              width: "2rem",
                              height: "4rem",
                            }}
                          >
                            <div className="vr"></div>
                          </div>
                          <span
                            type="button"
                            className="btn btn    btn-outline-danger rounded-pill"
                            style={{
                              position: "absolute",
                              top: 113,
                              left: "-31%",
                              transform: "translate(-50%, -50%)",
                              width: "2rem",
                              height: "2rem",
                            }}
                            onClick={() => removeEducationalDetail(index)}
                          >
                            <i className="bi bi-trash  fs-6"></i>
                          </span>
                        </label>
                      </td>
                      <td className="border-0">
                        <input
                          type="text"
                          className={`form-control form-control-sm small-placeholder ${getValidationClass(
                            `edu-${index}-institute`
                          )}`}
                          id={`edu-${index}-institute`}
                          name="institute"
                          placeholder="institute"
                          value={detail.institute}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "institute",
                              e.target.value
                            )
                          }
                        />
                        <div
                          className={getFeedbackClass(`edu-${index}-institute`)}
                        >
                          {getFeedbackMessage(`edu-${index}-institute`)}
                        </div>
                      </td>
                      <td className="border-0 text-end">
                        <label
                          htmlFor={`edu-${index}-major`}
                          className="form-label"
                        >
                          Major / Department
                        </label>
                      </td>
                      <td className="border-0">
                        <input
                          type="text"
                          className={`form-control form-control-sm small-placeholder ${getValidationClass(
                            `edu-${index}-major`
                          )}`}
                          id={`edu-${index}-major`}
                          name="major"
                          placeholder="Major"
                          value={detail.major}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "major",
                              e.target.value
                            )
                          }
                        />
                        <div className={getFeedbackClass(`edu-${index}-major`)}>
                          {getFeedbackMessage(`edu-${index}-major`)}
                        </div>
                      </td>
                    </tr>
                    <tr className="border-0">
                      <td className="border-0 text-end">
                        <label
                          htmlFor={`edu-${index}-degree`}
                          className="form-label"
                        >
                          {index === 0
                            ? "10th"
                            : index === 1
                              ? "12th or Diploma"
                              : index === 2
                                ? "Graduation"
                                : index === 3
                                  ? "Postgraduation"
                                  : index === 4
                                    ? "PhD"
                                    : "Others"}
                        </label>
                      </td>
                      <td className="border-0">
                        <input
                          type="text"
                          className={`form-control form-control-sm small-placeholder ${getValidationClass(
                            `edu-${index}-degree`
                          )}`}
                          id={`edu-${index}-degree`}
                          name="degree"
                          placeholder="Degree"
                          value={detail.degree}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "degree",
                              e.target.value
                            )
                          }
                        />
                        <div
                          className={getFeedbackClass(`edu-${index}-degree`)}
                        >
                          {getFeedbackMessage(`edu-${index}-degree`)}
                        </div>
                      </td>
                    </tr>
                    <tr className="border-0 ">
                      <td className="border-0 text-end">
                        <label
                          htmlFor={`edu-${index}-currentlyPursuing`}
                          className="form-label"
                        >
                          Need to change
                        </label>
                      </td>
                      <td className="border-0">
                        <div className="d-flex">
                          <div className="d-flex flex-column me-2 flex-fill">
                            <select
                              className={`form-control form-control-sm ${getValidationClass(
                                `edu-${index}-startMonth`
                              )}`}
                              id={`edu-${index}-startMonth`}
                              name="startMonth"
                              value={detail.startMonth}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "startMonth",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Month</option>
                              <option>January</option>
                              <option>February</option>
                              <option>March</option>
                            </select>
                            <div
                              className={getFeedbackClass(
                                `edu-${index}-startMonth`
                              )}
                            >
                              {getFeedbackMessage(`edu-${index}-startMonth`)}
                            </div>
                          </div>
                          <div className="d-flex flex-column me-2 flex-fill">
                            <select
                              className={`form-control form-control-sm ${getValidationClass(
                                `edu-${index}-startYear`
                              )}`}
                              id={`edu-${index}-startYear`}
                              name="startYear"
                              value={detail.startYear}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "startYear",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Year</option>
                              <option>2020</option>
                              <option>2021</option>
                              <option>2022</option>
                            </select>
                            <div
                              className={getFeedbackClass(
                                `edu-${index}-startYear`
                              )}
                            >
                              {getFeedbackMessage(`edu-${index}-startYear`)}
                            </div>
                          </div>
                          <span className="mx-2">To</span>
                          <div className="d-flex flex-column me-2 flex-fill">
                            <select
                              className={`form-control form-control-sm ${getValidationClass(
                                `edu-${index}-endMonth`
                              )}`}
                              id={`edu-${index}-endMonth`}
                              name="endMonth"
                              value={detail.endMonth}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "endMonth",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Month</option>
                              <option>January</option>
                              <option>February</option>
                              <option>March</option>
                            </select>
                            <div
                              className={getFeedbackClass(
                                `edu-${index}-endMonth`
                              )}
                            >
                              {getFeedbackMessage(`edu-${index}-endMonth`)}
                            </div>
                          </div>
                          <div className="d-flex flex-column flex-fill">
                            <select
                              className={`form-control form-control-sm ${getValidationClass(
                                `edu-${index}-endYear`
                              )}`}
                              id={`edu-${index}-endYear`}
                              name="endYear"
                              value={detail.endYear}
                              onChange={(e) =>
                                handleEducationChange(
                                  index,
                                  "endYear",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Year</option>
                              <option>2020</option>
                              <option>2021</option>
                              <option>2022</option>
                            </select>
                            <div
                              className={getFeedbackClass(
                                `edu-${index}-endYear`
                              )}
                            >
                              {getFeedbackMessage(`edu-${index}-endYear`)}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-0">
                      <td className="border-0 text-end">
                        <label
                          htmlFor={`edu-${index}-currentlyPursuing`}
                          className="form-label"
                        >
                          Currently Pursuing
                        </label>
                      </td>
                      <td className="border-0">
                        <input
                          type="checkbox"
                          className={`form-check-input ${getValidationClass(
                            `edu-${index}-currentlyPursuing`
                          )}`}
                          id={`edu-${index}-currentlyPursuing`}
                          name={`edu-${index}-currentlyPursuing`}
                          checked={formData.currentlyPursuing}
                          onChange={handleInputChange}
                        />
                        <div
                          className={getFeedbackClass(
                            `edu-${index}-currentlyPursuing`
                          )}
                        >
                          {getFeedbackMessage(`edu-${index}-currentlyPursuing`)}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}

                <tr className="border">
                  <th colSpan="4" className="border">
                    <button
                      className="btn-sm btn btn-link text-primary"
                      type="button"
                      onClick={addEducationalDetail}
                    >
                      + Add Educational Details
                    </button>
                  </th>
                </tr>

                <tr className="border">
                  <th colSpan="4" className="border">
                    Experience Details
                  </th>
                </tr>
                {experienceDetails.map((expDetail, index) => (
                  <React.Fragment key={index}>
                    <tr className="border-0">
                      <td className="text-end border-0">
                        <label
                          htmlFor={`exp-${index}-occupation`}
                          className="form-label"
                          style={{
                            position: "relative",
                          }}
                        >
                          Occupation / Title
                          <span
                            type="button"
                            className="btn btn   btn-outline-secondary  rounded-pill"
                            style={{
                              position: "absolute",
                              top: 12,
                              left: "-31%",
                              transform: "translate(-50%, -50%)",
                              width: "2rem",
                              height: "2rem",
                            }}
                          >
                            {index + 1}
                          </span>
                          <div
                            className="d-flex"
                            style={{
                              position: "absolute",
                              top: 62,
                              left: "-14%",
                              transform: "translate(-50%, -50%)",
                              width: "2rem",
                              height: "4rem",
                            }}
                          >
                            <div className="vr"></div>
                          </div>
                          <span
                            type="button"
                            className="btn btn    btn-outline-danger rounded-pill"
                            style={{
                              position: "absolute",
                              top: 113,
                              left: "-31%",
                              transform: "translate(-50%, -50%)",
                              width: "2rem",
                              height: "2rem",
                            }}
                            onClick={() => removeExperienceDetail(index)}
                          >
                            <i className="bi bi-trash  fs-6"></i>
                          </span>
                        </label>
                      </td>
                      <td className="border-0" colSpan="3">
                        <input
                          type="text"
                          className={`form-control form-control-sm small-placeholder ${getValidationClass(
                            `exp-${index}-occupation`
                          )}`}
                          id={`exp-${index}-occupation`}
                          name="occupation"
                          placeholder="occupation"
                          value={expDetail.occupation}
                          onChange={(e) =>
                            handleExperienceDetailsChange(
                              index,
                              "occupation",
                              e.target.value
                            )
                          }
                        />
                        <div
                          className={getFeedbackClass(
                            `exp-${index}-occupation`
                          )}
                        >
                          {getFeedbackMessage(`exp-${index}-occupation`)}
                        </div>
                      </td>
                    </tr>
                    <tr className="border-0">
                      <td className="text-end border-0">
                        <label htmlFor="company" className="form-label">
                          Company
                        </label>
                      </td>
                      <td className="border-0" colSpan="3">
                        <input
                          type="text"
                          className={`form-control form-control-sm small-placeholder ${getValidationClass(
                            `exp-${index}-company`
                          )}`}
                          id={`exp-${index}-company`}
                          name="company"
                          placeholder="company"
                          value={expDetail.company}
                          onChange={(e) =>
                            handleExperienceDetailsChange(
                              index,
                              "company",
                              e.target.value
                            )
                          }
                        />
                        <div
                          className={getFeedbackClass(`exp-${index}-company`)}
                        >
                          {getFeedbackMessage(`exp-${index}-company`)}
                        </div>
                      </td>
                    </tr>
                    <tr className="border-0">
                      <td className="text-end border-0">
                        <label htmlFor="summary" className="form-label">
                          Summary
                        </label>
                      </td>
                      <td className="border-0" colSpan="3">
                        <input
                          type="text"
                          className={`form-control form-control-sm small-placeholder ${getValidationClass(
                            `exp-${index}-summary`
                          )}`}
                          id={`exp-${index}-summary`}
                          name="summary"
                          placeholder="summary"
                          value={expDetail.summary}
                          onChange={(e) =>
                            handleExperienceDetailsChange(
                              index,
                              "summary",
                              e.target.value
                            )
                          }
                        />
                        <div
                          className={getFeedbackClass(`exp-${index}-summary`)}
                        >
                          {getFeedbackMessage(`exp-${index}-summary`)}
                        </div>
                      </td>
                    </tr>
                    <tr className="border-0">
                      <td className="text-end border-0">
                        <label htmlFor="workDuration" className="form-label">
                          Work Duration
                        </label>
                      </td>
                      <td className="border-0">
                        <div className="d-flex">
                          <select
                            className={`form-control form-control-sm ${getValidationClass(
                              `exp-${index}-workStartMonth`
                            )}`}
                            id={`exp-${index}-workStartMonth`}
                            name="workStartMonth"
                            value={formData.startMonth}
                            onChange={(e) =>
                              handleExperienceDetailsChange(
                                index,
                                "workStartMonth",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                          </select>
                          <div className={getFeedbackClass("workStartMonth")}>
                            {getFeedbackMessage("workStartMonth")}
                          </div>

                          <select
                            className={`form-control form-control-sm ${getValidationClass(
                              `exp-${index}-workStartYear`
                            )}`}
                            id={`exp-${index}-workStartYear`}
                            name="workStartYear"
                            value={formData.workStartYear}
                            onChange={(e) =>
                              handleExperienceDetailsChange(
                                index,
                                "workStartYear",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Year</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                          </select>

                          <span className="mx-2">To</span>

                          <select
                            className={`form-control form-control-sm ${getValidationClass(
                              `exp-${index}-workEndMonth`
                            )}`}
                            id={`exp-${index}-workEndMonth`}
                            name="endMonth"
                            value={formData.workEndMonth}
                            onChange={(e) =>
                              handleExperienceDetailsChange(
                                index,
                                "workEndMonth",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                          </select>

                          <div
                            className={getFeedbackClass(
                              `edu-${index}-endMonth`
                            )}
                          >
                            {getFeedbackMessage(`edu-${index}-endMonth`)}
                          </div>
                          <select
                            className={`form-control form-control-sm ${getValidationClass(
                              `exp-${index}-workEndYear`
                            )}`}
                            id={`exp-${index}-workEndYear`}
                            name="endMonth"
                            value={formData.workEndMonth}
                            onChange={(e) =>
                              handleExperienceDetailsChange(
                                index,
                                "workEndYear",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Year</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            {/* Add other years if necessary */}
                          </select>

                          <div className={getFeedbackClass("workEndYear")}>
                            {getFeedbackMessage("workEndYear")}
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr className="border-0">
                      <td className="text-end border-0">
                        <label
                          htmlFor="currentlyWorkingHere"
                          className="form-label"
                        >
                          I currently work here
                        </label>
                      </td>
                      <td className="border-0" colSpan="3">
                        <input
                          className={`form-check-input ${getValidationClass(
                            "currentlyWorkingHere"
                          )}`}
                          type="checkbox"
                          id="currentlyWorkingHere"
                          name="currentlyWorkingHere"
                          checked={formData.currentlyWorkingHere}
                          onChange={handleExperienceDetailsChange}
                        />
                        <div className={getFeedbackClass("currentlyWorkingHere")}>
                          {getFeedbackMessage("currentlyWorkingHere")}
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}

                <tr className="border">
                  <th colSpan="4" className="border">
                    <button
                      className="btn-sm btn btn-link text-primary"
                      type="button"
                      onClick={addExperienceDetail}
                    >
                      + Add Experience
                    </button>
                  </th>
                </tr>

                <tr className="border">
                  <th colSpan="4" className="border">
                    Attachment Information
                  </th>
                </tr>
                <tr className="border-0">
                  <td className="text-end border-0">Resume</td>
                  <td className="border-0">
                    <input
                      type="file"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "resume"
                      )}`}
                      id="resume"
                      name="resume"
                      placeholder=" resume"
                      defaultValue={formData.resume || ""} // Use defaultValue instead of value
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("resume")}>
                      {getFeedbackMessage("resume")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="text-end border-0">Cover Letter</td>
                  <td className="border-0">
                    <input
                      type="file"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "coverLetter"
                      )}`}
                      id="coverLetter"
                      name="coverLetter"
                      placeholder=" coverLetter"
                      defaultValue={formData.coverLetter || ""} // Use defaultValue instead of value
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("coverLetter")}>
                      {getFeedbackMessage("coverLetter")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="text-end border-0">Others</td>
                  <td className="border-0">
                    <input
                      type="file"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "others"
                      )}`}
                      id="others"
                      name="others"
                      placeholder=" others"
                      defaultValue={formData.others || ""} // Use defaultValue instead of value
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("others")}>
                      {getFeedbackMessage("others")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="text-end border-0">Offer</td>
                  <td className="border-0">
                    <input
                      type="file"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "offer"
                      )}`}
                      id="offer"
                      name="offer"
                      placeholder=" offer"
                      defaultValue={formData.offer || ""} // Use defaultValue instead of value
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("offer")}>
                      {getFeedbackMessage("offer")}
                    </div>
                  </td>
                </tr>
                <tr className="border-0">
                  <td className="text-end border-0">Contracts</td>
                  <td className="border-0">
                    <input
                      type="file"
                      className={`form-control form-control-sm small-placeholder ${getValidationClass(
                        "contracts"
                      )}`}
                      id="contracts"
                      name="contracts"
                      placeholder=" contracts"
                      defaultValue={formData.contracts || ""} // Use defaultValue instead of value
                      onChange={handleInputChange}
                    />
                    <div className={getFeedbackClass("contracts")}>
                      {getFeedbackMessage("contracts")}
                    </div>
                  </td>
                </tr>




              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCandidateForm;
