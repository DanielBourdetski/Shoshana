import React, { useState} from "react";
import {NavLink } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { GrClose } from "react-icons/gr";

// TODO add path in navigate function

export default function navBar() {
  // toggling menu and hamburger icon on small screenss
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
          className={`absolute shadow px-5 py-5 bg-slate-100  transform opacity-0  ${isMobileMenuOpen ? "opacity-100 duration-150 " : "duration-150"
            } md:flex md:items-center z-[-1] md:z-auto md:static 
                md:w-auto
                md:opacity-100 w-full left-0`}
        >
          <li className="mx-4 my-6 md:my-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-bold" : ""
              }
            >
              HOME
            </NavLink>
          </li>

          <li className="mx-4 my-6 md:my-0">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "font-bold" : ""
              }
            >
              ABOUT
            </NavLink>
          </li>

          <li className="mx-4 my-6 md:my-0">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "font-bold" : ""
              }
            >
              SiGN OUT
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
