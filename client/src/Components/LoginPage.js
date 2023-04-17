import React from "react";
import LoginForm from "./LoginForm";

function LoginPage() {

  return (
    <>
      <h1 className="h1-welcome">Welcome to Roleplay Community!</h1>
      <h2 className="">Please Log In</h2>
      <div className="div-welcome py-5">
        <LoginForm />
      </div>
      
    </>
  )
}

export default LoginPage;