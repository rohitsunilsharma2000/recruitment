"use client";

import React, { useState, useEffect } from 'react';
import "./evaluation.css";
import { fetchAllQuestion, fetchJobApplicationsStatus } from '@/utils/restClient';

const Tabs = () => {
  const [formData, setFormData] = useState({
    activeTab: 'tab1',
    candidateStatus: '',
    selectType: 'Choose',
    chosenAssessment: '',
    rating: 0,
    showComments: false,
    comments: '',
    // Fields for the "final" rating submission
    overallRating: '1',
    overallStatus: 'active',
    overallCommentsForGeneralReview: '',
    overallCommentsForScreening: ''
  });

  const [allQuestions, setAllQuestion] = useState([]);
  const [questionTypes, setQuestionType] = useState([]);
  const [choosedQuestionResponses, setchoosedQuestionResponses] = useState({});
  const [statusCategories, setStatusCategories] = useState([]);
  const [hoveredRating, setHoveredRating] = useState({});
  const [evaluateCandidate, setevaluateCandidate] = useState({});


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
    console.log('Event triggered:', { name, value, type, checked });

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      };

      // Log the updated form data
      console.log('Updated formData:', updatedData);

      return updatedData;
    });
  };


  // Helper to change the active tab
  const handleTabChange = (tabValue) => {
    setFormData((prevData) => ({
      ...prevData,
      activeTab: tabValue
    }));
  };


  const handleRatingChange = (questionBankTemplateId, value) => {
    // Log the initial state before the update
    console.log("Initial state (before update):", choosedQuestionResponses);

    // Log the specific questionBankTemplateId and value we are updating
    console.log("Updating rating for questionBankTemplateId:", questionBankTemplateId);
    console.log("New rating value:", value);

    // Perform the state update
    setchoosedQuestionResponses((prevResponses) => {
      // Log the previous state of the specific question before updating
      console.log("Previous response for questionBankTemplateId:", questionBankTemplateId, prevResponses[questionBankTemplateId]);

      // Create the updated responses
      const updatedResponses = {
        ...prevResponses,  // Spread the previous responses to maintain the other question data
        [questionBankTemplateId]: {    // Update the specific question's response
          ...prevResponses[questionBankTemplateId],  // Spread the previous response of that question
          rating: value     // Update the rating
        }
      };

      // Log the updated response for the specific question
      console.log("Updated response for questionBankTemplateId:", questionBankTemplateId, updatedResponses[questionBankTemplateId]);

      // Log the full updated state after the change
      console.log("Updated state (after change):", updatedResponses);

      return updatedResponses;  // Return the updated state
    });
  };

  const handleCommentChange = (questionBankTemplateId, value) => {
    // Log the current state before the update
    console.log("Initial state (before comment change):", choosedQuestionResponses);

    // Log the specific questionBankTemplateId and the new comment value
    console.log("Updating comment for questionBankTemplateId:", questionBankTemplateId);
    console.log("New comment value:", value);

    // Perform the state update for comments
    setchoosedQuestionResponses((prevResponses) => {
      // Log the previous comment for the specific question before updating
      console.log("Previous comment for questionBankTemplateId:", questionBankTemplateId, prevResponses[questionBankTemplateId]?.comments);

      // Create the updated responses with the new comment
      const updatedResponses = {
        ...prevResponses,  // Spread the previous responses to preserve other data
        [questionBankTemplateId]: {    // Update the specific question's response
          ...prevResponses[questionBankTemplateId],  // Spread the previous response of that question
          comments: value     // Update the comment
        }
      };

      // Log the updated response for the specific question
      console.log("Updated comment for questionBankTemplateId:", questionBankTemplateId, updatedResponses[questionBankTemplateId]?.comments);

      // Log the full updated state after the change
      console.log("Updated state (after comment change):", updatedResponses);

      return updatedResponses;  // Return the updated state
    });
  };

  const toggleComments = (questionBankTemplateId) => {
    // Log the current state before the toggle action
    console.log("Initial state (before toggling comments visibility):", choosedQuestionResponses);

    // Log the specific questionBankTemplateId for which we're toggling the comments visibility
    console.log("Toggling comments visibility for questionBankTemplateId:", questionBankTemplateId);

    // Perform the state update for toggling comments visibility
    setchoosedQuestionResponses((prevResponses) => {
      // Log the previous visibility of comments for the specific question before toggling
      console.log("Previous comments visibility for questionBankTemplateId:", questionBankTemplateId, prevResponses[questionBankTemplateId]?.showComments);

      // Create the updated responses with toggled visibility
      const updatedResponses = {
        ...prevResponses,  // Spread the previous responses to preserve other data
        [questionBankTemplateId]: {    // Update the specific question's response
          ...prevResponses[questionBankTemplateId],  // Spread the previous response of that question
          showComments: !prevResponses[questionBankTemplateId]?.showComments  // Toggle the visibility
        }
      };

      // Log the updated visibility for the specific question
      console.log("Updated comments visibility for questionBankTemplateId:", questionBankTemplateId, updatedResponses[questionBankTemplateId]?.showComments);

      // Log the full updated state after the toggle
      console.log("Updated state (after toggling comments visibility):", updatedResponses);

      return updatedResponses;  // Return the updated state
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const questionReviews = Object.keys(choosedQuestionResponses).map((questionBankTemplateId) => ({
      questionBankTemplateId,
      rating: choosedQuestionResponses[questionBankTemplateId]?.rating || 0,
      comments: choosedQuestionResponses[questionBankTemplateId]?.comments || '',
    }));
    // Prepare the payload directly from questionResponses

    const payload = {
      "generalReview": {
        "rating": 4,
        "candidateStatus": formData.candidateStatus,
        "overallComments": formData.overallCommentsForGeneralReview,
      },
      "screeningReviews": [
        {
          "reviewType": formData.chosenAssessment,
          "overallRating": formData.overallRating,
          "status": formData.overallStatus,
          "overallComments": formData.overallCommentsForScreening,
          "questionReviews": questionReviews
        }
      ]
    }
    console.log("Form Data for submission:", payload);
    alert("Check console for form data!");
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
        value: `${status}`,  // Create a unique ID using category and index
        // value: `${category}-${index}`,  // Create a unique ID using category and index
        label: status
      }))
    );
  };



  // Render the form (Add JSX for rendering form inputs as required)
  useEffect(() => {


    async function fetchJobApplicationsStatusData() {
      try {
        const response = await fetchJobApplicationsStatus();
        console.log("unfiltered fetchJobApplicationsStatus ", response)
        const allCategories = getAllStatusesOptions(response);
        console.log("fetchJobApplicationsStatus ", allCategories)


        setStatusCategories(allCategories); // Set the array of departments names into state
      } catch (error) {
        console.log("fetchJobApplicationsStatus error ", error)

        setStatusCategories([]);
      }
    }




    async function AllQuestionData() {
      try {
        const response = await fetchAllQuestion(); // Fetch data from the API
        setAllQuestion(response)

        // Extract unique competencyTypes and map to the desired format
        const assessmentOptions = [...new Set(response.map(item => item.competencyType))].map(type => ({
          value: type,
          label: type
        }));

        console.log(assessmentOptions);
        console.log("Fetched all question statuses:", assessmentOptions);
        setQuestionType(assessmentOptions);

      } catch (error) {
        setQuestionType([]);
        setAllQuestion([])

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
                        checked={formData.activeTab === 'tab1'}
                        onChange={() => handleTabChange('tab1')}
                      />
                      <span className="ms-2">General Review</span>
                    </label>
                  </li>
                  <li className="nav-item">
                    <label className="nav-link fs-6">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={formData.activeTab === 'tab2'}
                        onChange={() => handleTabChange('tab2')}
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
                    className={`tab-pane ${formData.activeTab === 'tab1' ? 'active' : ''}`}
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
                          onChange={handleChange} required
                        >
                          <option value="" disabled>Select status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="On Hold">On Hold</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="overallCommentsForGeneralReview" className="form-label">
                          Overall Comments - General Review
                        </label>
                        <textarea
                          className="form-control"
                          id="overallCommentsForGeneralReview"
                          name="overallCommentsForGeneralReview"
                          rows="4"
                          placeholder="Write your comments here..."
                          value={formData.overallCommentsForGeneralReview}
                          onChange={handleChange} required
                        ></textarea>
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-secondary me-2"
                          onClick={() => alert('Cancel clicked')}
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
                    className={`tab-pane ${formData.activeTab === 'tab2' ? 'active' : ''}`}
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
                          onChange={handleChange} required
                        >
                          <option value="" >Select Type</option>
                          <option value="Technical">Technical</option>
                          <option value="HR">HR</option>
                          <option value="Managerial">Managerial</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="chosenAssessment" className="form-label">
                          Choose Assessments - Screening Review
                        </label>
                        <select
                          id="chosenAssessment"
                          name="chosenAssessment"
                          className="form-select"
                          value={formData.chosenAssessment}
                          onChange={handleChange} required
                        >
                          <option value="" >Select Type</option>

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
                          onClick={() => handleTabChange('tab1')}

                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleTabChange('tab3')}
                          disabled={!formData.selectType || !formData.chosenAssessment}

                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TAB 3 */}
                  <div
                    className={`tab-pane ${formData.activeTab === 'tab3' ? 'active' : ''}`}
                    id="tab3"
                  >
                    <div className="mt-1">
                      <div className="accordion accordion-flush mb-4 border" id="accordionFlushExample">
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

                              {filterByKeyValue(allQuestions, "competencyType", formData.chosenAssessment).map((item, index) => (
                                <div className="row border-bottom custom-dotted" key={index}>

                                  <label className="form-label">
                                    {index + 1}. {item.question}
                                  </label>
                                  <div className="">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <i
                                        key={star}
                                        // className={`bi  ${star <= formData.rating ? 'bi-star-fill' : 'bi-star'}`}
                                        // className={` bi ${star <= (choosedQuestionResponses[item.id]?.rating || 0) ? 'bi-star-fill selected' : 'bi-star'}`}
                                        className={`bi ${star <= (hoveredRating[item.id] || choosedQuestionResponses[item.id]?.rating || 0) ? 'bi-star-fill' : 'bi-star'}`}

                                        style={{ color: '#f39c12', cursor: 'pointer' }}
                                        // onClick={() => handleRatingChange(star)}
                                        onClick={() => handleRatingChange(item.id, star)}
                                        onMouseEnter={() => handleMouseEnter(item.id, star)}
                                        onMouseLeave={() => handleMouseLeave(item.id)}

                                      />
                                    ))}
                                    <span className="ms-2">
                                      <a
                                        className="btn btn-link text-decoration-none fs-6"
                                        // onClick={toggleComments}
                                        onClick={() => toggleComments(item.id)}
                                      >
                                        {/* {formData.showComments ? 'Hide Comments' : 'Add Comments'} */}
                                        {choosedQuestionResponses[item.id]?.showComments ? 'Hide Comments' : 'Add Comments'}

                                      </a>
                                    </span>
                                  </div>

                                  {/* {formData.showComments && ( */}
                                  {choosedQuestionResponses[item.id]?.showComments && (

                                    <div className="mb-1">
                                      <textarea
                                        className="form-control"
                                        rows="2"
                                        placeholder="Enter your comments here..."
                                        name="comments"
                                        // value={formData.comments}
                                        value={choosedQuestionResponses[item.id]?.comments || ''}

                                        // onChange={handleChange}
                                        onChange={(e) => handleCommentChange(item.id, e.target.value)}

                                      ></textarea>
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
                        <label htmlFor="overallRating" className="form-label">Overall Rating - Screening Review </label>
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
                        <label htmlFor="overallStatus" className="form-label">Status - Screening Review
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
                        <label htmlFor="overallCommentsForScreening" className="form-label">
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
                      <button type="submit" className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={!formData.overallRating || !formData.overallStatus || !formData.overallCommentsForScreening}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Tab Content */}
              </div>
            </div>
          </div>
        </div>
      </form >
    </div >
  );
};

export default Tabs;
