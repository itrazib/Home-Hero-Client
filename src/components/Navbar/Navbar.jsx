import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  
  const handleLogOut = () => {
    logOut()
    .then(result => {
      console.log('Successfully Logout',result)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const links = (
    <>
      <li className="inter-font text-gray-600">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="inter-font text-gray-600">
        <NavLink to="/Services">Services</NavLink>
      </li>

      {
        user && <>
         <li className="inter-font text-gray-600">
        <NavLink to="/my-service">My Service</NavLink>
      </li>
      <li className="inter-font text-gray-600">
        <NavLink to="/add-service">Add Service</NavLink>
      </li>
      <li className="inter-font text-gray-600">
        <NavLink to="/my-bookings">My Bookings</NavLink>
      </li>
      <li className="inter-font text-gray-600">
        <NavLink to="/profile">Profile</NavLink>
      </li>
        </>
      }
    </>
  );
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
       <Link to='/'> <p className="font-bold text-2xl font-logo">
          {" "}
          Home<span className="text-gradient">Hero</span>
        </p></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <img className="w-8 h-8 rounded-full mr-3" src={user.photoURL || "https://i.ibb.co/Kz0jptXW/profile.jpg"} alt="" />
            <p className="font-bold mr-3 text-xl">{user.displayName || "User"}</p>
            <button onClick={handleLogOut} className="btn-primary">Logout</button>
          </>
        ) : (
          <>
            <Link
              className="btn btn-primary mr-5 inter-font font-medium"
              to="/login"
            >
              Login
            </Link>
            <Link className="btn btn-primary" to="/register">
              {" "}
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
