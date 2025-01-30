'use client';

import React, { useState } from 'react';
import "./BootstrapFormHandler.css"

const BootstrapFormHandler = () => {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    select: '',
    checkbox: false,
    radio: '',
    file: null,
    range: 50,
    date: '',
    time: '',
    datetime: '',
    textarea: '',
    switch: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className=" mb-0">Bootstrap Form Handler</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="row g-3">
              {/* Text Input */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Text Input
                    <span className="text-danger fs-5">*</span>
                  </label>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      className="form-control fixed-width-input"
                      name="text"
                      value={formData.text}
                      onChange={handleChange}
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please enter text.</div>
                  </div>
                </div>
              </div>
              {/* Text Input */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Text Input2</label>
                  <div className="flex-grow-1">
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="switch"
                        checked={formData.switch}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Enable feature</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Input */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Email</label>
                  <div className="flex-grow-1">
                    <input
                      type="email"
                      className="form-control fixed-width-input"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please enter a valid email.</div>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Password</label>
                  <div className="flex-grow-1">
                    <input
                      type="password"
                      className="form-control fixed-width-input"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />

                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please enter a password.</div>
                  </div>
                </div>
              </div>

              {/* Select Dropdown */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Select Option</label>
                  <div className="flex-grow-1">
                    <select
                      className="form-select fixed-width-input"
                      name="select"
                      value={formData.select}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                    </select>
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please select an option.</div>
                  </div>
                </div>
              </div>

              {/* Checkbox */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Checkbox</label>
                  <div className="flex-grow-1">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="checkbox"
                        checked={formData.checkbox}
                        onChange={handleChange}
                      />
                      <label className="form-check-label">Agree to terms</label>
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">You must agree to the terms.</div>
                  </div>
                </div>
              </div>

              {/* Radio Buttons */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Radio Options</label>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center">
                      <div className="form-check me-3">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="radio"
                          value="option1"
                          checked={formData.radio === 'option1'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">Option 1</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="radio"
                          value="option2"
                          checked={formData.radio === 'option2'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">Option 2</label>
                      </div>
                    </div>
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please select an option.</div>
                  </div>

                </div>
              </div>

              {/* File Input */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">File Upload</label>
                  <div className="flex-grow-1">
                    <input
                      type="file"
                      className="form-control fixed-width-input"
                      name="file"
                      onChange={handleChange}
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please select a file.</div>
                  </div>
                </div>
              </div>



              {/* Date Input */}
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Date</label>
                  <div className="flex-grow-1">
                    <input
                      type="date"
                      className="form-control fixed-width-input"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please select a date.</div>
                  </div>
                </div>
              </div>

              {/* Time Input */}
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Time</label>
                  <div className="flex-grow-1">
                    <input
                      type="time"
                      className="form-control fixed-width-input"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please select a time.</div>
                  </div>
                </div>
              </div>

              {/* Datetime Input */}
              <div className="col-md-4">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Datetime</label>
                  <div className="flex-grow-1">
                    <input
                      type="datetime-local"
                      className="form-control fixed-width-input"
                      name="datetime"
                      value={formData.datetime}
                      onChange={handleChange}
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please select a datetime.</div>
                  </div>
                </div>
              </div>

              {/* Textarea */}
              <div className="col-md-12">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Textarea</label>
                  <div className="flex-grow-1">
                    <textarea
                      className="form-control fixed-width-input"
                      name="textarea"
                      value={formData.textarea}
                      onChange={handleChange}
                      rows="4"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please provide text.</div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Textarea</label>
                  <div className="flex-grow-1">
                    <textarea
                      className="form-control fixed-width-input"
                      name="textarea"
                      value={formData.textarea}
                      onChange={handleChange}
                      rows="4"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please provide text.</div>
                  </div>
                </div>
              </div>
              {/* Range Input */}
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <label className="form-label fixed-width-label">Range Input</label>
                  <div className="flex-grow-1">
                    <input
                      type="range"
                      className=" fixed-width-input"
                      name="range"
                      value={formData.range}
                      onChange={handleChange}
                      min="0"
                      max="100"
                    />
                    <div className="valid-feedback">Looks good!</div>
                    <div className="invalid-feedback">Please adjust the range.</div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <button type="submit" className="btn btn-primary ">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BootstrapFormHandler;
