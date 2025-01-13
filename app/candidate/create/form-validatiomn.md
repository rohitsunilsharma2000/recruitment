## Document: Adding Validation for Dynamic Fields in Forms

This document provides a step-by-step guide to adding validation for dynamic fields in forms. It focuses on ensuring the correct implementation of validation for existing dynamic fields like educational and experience details.

---
### 1. **Add state variable **

```javascript
const [experienceDetails, setExperienceDetails] = useState([
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
`````
````


### 1. **Add Validation Logic**
Define a validation function to check field values based on requirements.

Example for educational details validation:

````
```javascript

  const handleExperienceDetailsChange = (index, field, value) => {
    const updatedDetails = experienceDetails.map((detail, idx) =>
      idx === index ? { ...detail, [field]: value } : detail
    );
    setExperienceDetails(updatedDetails);

    // Mark field as touched
    const fieldKey = `exp-${index}-${field}`;
    setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));

    // Immediately validate the field
    validateField(fieldKey, value);
  };
```

---


### 1. **Add Validation Logic**
Define a validation function to check field values based on requirements.

Example for educational details validation:
```javascript


  // Adds a new educational detail entry
  const addExperienceDetail = () => {
    console.log("Before adding new experience detail:", experienceDetails);

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

    console.log("After adding new experience detail:", experienceDetails);
  };
 // Removes an experience detail entry
 const removeExperienceDetail = (index) => {
  setExperienceDetails(experienceDetails.filter((_, idx) => idx !== index));
};
const validateField = (fieldName, value, type) => {
    let error = ""; // Start with no error for each field

    switch (true) {
      // REQUIRED TEXT FIELDS (e.g., firstName, email, etc.)
      case [
        
        "candidateStatus",
        "candidateOwner",
      ].includes(fieldName):
        if (!value || value.trim() === "") {
          error = `${fieldName} is required.`;
        }
        break;

      // EDUCATIONAL FIELDS (Handle both text and checkbox)
      case fieldName.startsWith("edu-"): {
        if (typeof value === "string" && value.trim() === "") {
          error = `${fieldName} is required.`;
        }
        break;
      }
  

      default:
        break;
    }

    // Update formErrors state to store the error message for this field
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error, // Store error message for the field
    }));
  };
```

---

### 2. **Update Change Handlers**
Modify the field change handler to include validation.

Example:
```javascript

const handleEducationChange = (index, field, value) => {
    const updatedDetails = educationalDetails.map((detail, idx) =>
      idx === index ? { ...detail, [field]: value } : detail
    );
    setEducationalDetails(updatedDetails);

    // Mark field as touched
    const fieldKey = `edu-${index}-${field}`;
    setTouchedFields((prev) => ({ ...prev, [fieldKey]: true }));

    // Immediately validate the field
    validateField(fieldKey, value);
  };

```

---

### 3. **Track Errors in State**
Use a `formErrors` state to store and manage validation errors:
```javascript
const [formErrors, setFormErrors] = useState({});
```

---

### 4. **Display Validation Errors**
Show validation errors for each field in the UI.

Example:
```jsx
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
                        handleEducationChange(index, "institute", e.target.value)
                      }
                    />
                    <div className={getFeedbackClass(`edu-${index}-institute`)}>
                      {getFeedbackMessage(`edu-${index}-institute`)}
                    </div>
```

---

### 5. **Validate Before Submission**
Check all fields for errors before form submission:
```javascript
 const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting
 .......
 ......

    // Show an alert with the list of missing or incorrect fields
    if (!valid) {
      const missingFieldsMessage = missingFields.length
        ? `Please fix the following fields:\n\n${missingFields.join("\n")}`
        : "Please fix the errors in the form before submitting.";
      alert(missingFieldsMessage);
      setIsSubmitted(false);
    } else {
      // Combine formData and educationalDetails into finalData
      const finalData = { ...formData, educationalDetails };
      console.log("Form Submitted:", finalData); // Log the final submitted data
      alert("Form submitted successfully!"); // Show success message
      setIsSubmitted(true); // Update submission state
    }
  };```

---

### Key Points:
- **Validation Logic**: Create reusable validation functions.
- **Error Management**: Use state to track and update errors dynamically.
- **User Feedback**: Display error messages next to invalid fields.
- **Submission Check**: Validate all fields before submitting the form.

This concise guide ensures you can add validation to dynamic fields in your forms effectively.