import React from "react";
import "./sidebar.css"

const menuData = {
  Setup: [
    { title: "General", link: "#" },
    {
      title: "Users and Control",
      link: "#usersControl",
      subItems: [
        { title: "Users", link: "/users-control/users" },
        { title: "Security Control", link: "/users-control/security-control/roles" },
      ],
    },
    { title: "Customization", link: "#" },
    {
      title: "Resume Management",
      link: "#resumeManagement",
      subItems: [
        { title: "Resume Parser Mapping", link: "#" },
        { title: "Resume Inbox", link: "#" },
      ],
    },
    {
      title: "Portal Setup",
      link: "#portalSetup",
      subItems: [{ title: "Portal", link: "#" }],
    },
    { title: "Career Website", link: "#" },
    { title: "Job Board Hub", link: "#" },
    { title: "Automation", link: "#" },
    { title: "Marketplace", link: "#" },
    { title: "Data Administration", link: "#" },
    { title: "Developer Space", link: "#" },
    { title: "Telephony", link: "#" },
    { title: "Compliance", link: "#" },
    { title: "Zia", link: "#" },
  ],
};

const Sidebar = () => {
  return (


    <div className="flex-shrink-0 " style={{ width: "180px" }}>
      <div className="ps-2 pe-5 mt-3 ">
        <input className="form-control form-control-sm mb-3" type="text" placeholder="Search" />
      </div>



      <ul className="list-unstyled ps-0">
        {menuData.Setup.map((item, index) => (
          <li className="mb-1" key={index}>
            <a
              className={`btn btn-toggle align-items-center text-decoration-none ${item.subItems ? "collapsed" : ""
                }`}
              data-bs-toggle={item.subItems ? "collapse" : undefined}
              data-bs-target={item.subItems ? `#collapse-${index}` : undefined}
              aria-expanded="false"
            >
              <span className="ps-1"> {item.title}</span>
            </a>
            {item.subItems && (
              <div className="collapse" id={`collapse-${index}`}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a href={subItem.link} className=" fs-0-point-7 fw-700">
                        <span className="text-dark"> {subItem.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

