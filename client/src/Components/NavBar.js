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
    <div className="flex bg-sky-600">
      <div className=" text-white p-1">
        <NavLink to="/" >
          Home
        </NavLink>
      </div>
      <div className=" text-white p-1">
        {
          user.errors || Object.keys(user).length === 0  ? 
            null : 
            <NavLink to="/profile">
              Profile
            </NavLink>
        }
      </div>
      <div className=" text-white p-1">
        {
          user.errors || Object.keys(user).length === 0 ? 
            null : 
            <NavLink to="/characters">
              Characters
            </NavLink>
        }
      </div>
      <div className=" text-white p-1">
        {
          user.errors || Object.keys(user).length === 0 ? 
            <NavLink to="/login">
              Login
            </NavLink> :
            null
        } 
      </div>
      <div className=" text-white p-1">
        {
          user.errors || Object.keys(user).length === 0 ? 
            null : 
            <NavLink to="/" onClick={handleLogout}>
              Logout
            </NavLink>
        }
      </div>
      <div className="flex justify-end text-white p-1">
        {
          user.errors || Object.keys(user).length === 0 ? 
            <NavLink to="/signup">
              Signup
            </NavLink> : 
            null
        }
      </div>
    </div>
  )
}

export default NavBar;