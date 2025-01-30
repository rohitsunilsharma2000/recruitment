"use client";

import React, { useState, useEffect } from "react";
import "./evaluation.css";
import {
  fetchAllQuestion,
  fetchJobApplicationsStatus,
} from "@/utils/restClient";
import { ValidationHelper } from "@/components/form-validator/ValidationHelper";

const Tabs = () => {
  const [formData, setFormData] = useState({
    activeTab: "tab1",
    candidateStatus: "",
    selectType: "Choose",
    chosenAssessment: "",
    rating: 0,
    showComments: false,
    comments: "",
    // Fields for the "final" rating submission
    overallRating: "1",
    overallStatus: "active",
    overallCommentsForGeneralReview: "",
    overallCommentsForScreening: "",
  });

  const [allQuestions, setAllQuestion] = useState([]);
  const [questionTypes, setQuestionType] = useState([]);
  const [choosedQuestionResponses, setchoosedQuestionResponses] = useState({});
  const [statusCategories, setStatusCategories] = useState([]);
  const [hoveredRating, setHoveredRating] = useState({});
  const [formErrors, setFormErrors] = useState({}); // Store validation errors
  const [touchedFields, setTouchedFields] = useState({}); // Track touched fields

  const handleMouseEnter = (questionId, value) => {
    setHoveredRating((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleMouseLeave = (questionId) => {
    setHoveredRating((prev) => ({
      ...prev,
      [questionId]: undefined,
    }));
  };
  // Single handler for generic changes (text, select, checkbox, etc.)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Log the event details
    console.log("Event triggered:", { name, value, type, checked });

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };

      // Log the updated form data
      console.log("Updated formData:", updatedData);

      return updatedData;
    });
  };

  // Helper to change the active tab
  const handleTabChange = (tabValue) => {
    setFormData((prevData) => ({
      ...prevData,
      activeTab: tabValue,
    }));
  };

  const handleRatingChange = (questionId, value) => {
    setchoosedQuestionResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: {
        ...prevResponses[questionId],
        rating: value,
      },
    }));

    // Validate rating
    const error = ValidationHelper.validateField("rating", value, "number");
    setFormErrors((prev) => ({ ...prev, [questionId]: error }));
    setTouchedFields((prev) => ({ ...prev, [questionId]: true })); // Ensure field is marked as touched
  };

  const handleCommentChange = (questionId, value) => {
    setchoosedQuestionResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: {
        ...prevResponses[questionId],
        comments: value,
      },
    }));

    // Validate comments
    const error = ValidationHelper.validateField(
      `comment-${questionId}`,
      value,
      "text"
    );
    setFormErrors((prev) => ({ ...prev, [`comment-${questionId}`]: error }));
    setTouchedFields((prev) => ({ ...prev, [`comment-${questionId}`]: true })); // Mark comments as touched
  };

  const toggleComments = (questionBankTemplateId) => {
    setchoosedQuestionResponses((prevResponses) => {
      const updatedResponses = {
        ...prevResponses, // Spread the previous responses to preserve other data
        [questionBankTemplateId]: {
          // Update the specific question's response
          ...prevResponses[questionBankTemplateId], // Spread the previous response of that question
          showComments: !prevResponses[questionBankTemplateId]?.showComments, // Toggle the visibility
        },
      };
      return updatedResponses; // Return the updated state
    });
  };

  /**
   *
   * 🔹 Step 2: Validate Comments on Submit (Even If "Show Comments" Wasn't Clicked)
   *
   *    Modify handleSubmit to ensure all comments are validated, even if they haven't been shown yet.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    // Check for each question whether rating and comments are provided
    Object.keys(choosedQuestionResponses).forEach((questionId) => {
      const rating = choosedQuestionResponses[questionId]?.rating;
      const comments = choosedQuestionResponses[questionId]?.comments;
      const showComments = choosedQuestionResponses[questionId]?.showComments;

      // Validate Rating (Ensure it's between 1 and 5)
      if (!rating || rating < 1 || rating > 5) {
        newErrors[questionId] =
          "Please provide a valid rating between 1 and 5.";
        valid = false;
      }

      // Validate Comments (Ensure non-empty if showComments is true)
      if (showComments && (!comments || comments.trim() === "")) {
        newErrors[`comment-${questionId}`] = "Comment cannot be empty.";
        valid = false;
      }
    });

    // Update form errors and touched fields
    setFormErrors(newErrors);
    setTouchedFields(
      Object.keys(choosedQuestionResponses).reduce(
        (acc, key) => ({ ...acc, [key]: true, [`comment-${key}`]: true }),
        {}
      )
    );

    // Final validation check before submission
    if (valid) {
      console.log("✅ All ratings and comments are filled. Submitting form...");

      const questionReviews = Object.keys(choosedQuestionResponses).map(
        (questionBankTemplateId) => ({
          questionBankTemplateId,
          rating: choosedQuestionResponses[questionBankTemplateId]?.rating || 0,
          comments:
            choosedQuestionResponses[questionBankTemplateId]?.comments || "",
        })
      );

      const payload = {
        generalReview: {
          rating: 4,
          candidateStatus: formData.candidateStatus,
          overallComments: formData.overallCommentsForGeneralReview,
        },
        screeningReviews: [
          {
            reviewType: formData.chosenAssessment,
            overallRating: formData.overallRating,
            status: formData.overallStatus,
            overallComments: formData.overallCommentsForScreening,
            questionReviews: questionReviews,
          },
        ],
      };

      console.log("Form Data for submission:", payload);
      alert("✅ Form is valid and ready to submit!");
    } else {
      console.log(
        "❌ Form has missing ratings or comments. Fix errors before submitting."
      );
      alert("⚠️ Some ratings or comments are missing. Please fill them in.");
    }
  };

  // Generic function to filter by any key and value
  const filterByKeyValue = (array, key, value) => {
    return array.filter((item) => item[key] === value);
  };

  // Helper function to generate status options
  // Flatten all status options and assign an id to each status
  const getAllStatusesOptions = (statusCategories) => {
    return Object.entries(statusCategories).flatMap(([category, statuses]) =>
      statuses.map((status, index) => ({
        value: `${status}`, // Create a unique ID using category and index
        // value: `${category}-${index}`,  // Create a unique ID using category and index
        label: status,
      }))
    );
  };

  // Render the form (Add JSX for rendering form inputs as required)
  useEffect(() => {
    async function fetchJobApplicationsStatusData() {
      try {
        const response = await fetchJobApplicationsStatus();
        console.log("unfiltered fetchJobApplicationsStatus ", response);
        const allCategories = getAllStatusesOptions(response);
        console.log("fetchJobApplicationsStatus ", allCategories);

        setStatusCategories(allCategories); // Set the array of departments names into state
      } catch (error) {
        console.log("fetchJobApplicationsStatus error ", error);

        setStatusCategories([]);
      }
    }

    async function AllQuestionData() {
      try {
        const response = await fetchAllQuestion(); // Fetch data from the API
        setAllQuestion(response);

        // Extract unique competencyTypes and map to the desired format
        const assessmentOptions = [
          ...new Set(response.map((item) => item.competencyType)),
        ].map((type) => ({
          value: type,
          label: type,
        }));

        console.log(assessmentOptions);
        console.log("Fetched all question statuses:", assessmentOptions);
        setQuestionType(assessmentOptions);

        /**
         * 🔹 Step 1: Initialize Comments in State
         * Modify your useEffect to pre-fill choosedQuestionResponses with default empty comments for each question.
         * Initialize responses with empty comme
         */
        const initialResponses = {};
        response.forEach((item) => {
          initialResponses[item.id] = {
            rating: 0, // Default rating
            comments: "", // Ensure comments exist
            showComments: false, // Default hidden
          };
        });

        setchoosedQuestionResponses(initialResponses);
      } catch (error) {
        setQuestionType([]);
        setAllQuestion([]);
      }
    }
    fetchJobApplicationsStatusData();
    AllQuestionData(); // Trigger the API call when the component mounts
  }, []);

  // const generalQuestions = filterByKeyValue(allQuestions, "competencyType", "General");
  // const leadershipQuestions = filterByKeyValue(allQuestions, "question", "How do you handle conflict?");

  // console.log("General Questions:", generalQuestions);
  // console.log("Leadership Questions:", leadershipQuestions);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row mt-2">
          {/* Left Column: Application Details */}
          <div className="col-md-6">
            <h6>Application Details</h6>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Form</h5>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <p>text</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <p>text</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Evaluation */}
          <div className="col-md-6">
            <h6>Evaluation</h6>
            <div className="card">
              <div className="card-body">
                {/* Tab Navigation with radio inputs */}
                <ul className="nav nav-pills">
                  <li className="nav-item">
                    <label className="nav-link fs-6">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={formData.activeTab === "tab1"}
                        onChange={() => handleTabChange("tab1")}
                      />
                      <span className="ms-2">General Review</span>
                    </label>
                  </li>
                  <li className="nav-item">
                    <label className="nav-link fs-6">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={formData.activeTab === "tab2"}
                        onChange={() => handleTabChange("tab2")}
                      />
                      <span className="ms-2">Screening Review</span>
                    </label>
                  </li>
                  {/* We'll navigate to tab3 programmatically in tab2's "Proceed" button */}
                </ul>

                {/* Tab Content */}
                <div className="tab-content mt-3">
                  {/* TAB 1 */}
                  <div
                    className={`tab-pane ${formData.activeTab === "tab1" ? "active" : ""
                      }`}
                    id="tab1"
                  >
                    <div>
                      <div className="mb-4">
                        <label className="form-label">Rating</label>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-star-fill star-icon"></i>
                          <i className="bi bi-star-fill star-icon"></i>
                          <i className="bi bi-star-fill star-icon"></i>
                          <i className="bi bi-star-fill star-icon"></i>
                          <i className="bi bi-star-fill star-icon"></i>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="candidateStatus" className="form-label">
                          Candidate Status - General Review
                        </label>
                        <select
                          id="candidateStatus"
                          name="candidateStatus"
                          className="form-select"
                          value={formData.candidateStatus}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>
                            Select status
                          </option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="On Hold">On Hold</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="overallCommentsForGeneralReview"
                          className="form-label"
                        >
                          Overall Comments - General Review
                        </label>
                        <textarea
                          className="form-control"
                          id="overallCommentsForGeneralReview"
                          name="overallCommentsForGeneralReview"
                          rows="4"
                          placeholder="Write your comments here..."
                          value={formData.overallCommentsForGeneralReview}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-secondary me-2"
                          onClick={() => alert("Cancel clicked")}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TAB 2 */}
                  <div
                    className={`tab-pane ${formData.activeTab === "tab2" ? "active" : ""
                      }`}
                    id="tab2"
                  >
                    <div>
                      <div className="mb-4">
                        <label htmlFor="selectType" className="form-label">
                          Select Type - Screening Review
                        </label>
                        <select
                          id="selectType"
                          name="selectType"
                          className="form-select"
                          value={formData.selectType}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="Technical">Technical</option>
                          <option value="HR">HR</option>
                          <option value="Managerial">Managerial</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="chosenAssessment"
                          className="form-label"
                        >
                          Choose Assessments - Screening Review
                        </label>
                        <select
                          id="chosenAssessment"
                          name="chosenAssessment"
                          className="form-select"
                          value={formData.chosenAssessment}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Type</option>

                          <option value="">Choose Assessment</option>
                          {questionTypes.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-secondary me-2"
                          // onClick={() => alert('Cancel clicked')}
                          onClick={() => handleTabChange("tab1")}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleTabChange("tab3")}
                          disabled={
                            !formData.selectType || !formData.chosenAssessment
                          }
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TAB 3 */}
                  <div
                    className={`tab-pane ${formData.activeTab === "tab3" ? "active" : ""
                      }`}
                    id="tab3"
                  >
                    <div className="mt-1">
                      <div
                        className="accordion accordion-flush mb-4 border"
                        id="accordionFlushExample"
                      >
                        <div className="accordion-item ">
                          <h6 className="accordion-header">
                            <button
                              className="accordion-button collapsed p-2 "
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseThree"
                              aria-expanded="false"
                              aria-controls="flush-collapseThree"
                            >
                              {formData.chosenAssessment}
                            </button>
                          </h6>
                          <div
                            id="flush-collapseThree"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body ">
                              {filterByKeyValue(
                                allQuestions,
                                "competencyType",
                                formData.chosenAssessment
                              ).map((item, index) => (
                                <div
                                  className="row border-bottom custom-dotted"
                                  key={index}
                                >
                                  <label className="form-label">
                                    {index + 1}. {item.question}
                                  </label>

                                  {/* Star Rating Input */}
                                  <div>
                                    {[0, 1, 2, 3, 4, 5].map((star) => (
                                      <i
                                        key={star}
                                        className={`bi ${star <=
                                            (hoveredRating[item.id] ||
                                              choosedQuestionResponses[item.id]
                                                ?.rating ||
                                              0)
                                            ? "bi-star-fill"
                                            : "bi-star"
                                          }`}
                                        style={{
                                          color: "#f39c12",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleRatingChange(item.id, star)
                                        }
                                        onMouseEnter={() =>
                                          setHoveredRating((prev) => ({
                                            ...prev,
                                            [item.id]: star,
                                          }))
                                        }
                                        onMouseLeave={() =>
                                          setHoveredRating((prev) => ({
                                            ...prev,
                                            [item.id]: undefined,
                                          }))
                                        }
                                      />
                                    ))}
                                    <span className="ms-2">
                                      <a
                                        className="btn btn-link text-decoration-none fs-6"
                                        onClick={() => toggleComments(item.id)}
                                      >
                                        {choosedQuestionResponses[item.id]
                                          ?.showComments
                                          ? "Hide Comments"
                                          : "Add Comments"}
                                      </a>
                                    </span>
                                  </div>

                                  {/* Validation for Rating */}
                                  {touchedFields[item.id] &&
                                    formErrors[item.id] && (
                                      <div
                                        className="invalid-feedback"
                                        style={{
                                          display: "block",
                                          color: "red",
                                        }}
                                      >
                                        {formErrors[item.id]}
                                      </div>
                                    )}

                                  {/* Comments Section */}
                                  {choosedQuestionResponses[item.id]
                                    ?.showComments && (
                                      <div className="mb-1">
                                        <textarea
                                          className={`form-control ${ValidationHelper.getValidationClass(
                                            `comment-${item.id}`,
                                            touchedFields,
                                            formErrors
                                          )}`}
                                          rows="2"
                                          placeholder="Enter your comments here..."
                                          value={
                                            choosedQuestionResponses[item.id]
                                              ?.comments || ""
                                          }
                                          onChange={(e) =>
                                            handleCommentChange(
                                              item.id,
                                              e.target.value
                                            )
                                          }
                                        ></textarea>

                                        {/* Validation for Comments */}
                                        {touchedFields[`comment-${item.id}`] &&
                                          formErrors[`comment-${item.id}`] && (
                                            <div
                                              className="invalid-feedback"
                                              style={{
                                                display: "block",
                                                color: "red",
                                              }}
                                            >
                                              {formErrors[`comment-${item.id}`]}
                                            </div>
                                          )}
                                      </div>
                                    )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Overall Rating Section */}
                      <h6>Rating and Comments</h6>

                      {/* Overall Rating */}
                      <div className="mb-3">
                        <label htmlFor="overallRating" className="form-label">
                          Overall Rating - Screening Review{" "}
                        </label>
                        <select
                          className="form-select"
                          id="overallRating"
                          name="overallRating"
                          value={formData.overallRating}
                          onChange={handleChange}
                          required
                        >
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>

                      {/* Status Dropdown */}
                      <div className="mb-3">
                        <label htmlFor="overallStatus" className="form-label">
                          Status - Screening Review
                        </label>
                        <select
                          className="form-select"
                          id="overallStatus"
                          name="overallStatus"
                          value={formData.overallStatus}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Choose Assessment</option>
                          {statusCategories.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Overall Comments */}
                      <div className="mb-3">
                        <label
                          htmlFor="overallCommentsForScreening"
                          className="form-label"
                        >
                          Overall Comments - Screening Review
                        </label>
                        <textarea
                          className="form-control"
                          id="overallCommentsForScreening"
                          name="overallCommentsForScreening"
                          rows="4"
                          value={formData.overallCommentsForScreening}
                          onChange={handleChange}
                          placeholder="Enter your comments here..."
                          required
                        ></textarea>
                      </div>

                      {/* Submit Button */}

                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-secondary me-2"
                          onClick={() => handleTabChange("tab2")}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          onClick={handleSubmit}
                          disabled={
                            !formData.overallRating ||
                            !formData.overallStatus ||
                            !formData.overallCommentsForScreening
                          }
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Tab Content */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Tabs;