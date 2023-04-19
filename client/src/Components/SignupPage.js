import React from "react";
import SignupForm from "./SignupForm";

function SignupPage({ signedUp, setSignedUp }) {

  return (
    <>
      <h1 className="h1-welcome">Welcome to Roleplay Community!</h1>
      <h2 className="">Please Feel Welcome to Sign Up</h2>
      <div className="div-welcome py-5">
        <SignupForm signedUp={signedUp} setSignedUp={setSignedUp} />
      </div>
    
    </>
  )
}

export default SignupPage;