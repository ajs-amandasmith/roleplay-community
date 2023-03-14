import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/user";

function NavBar() {
  const { user, setUser } = useContext(UserContext);

  // logout function
  function handleLogout() {
    fetch("/logout", 
      { method: "DELETE" }
    ).then(r => {
      if(r.ok) {
        setUser(null)
      }
    })
  }

  return (
    <div className="bg-sky-600">
      <NavLink to="/" className=" text-white p-1">Home</NavLink>
      {user ? <NavLink to="/profile" className=" text-white p-1">Profile</NavLink> : null}
      {user ? <NavLink to="/characters" className=" text-white p-1">Characters</NavLink> : null}
      {user ? null : <NavLink to="/login" className=" text-white p-1">Login</NavLink>}
      {user ? <NavLink to="/logout" className=" text-white p-1" onClick={handleLogout}>Logout</NavLink> : null}
      {user ? null : <NavLink to="/signup" className=" text-white p-1">Signup</NavLink>}
    </div>
  )
}

export default NavBar;