"use client";
import React, { useState } from "react";
import SidebarBarJobFilter from "@/components/setup-side-bar-job-filter/SidebarBarJobFilter";
import Link from "next/link";

export default function AllJobOpening() {
  const [showSidebar, setShowSidebar] = useState(true);

  const jobData = [
    {
      "Job Opening ID": "ZR_3_JOB",
      "Posting Title": "Senior Accountant (Sample)",
      "Assigned Recruiter(s)": "saha@bishnupadasaha.agency",
      "Target Date": "01/18/2025",
      "Job Opening Status": "Waiting for approval",
      City: "Tallahassee",
      "Department Name": "Paula Rojas (Sample)",
      "Hiring Manager": "saha@bishnupadasaha.agency",
      "Job Type": "Full time",
      "Number of Applications": "0",
      "Last Activity Time": "01/03/2025 09:29 AM",
      "Date Opened": "12/19/2024",
      Province: "Florida",
      Country: "United States",
      "Number of Positions": "5",
    },
    {
      "Job Opening ID": "ZR_2_JOB",
      "Posting Title": "Sales Manager (Sample)",
      "Assigned Recruiter(s)": "saha@bishnupadasaha.agency",
      "Target Date": "01/18/2025",
      "Job Opening Status": "In-progress",
      City: "Nil",
      "Department Name": "Scott Fisher (Sample)",
      "Hiring Manager": "saha@bishnupadasaha.agency",
      "Job Type": "Full time",
      "Number of Applications": "1",
      "Last Activity Time": "01/03/2025 09:29 AM",
      "Date Opened": "12/19/2024",
      Province: "Nil",
      Country: "Nil",
      "Number of Positions": "2",
    }, {
      "Job Opening ID": "ZR_1_JOB",
      "Posting Title": "Software Engineer",
      "Assigned Recruiter(s)": "recruiter1@example.com",
      "Target Date": "01/15/2025",
      "Job Opening Status": "Open",
      City: "San Francisco",
      "Department Name": "Engineering",
      "Hiring Manager": "manager1@example.com",
      "Job Type": "Full time",
      "Number of Applications": "10",
      "Last Activity Time": "01/02/2025 10:00 AM",
      "Date Opened": "12/10/2024",
      Province: "California",
      Country: "United States",
      "Number of Positions": "3",
    },
    {
      "Job Opening ID": "ZR_2_JOB",
      "Posting Title": "Senior Software Engineer",
      "Assigned Recruiter(s)": "recruiter2@example.com",
      "Target Date": "01/20/2025",
      "Job Opening Status": "In-progress",
      City: "Austin",
      "Department Name": "Engineering",
      "Hiring Manager": "manager2@example.com",
      "Job Type": "Full time",
      "Number of Applications": "15",
      "Last Activity Time": "01/03/2025 12:00 PM",
      "Date Opened": "12/11/2024",
      Province: "Texas",
      Country: "United States",
      "Number of Positions": "2",
    },
    {
      "Job Opening ID": "ZR_3_JOB",
      "Posting Title": "Data Scientist",
      "Assigned Recruiter(s)": "recruiter3@example.com",
      "Target Date": "01/18/2025",
      "Job Opening Status": "Filled",
      City: "New York",
      "Department Name": "Data Analytics",
      "Hiring Manager": "manager3@example.com",
      "Job Type": "Contract",
      "Number of Applications": "25",
      "Last Activity Time": "01/04/2025 03:00 PM",
      "Date Opened": "12/12/2024",
      Province: "New York",
      Country: "United States",
      "Number of Positions": "1",
    },
    {
      "Job Opening ID": "ZR_4_JOB",
      "Posting Title": "Marketing Manager",
      "Assigned Recruiter(s)": "recruiter4@example.com",
      "Target Date": "01/25/2025",
      "Job Opening Status": "Open",
      City: "Los Angeles",
      "Department Name": "Marketing",
      "Hiring Manager": "manager4@example.com",
      "Job Type": "Part time",
      "Number of Applications": "5",
      "Last Activity Time": "01/05/2025 11:00 AM",
      "Date Opened": "12/15/2024",
      Province: "California",
      Country: "United States",
      "Number of Positions": "4",
    },
    {
      "Job Opening ID": "ZR_5_JOB",
      "Posting Title": "",
      "Assigned Recruiter(s)": "recruiter5@example.com",
      "Target Date": "01/30/2025",
      "Job Opening Status": "Overdue",
      City: "Miami",
      "Department Name": "Operations",
      "Hiring Manager": "manager5@example.com",
      "Job Type": "Full time",
      "Number of Applications": "0",
      "Last Activity Time": "01/06/2025 02:00 PM",
      "Date Opened": "12/16/2024",
      Province: "Florida",
      Country: "United States",
      "Number of Positions": "2",
    },
    {
      "Job Opening ID": "ZR_6_JOB",
      "Posting Title": "Product Manager",
      "Assigned Recruiter(s)": "recruiter6@example.com",
      "Target Date": "01/22/2025",
      "Job Opening Status": "In-progress",
      City: "",
      "Department Name": "Product",
      "Hiring Manager": "manager6@example.com",
      "Job Type": "Full time",
      "Number of Applications": "20",
      "Last Activity Time": "01/07/2025 01:00 PM",
      "Date Opened": "12/17/2024",
      Province: "Nevada",
      Country: "United States",
      "Number of Positions": "3",
    },
    {
      "Job Opening ID": "ZR_7_JOB",
      "Posting Title": "HR Specialist",
      "Assigned Recruiter(s)": "",
      "Target Date": "01/27/2025",
      "Job Opening Status": "Open",
      City: "Seattle",
      "Department Name": "Human Resources",
      "Hiring Manager": "",
      "Job Type": "Part time",
      "Number of Applications": "8",
      "Last Activity Time": "01/08/2025 04:00 PM",
      "Date Opened": "12/18/2024",
      Province: "Washington",
      Country: "United States",
      "Number of Positions": "1",
    },
    {
      "Job Opening ID": "ZR_8_JOB",
      "Posting Title": "Business Analyst",
      "Assigned Recruiter(s)": "recruiter8@example.com",
      "Target Date": "01/29/2025",
      "Job Opening Status": "Closed",
      City: "Chicago",
      "Department Name": "Business Operations",
      "Hiring Manager": "manager8@example.com",
      "Job Type": "Full time",
      "Number of Applications": "30",
      "Last Activity Time": "01/09/2025 10:30 AM",
      "Date Opened": "12/20/2024",
      Province: "Illinois",
      Country: "United States",
      "Number of Positions": "1",
    },
  ];
  const [filters, setFilters] = useState({
    selectFilter: "",
    inputFilter: "",
    globalSearch: "",
    todoFilter: "",
    todoSubFilter: "",
  });

  const [filteredJobData, setFilteredJobData] = useState(jobData);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleApplyFilters = (appliedFilters) => {
    console.log('Applied Filters:', appliedFilters);  // Log the applied filters

    const filteredData = jobData.filter((job) => {
      // Global Search Filter
      const matchesGlobalSearch =
        !appliedFilters.globalSearch ||
        Object.values(job)
          .join(" ")
          .toLowerCase()
          .includes(appliedFilters.globalSearch.toLowerCase());

      // console.log('Global Search Filter:');
      // if (!appliedFilters.globalSearch) {
      //   console.log('  No global search filter applied.');
      // } else if (matchesGlobalSearch) {
      //   console.log(`  Job matches global search: ${appliedFilters.globalSearch}`);
      // } else {
      //   console.log(`  Job does not match global search: ${appliedFilters.globalSearch}`);
      // }

      // Posting Title Filter
      const matchesSelect =
        !appliedFilters.selectFilter ||
        (appliedFilters.selectFilter === "is" &&
          job["Posting Title"]?.toLowerCase() ===
          appliedFilters.inputFilter?.toLowerCase()) ||
        (appliedFilters.selectFilter === "isn't" &&
          job["Posting Title"]?.toLowerCase() !==
          appliedFilters.inputFilter?.toLowerCase()) ||
        (appliedFilters.selectFilter === "contains" &&
          job["Posting Title"]?.toLowerCase().includes(
            appliedFilters.inputFilter?.toLowerCase()
          ));

      console.log('Posting Title:', job["Posting Title"]?.toLowerCase());
      console.log('Posting Title appliedFilters:', appliedFilters.inputFilter?.toLowerCase());



      if (!appliedFilters.selectFilter) {
        console.log('  No posting title filter applied.');
      } else if (appliedFilters.selectFilter === 'is') {
        if (job["Posting Title"]?.toLowerCase() === appliedFilters.inputFilter?.toLowerCase()) {
          console.log(`  Job posting title is exactly: ${appliedFilters.inputFilter}`);
        } else {
          console.log(`  Job posting title is NOT: ${appliedFilters.inputFilter}`);
        }
      } else if (appliedFilters.selectFilter === "isn't") {
        if (job["Posting Title"]?.toLowerCase() !== appliedFilters.inputFilter?.toLowerCase()) {
          console.log(`  Job posting title is NOT: ${appliedFilters.inputFilter}`);
        } else {
          console.log(`  Job posting title is exactly: ${appliedFilters.inputFilter}`);
        }
      } else if (appliedFilters.selectFilter === "contains") {
        if (job["Posting Title"]?.toLowerCase().includes(appliedFilters.inputFilter?.toLowerCase())) {
          console.log(`  Job posting title contains: ${appliedFilters.inputFilter}`);
        } else {
          console.log(`  Job posting title does NOT contain: ${appliedFilters.inputFilter}`);
        }
      }

      // To-Dos Filter
      const matchesTodoFilter =
        !appliedFilters.todoFilter ||
        (appliedFilters.todoFilter === "withoutOpenTodo" &&
          job["Number of Applications"] === "0") ||
        (appliedFilters.todoFilter === "overdue" &&
          job["Job Opening Status"] === "Overdue") ||
        (appliedFilters.todoFilter === "todoDue" &&
          ["Today", "Tomorrow", "Next 7 Days", "Today + Overdue"].includes(
            appliedFilters.todoSubFilter
          ));

      console.log('To-Dos Filter:');
      if (!appliedFilters.todoFilter) {
        console.log('  No to-dos filter applied.');
      } else if (appliedFilters.todoFilter === "withoutOpenTodo") {
        if (job["Number of Applications"] === "0") {
          console.log('  Job has no open to-dos (Number of Applications is 0)');
        } else {
          console.log('  Job has open to-dos (Number of Applications is not 0)');
        }
      } else if (appliedFilters.todoFilter === "overdue") {
        if (job["Job Opening Status"] === "Overdue") {
          console.log('  Job status is overdue');
        } else {
          console.log('  Job status is NOT overdue');
        }
      } else if (appliedFilters.todoFilter === "todoDue") {
        if (["Today", "Tomorrow", "Next 7 Days", "Today + Overdue"].includes(appliedFilters.todoSubFilter)) {
          console.log(`  Job due in: ${appliedFilters.todoSubFilter}`);
        } else {
          console.log('  Job is not due within the selected time frame');
        }
      }

      const result = matchesGlobalSearch && matchesSelect && matchesTodoFilter;
      console.log('Final Match for Job:', job["Posting Title"], result);  // Log the final match result for the job

      return result;
    });

    setFilteredJobData(filteredData);
    console.log('Filtered Data:', filteredData);  // Log the filtered data
  };


  const handleClearFilters = () => {
    setFilters({
      selectFilter: "",
      inputFilter: "",
      globalSearch: "",
      todoFilter: "",
      todoSubFilter: "",
    });
    setFilteredJobData(jobData);
  };


  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg p-3" style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container-fluid">
          <span className="navbar-brand">
            <button className="btn btn-light" onClick={toggleSidebar}>
              <i className="bi bi-funnel"></i>
            </button>
            <b> All Job Openings</b>
          </span>
          <div className="d-flex justify-content-end gap-3 mt-1">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <Link className="btn btn-primary me-2" href="/job-openings/create">
              Create Job Opening
            </Link>
          </div>
        </div>
      </nav>

      <div className="row">
        {showSidebar && (
          <div className="col-md-2 bg-light p-3">
            <SidebarBarJobFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}
        <div className={`col-md-${showSidebar ? "10" : "12"} p-3`}>
          <div className="table-responsive">
            <table className="table table-sm table-striped table-bordered text-nowrap align-middle">
              <thead className="table-dark">
                <tr>
                  {Object.keys(jobData[0]).map((header, index) => (
                    <th key={index} className="text-center small">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredJobData.map((job, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(job).map((value, cellIndex) => (
                      <td key={cellIndex} className="text-center small">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>Total Jobs: {filteredJobData.length}</div>
        </div>
      </div>
    </div>
  );
}