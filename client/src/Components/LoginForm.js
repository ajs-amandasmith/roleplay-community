import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const [toHome, setToHome] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // submit form function
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(r => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then(user => {
            // setUser(user);
            dispatch({ type: "user/get/loaded", payload: user })
            setToHome(true);
          })
        } else {
          r.json().then(err => setErrors(err.errors))
        }
      })
  }

  // takes the user to the Home Page after logging in
  if (toHome) {
    return <Redirect to="/" />
  }

  // displayed form
  return (
    <>
      <form onSubmit={handleSubmit} className="form-login">
        {/* <label htmlFor="login-username">Username:</label> */}
        <input
          type="text"
          className="ml-2"
          placeholder="Username"
          id="login-username"
          value={username}
           onChange={e => setUsername(e.target.value)}
        />
         <br></br>
        {/* <label htmlFor="login-password">Password:</label> */}
        <input
          className="ml-2"
          type="password"
          placeholder="Password"
          id="login-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br></br>
        <button type="submit" className="btn-confirm">
          {isLoading ? "Loading..." : "Login"}
        </button>
        <br></br>
        {errors.map(err => (
          <p key={err} className="text-rose-400">{err}</p>
        ))}
      </form>
    </>
  )
}

export default LoginForm;