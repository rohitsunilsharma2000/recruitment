"use client";


import React, { useState } from 'react';
// import "./TokenizedTagInput.css"

const TokenizedTagInput = () => {
  // Predefined list of suggestions for demonstration
  const suggestionList = [
    "java", "javacard", "javascript", "javascriptmvc", "javaandj2ee", "javafx",
    "javase", "javabeans", "javamail", "javaapplets", "python", "reactjs", "angular",
    "nodejs", "html", "css", "csharp", "ruby", "go", "typescript", "swift"
  ];

  const [tags, setTags] = useState([]); // Store the tags
  const [inputValue, setInputValue] = useState(''); // Store the current input value
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Suggestions filtered based on input
  const [isOpen, setIsOpen] = useState(false); // Track if suggestions are open
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track highlighted suggestion

  // Define the separators that trigger tag creation
  const tokenSeparators = [' ', ','];

  // Function to handle the input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    filterSuggestions(e.target.value);
  };

  // Function to filter suggestions based on input
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
    setIsOpen(filtered.length > 0); // Open the suggestion list if there are filtered suggestions
  };

  // Function to handle key press (for space or comma)
  const handleKeyDown = (e) => {
    if (tokenSeparators.includes(e.key)) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === 'ArrowDown' && highlightedIndex < filteredSuggestions.length - 1) {
      setHighlightedIndex(highlightedIndex + 1);
    } else if (e.key === 'ArrowUp' && highlightedIndex > 0) {
      setHighlightedIndex(highlightedIndex - 1);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      addTag(filteredSuggestions[highlightedIndex]);
    }
  };

  // Function to add a tag
  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) { // Only add non-empty and unique tags
      setTags((prevTags) => [...prevTags, tag]);
      setInputValue(''); // Clear the input field
      setIsOpen(false); // Close the suggestions
      setHighlightedIndex(-1); // Reset highlighted suggestion index
    }
  };

  // Function to remove a tag
  const removeTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  // Function to clear all tags
  const clearAllTags = () => {
    setTags([]); // Clear all tags
  };

  return (
    <><h1>
      <b>Tokenized Tag Input</b>  gives you a customizable select box with support for searching, tagging, remote data sets, infinite scrolling, and many other highly used options.
    </h1><div className="container mt-4 container-wrapper">
        <div className="tag-input">
          <div className="tag-input-field">

            {/* Tags are displayed as clickable items */}
            {tags.map((tag, index) => (
              <span
                key={index}
                className="badge bg-primary me-2 mb-2 tag"
                onClick={() => removeTag(index)}
              >
                {tag} <span className="ms-1" style={{ cursor: 'pointer' }}>x</span>
              </span>
            ))}
            {/* The input field to type in */}
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="form-control border-0"
              placeholder="Type a tag (space or comma to add)" />
          </div>

          {/* Suggestion dropdown */}
          {isOpen && (
            <ul className="list-group mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={`list-group-item ${highlightedIndex === index ? 'active' : ''}`}
                  onClick={() => addTag(suggestion)}
                  style={{ cursor: 'pointer' }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {/* Clear All Tags Button */}
          {tags.length > 0 && (
            <button
              className="btn-sm btn btn-danger mt-2"
              onClick={clearAllTags}
            >
              Clear All Tags
            </button>
          )}
        </div>
      </div></>
  );
};

export default TokenizedTagInput;