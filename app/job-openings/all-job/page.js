"use client";
import React, { useState } from "react";
import SidebarBarJobFilter from "@/components/setup-side-bar-job-filter/SidebarBarJobFilter";
import Link from "next/link";

export default function AllJobOpening() {
  const [showSidebar, setShowSidebar] = useState(true);

  const jobData = [
    {
      "Job Opening ID": "ZR_5_JOB",
      "Posting Title": "Operations Manager",
      "Assigned Recruiter(s)": "recruiter5@example.com",
      "Target Date": "01/17/2025",
      "Job Opening Status": "Overdue",
      "City": "Miami",
      "Department Name": "Operations",
      "Hiring Manager": "manager5@example.com",
      "Job Type": "Full time",
      "Number of Applications": "0",
      "To Do's": "Pending documentation approval",
      "Last Activity Time": "01/06/2025 02:00 PM",
      "Date Opened": "12/16/2024",
      "Province": "Florida",
      "Country": "United States",
      "Number of Positions": "2"
    },
    {
      "Job Opening ID": "ZR_9_JOB",
      "Posting Title": "Project Manager",
      "Assigned Recruiter(s)": "recruiter9@example.com",
      "Target Date": "01/15/2025",
      "Job Opening Status": "Overdue",
      "City": "Boston",
      "Department Name": "Project Management",
      "Hiring Manager": "manager9@example.com",
      "Job Type": "Contract",
      "Number of Applications": "5",
      "To Do's": "Follow up with stakeholders",
      "Last Activity Time": "01/10/2025 12:00 PM",
      "Date Opened": "12/14/2024",
      "Province": "Massachusetts",
      "Country": "United States",
      "Number of Positions": "1"
    },
    {
      "Job Opening ID": "ZR_12_JOB",
      "Posting Title": "HR Coordinator",
      "Assigned Recruiter(s)": "recruiter12@example.com",
      "Target Date": "01/10/2025",
      "Job Opening Status": "Overdue",
      "City": "Atlanta",
      "Department Name": "Human Resources",
      "Hiring Manager": "manager12@example.com",
      "Job Type": "Full time",
      "Number of Applications": "10",
      "To Do's": "Send interview schedules",
      "Last Activity Time": "01/12/2025 03:00 PM",
      "Date Opened": "12/11/2024",
      "Province": "Georgia",
      "Country": "United States",
      "Number of Positions": "4"
    },
    {
      "Job Opening ID": "ZR_15_JOB",
      "Posting Title": "Marketing Executive",
      "Assigned Recruiter(s)": "recruiter15@example.com",
      "Target Date": "01/19/2025",
      "Job Opening Status": "Overdue",
      "City": "Chicago",
      "Department Name": "Marketing",
      "Hiring Manager": "manager15@example.com",
      "Job Type": "Part time",
      "Number of Applications": "2",
      "To Do's": "Finalize campaign strategies",
      "Last Activity Time": "01/15/2025 11:30 AM",
      "Date Opened": "12/18/2024",
      "Province": "Illinois",
      "Country": "United States",
      "Number of Positions": "3"
    }
    ,


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

    const filteredData = jobData.filter((job) => {
      // Global Search Filter: Checks if any job field matches the global search text
      let matchesGlobalSearch = true;  // Default to true if no global search filter is applied
      const inputFilter = appliedFilters.inputFilter.toLowerCase();
      const todoSubFilter = appliedFilters.todoSubFilter;

      if (appliedFilters.globalSearch) {
        const allJobValues = Object.values(job).join(" ").toLowerCase();
        const searchTerm = appliedFilters.globalSearch.toLowerCase();
        matchesGlobalSearch = allJobValues.includes(searchTerm);
      }


      // Posting Title Filter: Checks if the job posting title matches the filter criteria
      let matchesPostingTitle = true;  // Default to true if no posting title filter is applied
      // if (appliedFilters.selectFilter && appliedFilters.inputFilter) {
      if (appliedFilters.selectFilter && appliedFilters.inputFilter !== undefined && appliedFilters.inputFilter === '') {

        const postingTitle = job["Posting Title"]?.toLowerCase();

        if (appliedFilters.selectFilter === "is" || appliedFilters.selectFilter === "contains") {
          matchesPostingTitle = postingTitle.includes(inputFilter);  // Check if posting title contains the input filter
        }
        else if (appliedFilters.selectFilter === "isn't" || appliedFilters.selectFilter === "doesn't contain") {
          matchesPostingTitle = !postingTitle.includes(inputFilter);
        }
        else if (appliedFilters.selectFilter === "starts with") {
          matchesPostingTitle = postingTitle.startsWith(inputFilter);
        }
        else if (appliedFilters.selectFilter === "ends with") {
          matchesPostingTitle = postingTitle.endsWith(inputFilter);  // Check if posting title ends with the input filter
        }
        else if (appliedFilters.selectFilter === "ends with") {
          matchesPostingTitle = postingTitle.endsWith(inputFilter);  // Check if posting title ends with the input filter
        }
        else if (appliedFilters.selectFilter === "is empty") {
          matchesPostingTitle = !postingTitle || postingTitle.trim() === "";  // Check if posting title is empty or contains only spaces
        }
        else if (appliedFilters.selectFilter === "is not empty") {
          matchesPostingTitle = postingTitle && postingTitle.trim() !== "";  // Check if posting title is not empty
        }


        // "is empty",
        // "is not empty",
      }

      // To-Dos Filter: Checks if the job matches the To-Dos filter criteria
      let matchesToDo = true;  // Default to true if no To-Do filter is applied
      if (appliedFilters.todoFilter) {

        const targetDate = job["Target Date"]?.toLowerCase();
        const todayDate = new Date();  // Get today's date
        // targetDate.setHours(0, 0, 0, 0); // Reset to midnight for comparison



        // Get the month, day, and year
        const month = (todayDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so add 1
        const day = todayDate.getDate().toString().padStart(2, '0'); // Pad day with leading zero if necessary
        const year = todayDate.getFullYear(); // Get the full year

        // Format the date as mm/dd/yyyy
        const formattedTodayDate = `${month}/${day}/${year}`;
        const numberOfApplications = job["Number of Applications"];

        if (appliedFilters.todoFilter === "withoutOpenTodo") {
          matchesToDo = numberOfApplications === "0";  // No open to-dos
        }
        /**
         * Overdue + To Do’s Filter jobs where:
         *     1."Job Opening Status" === "Overdue"
         *     2. Target Date is close (e.g., today or earlier).
         *  
         */
        else if (appliedFilters.todoFilter === "overdue" && todoSubFilter === "To Do's") {
          // Check if the target date is less than or equal to today's date (overdue)
          matchesToDo = targetDate <= formattedTodayDate;
        }
        /**
         * Overdue + Tasks’s Filter jobs where:
         *     1."Job Opening Status" === "Overdue"
         *     2. Number of Applications > 0
         *  
         */
        else if (appliedFilters.todoFilter === "overdue" && todoSubFilter === "Tasks") {
          matchesToDo = numberOfApplications > "0";  // No open to-dos
        }
        else if (appliedFilters.todoFilter === "todoDue") {
          const dueFilters = ["Today", "Tomorrow", "Next 7 Days", "Today + Overdue"];
          matchesToDo = dueFilters.includes(appliedFilters.todoSubFilter);  // Job is due within selected time
        }
      }

      // Final check: Only include the job if all filters match
      return matchesGlobalSearch && matchesPostingTitle && matchesToDo;
    });

    // Set the filtered jobs to the state
    setFilteredJobData(filteredData);
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