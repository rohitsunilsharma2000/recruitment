export const ValidationHelper = {
  // Validate a single field
  validateField: (fieldName, value, type) => {
    let error = ""; // Default no error

    // Define required text fields
    const requiredTextFields = [
      // General fields
      "firstName", "lastName", "email", "mobile", "phone", "website",
      "secondaryEmail", "street", "province", "city", "postalCode",
      "country", "currentJobTitle", "skillSet", "skypeId", "linkedin",
      "twitter", "facebook", "candidateStatus", "candidateOwner",

      // Create Job Opening fields
      "postingTitle", "departmentName", "title", "hiringManager",
      "assignedRecruiter", "skills", "city", "province",
      "postalCode", "jobDescription", "requirements", "benefits",
    ];

    const requiredNumericFields = ["experience", "expectedSalary", "noOfPositions", "salary", "experienceInYears"
      // , "workExperience"
    ];
    const requiredFileFields = ["resume", "coverLetter", "others", "offer", "contracts",
      "jobSummary", "otherAttachments"
    ];
    const requiredDateFields = ["targetDate", "dateOpened"];

    console.log("fieldName ",fieldName)
    console.log("value ",value)

    // Validate Rating (Ensure it's between 1 and 5)
    if (fieldName === "rating") {
      if (!value || isNaN(value) || value < 1 || value > 5) {
        error = "Please provide a valid rating between 1 and 5.";
      }
    }
  

    // Text field validation
    if (requiredTextFields.includes(fieldName)) {

      /**
       * Objective:
          When value is an object, we should not trigger an error.
          
         1. The error should only be triggered when value is neither a string nor an object.
         2.  If value is a string and is empty or contains only whitespace, it should trigger the error.
       */
      if (!value || (typeof value !== 'string' && typeof value !== 'object') || (typeof value === 'string' && value.trim() === "")) {

        error = `${fieldName.replace(/([A-Z])/g, " $1")} is required.`;
      }
    }
    // Numeric field validation
    else if (requiredNumericFields.includes(fieldName)) {
      if (!value || isNaN(value) || value <= 0) {
        error = `${fieldName.replace(/([A-Z])/g, " $1")} must be a positive number.`;
      }
    }
    // Date field validation
    else if (requiredDateFields.includes(fieldName)) {
      if (!value) {
        error = `${fieldName.replace(/([A-Z])/g, " $1")} is required.`;
      }
    }
    // Checkbox field validation
    else if (["emailOptOut", "remoteJob"].includes(fieldName) && type === "checkbox") {
      if (!value) {
        error = `You must accept ${fieldName.replace(/([A-Z])/g, " $1")}.`;
      }
    }
    // File field validation
    else if (requiredFileFields.includes(fieldName)) {
      if (!value || value.length === 0) {
        error = `Please upload a valid file for ${fieldName.replace(/([A-Z])/g, " $1")}.`;
      }
    }
    // Custom prefix validation (educational and experience fields)
    else if (fieldName.startsWith("edu-") || fieldName.startsWith("exp-") || fieldName.startsWith("comment-")) {
      if (typeof value === "string" && value.trim() === "") {
        error = `${fieldName.replace(/([A-Z])/g, " $1")} is required.`;
      }
    }

    

    return error;
  },

  // Get validation class
  getValidationClass: (fieldName, touchedFields, formErrors) => {
    if (!touchedFields[fieldName]) return ""; // No class if not touched
    return formErrors[fieldName] ? "is-invalid" : "is-valid";
  },

  // Get feedback class
  getFeedbackClass: (fieldName, touchedFields, formErrors) => {
    if (!touchedFields[fieldName]) return ""; // No class if not touched
    return formErrors[fieldName] ? "invalid-feedback" : "valid-feedback";
  },

  // Get feedback message
  getFeedbackMessage: (fieldName, touchedFields, formErrors) => {
    if (!touchedFields[fieldName]) return ""; // No message if not touched
    return formErrors[fieldName] || "Looks good!";
  },
};