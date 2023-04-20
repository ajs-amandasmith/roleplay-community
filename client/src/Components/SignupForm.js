import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SignupForm({ setSignedUp }) {
  // set form's state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const signedUp = useSelector(state => state.signedUp.signedUp)
  
  const dispatch = useDispatch();

  // submit form function
  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirm
      })
    }).then(r => {
      setIsLoading(false);
      if(r.ok) {
        r.json().then(user => {
          dispatch({ type: "user/get/loaded", payload: user})
          dispatch({type: "signed-up"})
        })
      } else {
        r.json().then(err => setErrors(err.errors))
      }
    })
  }

  if (signedUp) {
    return <Redirect to="/profile" />
  }

  // displayed form
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="username">Username:</label> */}
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="ml-2 mb-4"
        />
        <br></br>
        {/* <label htmlFor="password">Password:</label> */}
        <input
          className="ml-2"
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br></br>
        {/* <label htmlFor="password-confirmation">Confirm Password:</label> */}
        <input
          className="ml-2 mb-4"
          placeholder="Confirm Password"
          type="password"
          id={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <br></br>
        <button type="submit" className="btn-confirm">
          {isLoading ? "Loading..." : "Signup"}
        </button>
        {errors.map(err => (
          <p key={err} className="text-rose-400">{err}</p>
        ))}
      </form>
    </>
  )
}

export default SignupForm;