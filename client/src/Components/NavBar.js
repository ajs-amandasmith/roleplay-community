import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function NavBar() {
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // logout function
  function handleLogout() {
    setIsLoggedOut(false)
    fetch("/logout", 
      { method: "DELETE" }
    ).then(r => {
      if(r.ok) {
        dispatch({ type: "user/remove"})
        setIsLoggedOut(true);
      }
    })
  }

  if (isLoggedOut) {
    <Redirect to="/" />
  }

  return (
    <div className="bg-sky-600">
      <NavLink to="/" className=" text-white p-1">Home</NavLink>
      {user.errors || Object.keys(user).length === 0  ? null : <NavLink to="/profile" className=" text-white p-1">Profile</NavLink>}
      {user.errors || Object.keys(user).length === 0 ? null : <NavLink to="/characters" className=" text-white p-1">Characters</NavLink>}
      {user.errors || Object.keys(user).length === 0 ? <NavLink to="/login" className=" text-white p-1">Login</NavLink> : null}
      {user.errors || Object.keys(user).length === 0 ? null : <NavLink to="/" className=" text-white p-1" onClick={handleLogout}>Logout</NavLink>}
      {user.errors || Object.keys(user).length === 0 ? <NavLink to="/signup" className=" text-white p-1">Signup</NavLink> : null}
    </div>
  )
}

export default NavBar;