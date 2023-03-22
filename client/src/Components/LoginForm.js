import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { UserContext } from "../Context/user";
import { Redirect } from "react-router-dom";

function LoginForm() {
  // const { user, setUser } = useContext(UserContext);
  const dispatch = useDispatch();
  const user = useSelector(state => state);
  const [toHome, setToHome] = useState(false);
  // sets the form's state
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
            dispatch({ type: "set-user", payload: user })
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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="border"
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <br></br>
        <label htmlFor="password">Password</label>
        <input
          className="border"
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br></br>
        <button type="submit" className="border-slate-400 bg-slate-200">
          {isLoading ? "Loading..." : "Login"}
        </button>
        <br></br>
        {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
      </form>
    </div>
  )
}

export default LoginForm;