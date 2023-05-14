import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { GrClose } from "react-icons/gr";

// TODO add path in navigate function

export default function navBar() {
  const navigate_To = useNavigate();

  // switching between is icons and open nav bar in mobile mode
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between">
        <div className="flex justify-between items-center ">
          <span className="text-2xl font-bold">Shoshana</span>
          <span className="text-3xl cursor-pointer mx-2 md:hidden block">
            <div onClick={(e) => setMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <GrClose /> : <CgMenu />}
            </div>
          </span>
        </div>

        <ul
          className={`absolute shadow px-10 py-5 bg-slate-100 transform -translate-x-80 ${
            isMobileMenuOpen ? "translate-x-0" : ""
          } md:flex md:items-center z-[-1] md:z-auto md:static 
                md:w-auto
             md:opacity-100 duration-150`}
        >
          <li className="mx-4 my-6 md:my-0">
            <button
              className="text-x1 hover:text-cyan-500 duration-500"
              onClick={() => navigate_To("/")}
            >
              HOME
            </button>
          </li>

          <li className="mx-4 my-6 md:my-0">
            <button
              className="text-x1 hover:text-cyan-500 duration-500"
              onClick={() => navigate_To("/")}
            >
              ABOUT
            </button>
          </li>

          <li className="mx-4 my-6 md:my-0">
            <button
              className="text-x1 hover:text-cyan-500 duration-500"
              onClick={() => navigate_To("/")}
            >
              SiGN OUT
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
