import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../Context/user";

function NavBar() {
  // const { user, setUser } = useContext(UserContext);
  const user = useSelector(state => state)
  const dispatch = useDispatch();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // logout function
  function handleLogout() {
    fetch("/logout", 
      { method: "DELETE" }
    ).then(r => {
      if(r.ok) {
        dispatch({ type: "remove-user"})
        setIsLoggedOut(true);
      }
    })
  }
  console.log('user', user);

  return (
    <div className="bg-sky-600">
      <NavLink to="/" className=" text-white p-1">Home</NavLink>
      {Object.keys(user).length > 0 ? <NavLink to="/profile" className=" text-white p-1">Profile</NavLink> : null}
      {Object.keys(user).length > 0 ? <NavLink to="/characters" className=" text-white p-1">Characters</NavLink> : null}
      {Object.keys(user).length > 0 ? null : <NavLink to="/login" className=" text-white p-1">Login</NavLink>}
      {Object.keys(user).length > 0 ? <NavLink to="/" className=" text-white p-1" onClick={handleLogout}>Logout</NavLink> : null}
      {Object.keys(user).length > 0 ? null : <NavLink to="/signup" className=" text-white p-1">Signup</NavLink>}
    </div>
  )
}

export default NavBar;