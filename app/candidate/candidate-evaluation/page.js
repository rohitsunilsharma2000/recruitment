"use client";

import React, { useState, useEffect } from 'react';
import "./evaluation.css";
import { fetchAllQuestion } from '@/utils/restClient';

const Tabs = () => {
  // Single state object to hold all form data
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
    overallComments: ''
  });

  const [allQuestions, setAllQuestion] = useState([]);

  // Single handler for generic changes (text, select, checkbox, etc.)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value

    }));
  };

  // Helper to change the active tab
  const handleTabChange = (tabValue) => {
    setFormData((prevData) => ({
      ...prevData,
      activeTab: tabValue
    }));
  };

  // Helper to handle star rating logic
  const handleRatingChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      rating: value
    }));
  };

  // Helper to show/hide the comments box
  const toggleComments = () => {
    setFormData((prevData) => ({
      ...prevData,
      showComments: !prevData.showComments
    }));
  };

  // Single submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle your form submission logic
    console.log("FormData on submit:", formData);
    alert("Check console for form data!");
  };

  // For demonstration/logging
  // useEffect(() => { 
  //   console.log(`Component rendered! Active Tab: ${formData.activeTab}`);
  // }, [formData.activeTab]);

  useEffect(() => {
    async function AllQuestionData() {
      try {
        const response = await fetchAllQuestion(); // Fetch data from the API

        // Extract unique competencyTypes and map to the desired format
        const assessmentOptions = [...new Set(response.map(item => item.competencyType))].map(type => ({
          value: type,
          label: type
        }));

        console.log(assessmentOptions);
        console.log("Fetched all question statuses:", assessmentOptions);
        setAllQuestion(assessmentOptions);
      } catch (error) {
        setAllQuestion([]);
      }
    }

    AllQuestionData(); // Trigger the API call when the component mounts
  }, []);




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
                          Candidate Status
                        </label>
                        <select
                          id="candidateStatus"
                          name="candidateStatus"
                          className="form-select"
                          value={formData.candidateStatus}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Select status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="On Hold">On Hold</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="overallComments" className="form-label">
                          Overall Comments
                        </label>
                        <textarea
                          className="form-control"
                          id="overallComments"
                          name="overallComments"
                          rows="4"
                          placeholder="Write your comments here..."
                          value={formData.overallComments}
                          onChange={handleChange}
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
                          Select Type
                        </label>
                        <select
                          id="selectType"
                          name="selectType"
                          className="form-select"
                          value={formData.selectType}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Select Type</option>
                          <option value="Technical">Technical</option>
                          <option value="HR">HR</option>
                          <option value="Managerial">Managerial</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="chosenAssessment" className="form-label">
                          Choose Assessments
                        </label>
                        <select
                          id="chosenAssessment"
                          name="chosenAssessment"
                          className="form-select"
                          value={formData.chosenAssessment}
                          onChange={handleChange}
                        >

                          <option value="">Choose Assessment</option>
                          {allQuestions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}


                        </select>
                      </div>

                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-secondary me-2"
                          onClick={() => alert('Cancel clicked')}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleTabChange('tab3')}
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
                    <div className="mt-5">
                      <div className="accordion accordion-flush mb-4 border" id="accordionFlushExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseThree"
                              aria-expanded="false"
                              aria-controls="flush-collapseThree"
                            >
                              Accordion Item #3
                            </button>
                          </h2>
                          <div
                            id="flush-collapseThree"
                            className="accordion-collapse collapse"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div className="accordion-body">
                              <div className="container mt-3">
                                <div className="mb-3">
                                  <label className="form-label">
                                    1. How good are you with handling pressure?
                                  </label>
                                </div>

                                {/* Star Rating */}
                                <div className="mb-3">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                      key={star}
                                      className={`bi ${star <= formData.rating ? 'bi-star-fill' : 'bi-star'}`}
                                      style={{ color: '#f39c12', cursor: 'pointer' }}
                                      onClick={() => handleRatingChange(star)}
                                    />
                                  ))}
                                  <span className="ms-2">
                                    <button
                                      type="button"
                                      className="btn btn-link"
                                      onClick={toggleComments}
                                    >
                                      {formData.showComments ? 'Hide Comments' : 'Add Comments'}
                                    </button>
                                  </span>
                                </div>

                                {/* Comments Section */}
                                {formData.showComments && (
                                  <div className="mb-3">
                                    <textarea
                                      className="form-control"
                                      rows="4"
                                      placeholder="Enter your comments here..."
                                      name="comments"
                                      value={formData.comments}
                                      onChange={handleChange}
                                    ></textarea>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Overall Rating Section */}
                      <h6>Rating and Comments</h6>

                      {/* Overall Rating */}
                      <div className="mb-3">
                        <label htmlFor="overallRating" className="form-label">Overall Rating</label>
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
                        <label htmlFor="overallStatus" className="form-label">Status</label>
                        <select
                          className="form-select"
                          id="overallStatus"
                          name="overallStatus"
                          value={formData.overallStatus}
                          onChange={handleChange}
                          required
                        >

                          <option value="">Choose Assessment</option>
                          {allQuestions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}


                        </select>
                      </div>

                      {/* Overall Comments */}
                      <div className="mb-3">
                        <label htmlFor="overallComments" className="form-label">
                          Overall Comments
                        </label>
                        <textarea
                          className="form-control"
                          id="overallComments"
                          name="overallComments"
                          rows="4"
                          value={formData.overallComments}
                          onChange={handleChange}
                          placeholder="Enter your comments here..."
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <button type="submit" className="btn btn-primary">
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
      </form>
    </div>
  );
};

export default Tabs;
