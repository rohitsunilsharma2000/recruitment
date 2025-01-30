"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./searchableDropdown.css"



const TypeAheadDropdown = ({
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
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [visibleOptions, setVisibleOptions] = useState(10); // Initial number of options visible

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Lazy load more options when scrolling to the bottom
  const loadMoreOptions = useCallback(() => {
    setVisibleOptions((prev) => Math.min(filteredOptions.length, prev + 10)); // Load 10 more options
  }, [filteredOptions]);

  // Handle scroll event to trigger lazy loading
  const handleScroll = useCallback(() => {
    if (dropdownRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = dropdownRef.current;
      if (scrollHeight - scrollTop === clientHeight) {
        loadMoreOptions();
      }
    }
  }, [loadMoreOptions]);

  // Filter options based on the search term
  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        // option.toLowerCase().includes(search.toLowerCase())
        option.listValue.toLowerCase().includes(search.toLowerCase())

      )
    );
    setVisibleOptions(10); // Reset visible options on search change
    setHighlightedIndex(-1);
  }, [search, options]);

  // Add and remove scroll event listener
  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (isOpen && dropdown) {
      dropdown.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isOpen, handleScroll]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(-1);
    onSelect(option);
    if (onChange) {
      onChange({
        target: {
          name: name,
          value: option
        }
      });
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        Math.min(filteredOptions.length - 1, prevIndex + 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(0, prevIndex - 1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredOptions[highlightedIndex]);
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

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
        tabIndex={0}
      >
        {/* <span>{selected || placeholder}</span> */}
        <span>{selected ? selected.listValue : placeholder}</span>

        <span className="ms-2">&#9660;</span>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="dropdown-menu show border"
          style={{ width: "300px", maxHeight: "200px", overflowY: "auto" }}
        >
          <input
            ref={inputRef}
            type="text"
            // className="form-control search-input border"
            className="form-control search-input border position-sticky top-0 z-3"

            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <ul className="list-unstyled p-2">
            {filteredOptions.slice(0, visibleOptions).map((user, index) => (
              <li
                key={user.id} // Use unique key like user.id
                className={`dropdown-item rounded ${highlightedIndex === index ? "active" : ""}`}
                onClick={() => handleSelect(user)}
                style={{
                  backgroundColor: highlightedIndex === index ? "#dee4f0" : "transparent",
                  cursor: "pointer",
                  color: "black"
                }}
              >
                <div className="list-group-item d-flex align-items-center py-0">
                  <img src="https://placehold.co/40" alt="Avatar" className="rounded-circle me-3 typeAhedAvatar" />
                  <div className="flex-grow-1">
                    <p className="mb-0 text-muted email-fs">{user.listValue}</p>
                    <p className="mb-1 text-muted email-fs">{user.id}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* <ul className="list-unstyled p-2">
            {filteredOptions.slice(0, visibleOptions).map((option, index) => (
              <li
                key={index}
                className={`dropdown-item rounded ${highlightedIndex === index ? "active" : ""
                  }`}
                onClick={() => handleSelect(option)}
                style={{
                  backgroundColor:
                    highlightedIndex === index ? "#dee4f0" : "transparent",
                  cursor: "pointer",
                  color: "black"
                }}
              >

                <div className="list-group-item d-flex align-items-center py-0">
                  <img src="https://via.placeholder.com/40" alt="Avatar" className="rounded-circle me-3 typeAhedAvatar" />
                  <div className="flex-grow-1">
                    <p className="mb-0 text-muted email-fs"> {option.listValue}</p>
                    <p className="mb-1 text-muted email-fs" >janesmith@example.com</p>
                  </div>
                </div>
              </li>
            ))}
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default TypeAheadDropdown;