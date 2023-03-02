import React, { useState } from "react";

function SignupForm() {
  // set form's state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        r.json().then(user => console.log('user', user))
      } else {
        r.json().then(err => setErrors(err.errors))
      }
    })
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
        <label htmlFor="password-confirmation">Confirm Password</label>
        <input
          className="border"
          type="password"
          id={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <br></br>
        <button type="submit" className="border-slate-400 bg-slate-200">
          {isLoading ? "Loading..." : "Signup"}
        </button>
        {errors.map(err => (
          <p key={err} className="text-red-600">{err}</p>
        ))}
      </form>
    </div>
  )
}

export default SignupForm;