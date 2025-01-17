import React, { useState } from "react";
import "../setup-side-bar/sidebar.css";

const SidebarBarJobFilter = ({ filters, onFilterChange, onApplyFilters, onClearFilters }) => {
  const menuData = {
    Setup: [
      {
        title: "Posting Title",
        link: "#resumeManagement",
        subItems: [
          {
            link: "#",
            type: "select",
            options: [
              "--Select--",
              "is",
              "isn't",
              "contains",
              "doesn't contain",
              "starts with",
              "ends with",
              "is empty",
              "is not empty",
            ],
          },
          {
            link: "#",
            type: "input",
            placeholder: "Type here",
          },
        ],
      },
      {
        title: "To-Dos",
        link: "#toDos",
        subItems: [
          {

            type: "radio",
            label: "Without Open To-Do",
            value: "withoutOpenTodo",
          },
          {
            type: "radio",
            label: "Overdue",
            value: "overdue",
            subItems: [
              {
                type: "select",
                options: [
                  "--Select--", "To Do's", "Tasks"
                  // , "Calls"
                ],
              },
            ],
          },
          {
            type: "radio",
            label: "To-Do Due",
            value: "todoDue",
            subItems: [
              {
                type: "select",
                options: ["--Select--",
                  "Today", "Tomorrow", "Next 7 Days", "Today + Overdue"],
              },
            ],
          },
          {
            type: "radio",
            label: "Without Any To-Do",
            value: "withoutAnyTodo",
            subItems: [
              {
                type: "select",
                options: [
                  "--Select--",
                  "In the last",
                  "On",
                  "Before",
                  "After",
                  "Today",
                  "Yesterday",
                  "This Week",
                  "This Month",
                  "This Year",
                  "Last Week",
                  "Last Month",
                  "Until Today",
                ],
              },
              {
                type: "input",
                placeholder: "Enter number",
              },
              {
                type: "select",
                options: [
                  "--Select--",
                  "days", "weeks", "months"],
              },
            ],
          },
        ],
      },
    ],
  };

  const [localFilters, setLocalFilters] = useState(filters);

  const handleLocalChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({
      selectFilter: "",
      inputFilter: "",
      globalSearch: "",
      todoFilter: "",
      todoSubFilter: "",
    });
    onClearFilters();
  };

  return (
    <div className="flex-shrink-0" style={{ width: "180px" }}>
      <div className="ps-2 pe-5 mt-3">
        <input
          className="form-control form-control-sm mb-3"
          type="text"
          placeholder="Search"
          value={localFilters.globalSearch || ""}
          onChange={(e) => handleLocalChange("globalSearch", e.target.value)}
        />
      </div>
      <ul className="list-unstyled ps-0">
        {menuData.Setup.map((item, index) => (
          <li className="mb-1" key={index}>
            <button
              className="btn btn-toggle align-items-center text-decoration-none collapsed"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${index}`}
              aria-expanded="false"
            >
              <span className="ps-1">{item.title}</span>
            </button>
            <div className="collapse" id={`collapse-${index}`}>
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-4">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex} className="mb-2">
                    {subItem.type === "radio" ? (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`radio-${index}`}
                          id={`radio-${index}-${subIndex}`}
                          value={subItem.value}
                          checked={localFilters.todoFilter === subItem.value}
                          onChange={(e) =>
                            handleLocalChange("todoFilter", e.target.value)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`radio-${index}-${subIndex}`}
                        >
                          {subItem.label}
                        </label>
                        {subItem.subItems &&
                          subItem.value === localFilters.todoFilter && (
                            <ul className="list-unstyled ms-4">
                              {subItem.subItems.map((nestedItem, nestedIndex) =>
                                nestedItem.type === "select" ? (
                                  <select
                                    key={nestedIndex}
                                    className="form-select form-select-sm"
                                    onChange={(e) =>
                                      handleLocalChange(
                                        "todoSubFilter",
                                        e.target.value
                                      )
                                    }
                                  >
                                    {nestedItem.options.map((option, optIndex) => (
                                      <option key={optIndex} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                ) : nestedItem.type === "input" ? (
                                  <input
                                    key={nestedIndex}
                                    className="form-control form-control-sm mt-2"
                                    type="text"
                                    placeholder={nestedItem.placeholder}
                                    onChange={(e) =>
                                      handleLocalChange("todoSubFilter", e.target.value)
                                    }
                                  />
                                ) : null
                              )}
                            </ul>
                          )}
                      </div>
                    ) : subItem.type === "select" ? (
                      <select
                        className="form-select form-select-sm"
                        value={localFilters.selectFilter || ""}
                        onChange={(e) =>
                          handleLocalChange("selectFilter", e.target.value)
                        }
                      >
                        {subItem.options.map((option, optIndex) => (
                          <option key={optIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : subItem.type === "input" ? (
                      <input
                        className="form-control form-control-sm"
                        type="text"
                        placeholder={subItem.placeholder}
                        value={localFilters.inputFilter || ""}
                        onChange={(e) =>
                          handleLocalChange("inputFilter", e.target.value)
                        }
                      />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3 d-flex justify-content-between">
        <button
          className="btn btn-primary btn-sm"
          onClick={handleApplyFilters}
        >
          Apply
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleClearFilters}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SidebarBarJobFilter;