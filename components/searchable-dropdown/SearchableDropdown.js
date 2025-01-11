"use client";

import React, { useState, useEffect, useRef } from 'react';
import "./SearchableDropdown.css";

const SearchableDropdown = ({
  className = "",
  id,
  name,
  options = [],
  selectedValue = null,
  placeholder = "Select an option",
  onSelect = () => { },
  value,
  onChange,
  getValidationClass = () => ""
}) => {
  const [selected, setSelected] = useState(selectedValue);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter options based on search input
  useEffect(() => {
    setFilteredOptions(
      options.filter(option => option.toLowerCase().includes(search.toLowerCase()))
    );
    setHighlightedIndex(-1);
  }, [search, options]);

  // Handle select option
  // const handleSelect = (option) => {
  //   setSelected(option);
  //   setIsOpen(false);
  //   setSearch("");
  //   setHighlightedIndex(-1);
  //   onSelect(option); // Call onSelect prop
  //   if (onChange) {
  //     onChange({ target: { name, value: option } }); // Call onChange with updated value
  //   }
  // };

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(-1);
    onSelect(option); // Call onSelect prop
    if (onChange) {
      onChange({
        target: {
          name: name, // Ensure `name` is passed correctly
          value: option
        }
      });
    }
  };

  // Handle keydown events for ArrowUp, ArrowDown, and Enter
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => Math.min(filteredOptions.length - 1, prevIndex + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(0, prevIndex - 1));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredOptions[highlightedIndex]);
    }
  };

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  // Handle input change for search
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="position-relative">
      <div
        className={`form-control d-flex align-items-center justify-content-between ${className}`}
        id={id}
        name={name}
        onClick={toggleDropdown}
        style={{ cursor: "pointer" }}
        onKeyDown={handleKeyDown}
        tabIndex={0} // Allow the container to receive focus for keyboard interactions
      >
        <span>{selected || placeholder}</span>
        <span className="ms-2">&#9660;</span>
      </div>

      {isOpen && (
        <div ref={dropdownRef} className="dropdown-menu show border" style={{ width: "300px" }}>
          <input
            ref={inputRef}
            type="text"
            className="form-control search-input border"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <ul className="list-unstyled p-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`dropdown-item rounded ${highlightedIndex === index ? 'active' : ''}`}
                onClick={() => handleSelect(option)}
                style={{
                  backgroundColor: highlightedIndex === index ? '#dee4f0' : 'transparent',
                  cursor: "pointer",
                  color: "black"
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
