import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();

  // logout function
  function handleLogout() {
    fetch("/logout", 
      { method: "DELETE" }
    ).then(r => {
      if(r.ok) {
        dispatch({ type: "user/remove"})
      }
    })
  }

  return (
    <div className="bg-sky-600">
      <NavLink to="/" className=" text-white p-1">Home</NavLink>
      {!user.errors  ? <NavLink to="/profile" className=" text-white p-1">Profile</NavLink> : null}
      {!user.errors ? <NavLink to="/characters" className=" text-white p-1">Characters</NavLink> : null}
      {!user.errors ? null : <NavLink to="/login" className=" text-white p-1">Login</NavLink>}
      {!user.errors ? <NavLink to="/" className=" text-white p-1" onClick={handleLogout}>Logout</NavLink> : null}
      {!user.errors ? null : <NavLink to="/signup" className=" text-white p-1">Signup</NavLink>}
    </div>
  )
}

export default NavBar;