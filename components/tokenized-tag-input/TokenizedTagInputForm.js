"use client";

import React, { useState } from "react";
import "./TokenizedTagInput.css";

const TokenizedTagInputForm = ({
  suggestionList = [],
  className = "",
  id = "tag-input",
  name = "tags",
  value = [], // Expecting `value` to be an array of tags
  onChange,
  placeholder = "Type and add tags",
}) => {
  const [inputValue, setInputValue] = useState(""); // For the input field
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const tokenSeparators = [" ", ","];

  // Function to handle input changes
  const handleInputChangeInternal = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    filterSuggestions(newValue);
  };

  // Function to filter suggestions
  const filterSuggestions = (input) => {
    if (!input) {
      setFilteredSuggestions([]);
      setIsOpen(false);
      return;
    }
    const filtered = suggestionList.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setIsOpen(filtered.length > 0);
  };

  // Function to handle key press
  const handleKeyDown = (e) => {
    if (tokenSeparators.includes(e.key)) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === "ArrowDown" && highlightedIndex < filteredSuggestions.length - 1) {
      setHighlightedIndex(highlightedIndex + 1);
    } else if (e.key === "ArrowUp" && highlightedIndex > 0) {
      setHighlightedIndex(highlightedIndex - 1);
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      addTag(filteredSuggestions[highlightedIndex]);
    }
  };

  // Function to add a tag
  const addTag = (tag) => {
    if (tag && !value.includes(tag)) {
      const newTags = [...value, tag];
      console.log("Previous form data:", value);
      console.log("Added tag:", tag);
      onChange?.(newTags); // Notify parent of the change
    }
    setInputValue("");
    setFilteredSuggestions([]);
  };

  // Function to remove a tag
  const removeTag = (index) => {
    const newTags = value.filter((_, i) => i !== index);
    console.log("Previous form data:", value);
    console.log("Removed tag at index:", index);
    onChange?.(newTags); // Notify parent of the change
  };


  return (
    <div className="container mt-4 container-wrapper">
      <div className="tag-input">
        <div className="tag-input-field">
          {value.map((tag, index) => (
            <span
              key={index}
              className="badge bg-primary me-2 mb-2 tag"
              onClick={() => removeTag(index)}
            >
              {tag} <span className="ms-1" style={{ cursor: "pointer" }}>x</span>
            </span>
          ))}
          <input
            type="text"
            className={`form-control border-0 ${className}`}
            id={id}
            name={name}
            value={inputValue}
            onChange={handleInputChangeInternal}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
          />
        </div>
        {isOpen && (
          <ul className="list-group mt-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className={`list-group-item ${highlightedIndex === index ? "active" : ""}`}
                onClick={() => addTag(suggestion)}
                style={{ cursor: "pointer" }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {/* Clear All Tags Button */}
        {value.length > 0 && (
          <button
            className="btn btn-danger mt-2"
            onClick={(e) => {
              e.preventDefault(); // Prevent default behavior
              setFilteredSuggestions([]);
              onChange?.([]); // Notify parent of cleared tags
            }}


          >
            Clear All Tags
          </button>
        )}
      </div>
    </div>
  );
};

export default TokenizedTagInputForm;