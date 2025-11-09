import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
    const links = <>
    <li className="inter-font text-gray-600"><NavLink to='/'><a  href="">Home</a></NavLink></li>
    <li className="inter-font text-gray-600"><NavLink to='/Services'><a href="">Services</a></NavLink></li>
    </>
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content  bg-base-100  rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
           {links}
          </ul>
        </div>
       <p className="font-bold text-2xl font-logo"> Home<span className="text-gradient">Hero</span></p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">
         {links}
          
        </ul>
      </div>
      <div className="navbar-end">
       <Link to='/login'> <a className="btn btn-outline mr-5 inter-font font-medium">Login</a></Link>
       <Link to='/register'> <a className="btn btn-outline">Register</a></Link>
      </div>
    </div>
  );
};

export default Navbar;
