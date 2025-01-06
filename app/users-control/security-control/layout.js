"use client";

import SetupSidebar from "@/components/setup-side-bar/SetupSidebar";
import Link from "next/link";
import { useState } from "react";

export default function UsersControlLayout({ children }) {

  return (


    <div className="vh-100  ">
      <div className="row">

        <div className="bd-example m-0 border-0">

          <ul className="nav nav-underline">

            <li className="nav-item">
              <Link
                className="text-decoration-none nav-link fs-0-point-7 "
                href="/users-control/security-control/profile"
                passHref>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="text-decoration-none nav-link fs-0-point-7"
                href="/users-control/security-control/roles"
                passHref>
                Roles
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="text-decoration-none nav-link fs-0-point-7"
                href="/users-control/security-control/roles"
                passHref>
                Data Sharing Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="text-decoration-none nav-link fs-0-point-7"
                href="/users-control/security-control/roles"
                passHref>
                Attachment Permissions
              </Link>
            </li>

          </ul>
        </div>

        <hr />

        {/* Right Side */}
        <div className="col-md-10">
          {children} {/* Dynamic content for signup or sign */}
        </div>
      </div>
    </div>



  );
}
