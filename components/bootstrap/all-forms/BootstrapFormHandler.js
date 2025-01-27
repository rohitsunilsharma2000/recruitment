"use client"

import React, { useState } from 'react';

const BootstrapFormHandler = () => {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    textarea: '',
    select: '',
    checkbox: false,
    radio: '',
    range: 50,
    file: null,
    date: '',
    time: '',
    datetime: '',
    month: '',
    week: '',
    switch: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox' || type === 'radio') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    } else if (type === 'file') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0] // Only take the first file
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mt-5">

    <form onSubmit={handleSubmit} className="p-4">
      {/* Text Input */}
      <div className="form-group mb-3">
        <label htmlFor="text">Text Input</label>
        <input
          type="text"
          className="form-control"
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
        />
      </div>

      {/* Email Input */}
      <div className="form-group mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Password Input */}
      <div className="form-group mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {/* Textarea */}
      <div className="form-group mb-3">
        <label htmlFor="textarea">Textarea</label>
        <textarea
          className="form-control"
          id="textarea"
          name="textarea"
          value={formData.textarea}
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Select Dropdown */}
      <div className="form-group mb-3">
        <label htmlFor="select">Select</label>
        <select
          className="form-control"
          id="select"
          name="select"
          value={formData.select}
          onChange={handleChange}
        >
          <option value="">Choose...</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>

      {/* Checkbox */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="checkbox"
          name="checkbox"
          checked={formData.checkbox}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="checkbox">
          Check this box
        </label>
      </div>

      {/* Radio Buttons */}
      <div className="form-check mb-3">
        <input
          type="radio"
          className="form-check-input"
          id="radio1"
          name="radio"
          value="option1"
          checked={formData.radio === 'option1'}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="radio1">
          Option 1
        </label>
      </div>
      <div className="form-check mb-3">
        <input
          type="radio"
          className="form-check-input"
          id="radio2"
          name="radio"
          value="option2"
          checked={formData.radio === 'option2'}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="radio2">
          Option 2
        </label>
      </div>

      {/* Range Slider */}
      <div className="form-group mb-3">
        <label htmlFor="range">Range Input</label>
        <input
          type="range"
          className="form-control-range"
          id="range"
          name="range"
          min="0"
          max="100"
          value={formData.range}
          onChange={handleChange}
        />
      </div>

      {/* File Input */}
      <div className="form-group mb-3">
        <label htmlFor="file">File Input</label>
        <input
          type="file"
          className="form-control-file"
          id="file"
          name="file"
          onChange={handleChange}
        />
      </div>

      {/* Date Input */}
      <div className="form-group mb-3">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      {/* Time Input */}
      <div className="form-group mb-3">
        <label htmlFor="time">Time</label>
        <input
          type="time"
          className="form-control"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </div>

      {/* DateTime Local Input */}
      <div className="form-group mb-3">
        <label htmlFor="datetime">Datetime</label>
        <input
          type="datetime-local"
          className="form-control"
          id="datetime"
          name="datetime"
          value={formData.datetime}
          onChange={handleChange}
        />
      </div>

      {/* Month Input */}
      <div className="form-group mb-3">
        <label htmlFor="month">Month</label>
        <input
          type="month"
          className="form-control"
          id="month"
          name="month"
          value={formData.month}
          onChange={handleChange}
        />
      </div>

      {/* Week Input */}
      <div className="form-group mb-3">
        <label htmlFor="week">Week</label>
        <input
          type="week"
          className="form-control"
          id="week"
          name="week"
          value={formData.week}
          onChange={handleChange}
        />
      </div>

      {/* Switch Input */}
      <div className="form-check form-switch mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="switch"
          name="switch"
          checked={formData.switch}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="switch">
          Switch Input
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  );
};

export default BootstrapFormHandler;