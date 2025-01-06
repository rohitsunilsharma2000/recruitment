"use client";

import Sidebar from "@/components/setup-side-bar/SetupSidebar";
import { useState } from "react";

export default function UsersControlLayout({ children }) {

  return (


    <div className="bg-light">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-white px-4 border-end" style={{ width: "180px" }}>
          <Sidebar />
        </div>


        {/* Right Side */}
        <div className="col-md-10 ">
          {children} {/* Dynamic content for signup or sign */}
        </div>
      </div>
    </div>



  );
}
