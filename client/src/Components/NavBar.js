import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {

  return (
    <div className="bg-sky-600">
      <NavLink to="/home" className=" text-white p-1">Home</NavLink>
      <NavLink to="/profile" className=" text-white p-1">Profile</NavLink>
      <NavLink to="/characters" className=" text-white p-1">Characters</NavLink>
      <NavLink to="/login" className=" text-white p-1">Login</NavLink>
      <NavLink to="/logout" className=" text-white p-1">Logout</NavLink>
      <NavLink to="/signup" className=" text-white p-1">Signup</NavLink>
    </div>
  )
}

export default NavBar;