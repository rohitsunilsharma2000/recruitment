"use client";
import React, { useState } from "react";

function PipelineCard({ label, count }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle the dropdown open/closed
  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  // Helper function that returns a border color based on the label.
  const getBorderColor = (label) => {
    // Example mapping: You can adjust the colors and logic as needed.
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A8",
      "#A833FF",
      "#33FFF2",
    ];
    // Use the length of the label to choose a color (this is just one idea).
    return colors[label.length % colors.length];
  };

  return (
    <div className="col-6 col-md-2 mb-3">
      {/* Apply an inline style with a border-top color */}
      <div
        className="card"
        style={{ borderTop: `5px solid ${getBorderColor(label)}` }}
      >
        <p className="card-text fs-2 m-0">{count}</p>

        <div className="card-body position-relative p-0">
          {/* The title acts as a clickable dropdown trigger */}
          <h6
            className="card-title d-inline-block"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            {label} <span className="dropdown-toggle"></span>
          </h6>

          {/* Dropdown menu; forced display via classes and inline style */}
          {dropdownOpen && (
            <ul
              className="dropdown-menu show mt-1 position-absolute"
              style={{ position: "static", display: "block" }}
            >
              <li>
                <a className="dropdown-item" href="#">
                  Action 1
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Action 2
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Action 3
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PipelineCard;
