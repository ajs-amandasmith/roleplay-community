import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function AboutSite() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  console.log("login", login)
  console.log("signup", signup);

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-300 py-6">
      <h1 className="h1-welcome">Welcome to Roleplay Community!</h1>
      <div className="div-welcome">
        <div className="about-info">
          <p>Hello! Here you can roleplay with your own characters all under one account.</p>
          <p>You can start by making an account and from there create your characters. With your characters,  you can make posts or comment on someone else's.</p>
          <p>Let the stories commence!</p>
        </div>
        <div className="login-welcome">
          {login ? <LoginForm /> : null}
          {signup ? <SignupForm /> : null}
          {login || signup ? 
            <button 
              className="btn-cancel" 
              onClick={e => {
                setLogin(false)
                setSignup(false)
              }}>
                Cancel
            </button> : 
            <div className="flex flex-col space-y-4 pb-4">
              <button className="btn-confirm" onClick={e => setSignup(true)}>Sign Up</button>
              <button className="btn-confirm" onClick={e => setLogin(true)}>Log In</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default AboutSite;