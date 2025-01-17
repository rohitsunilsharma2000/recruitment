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
      "postingTitle", "departmentName", "title", "hiringManager", "jobOpeningStatus", "jobType",
      "assignedRecruiter", "industry", "skills", "city", "province",
      "postalCode", "jobDescription", "requirements", "benefits",
    ];

    const requiredNumericFields = ["experience", "expectedSalary", "noOfPositions", "salary", "workExperience"];
    const requiredFileFields = ["resume", "coverLetter", "others", "offer", "contracts", "jobSummary", "otherAttachments"];
    const requiredDateFields = ["targetDate", "dateOpened"];

    // Text field validation
    if (requiredTextFields.includes(fieldName)) {
      // Ensure `value` is a string before calling `trim()`
      if (!value || typeof value !== 'string' || value.trim() === "") {
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
    else if (fieldName.startsWith("edu-") || fieldName.startsWith("exp-")) {
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