import React from "react";
import HomePage from "./HomePage";
import AboutSite from "./AboutSite";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function LandingPage({ allPosts, updateAllPosts, allTags }) {
  const user = useSelector(state => state.user.user);
  const signedUp = useSelector(state => state.signedUp.signedUp)


  if (signedUp) {
    return <Redirect to="/profile" />
  }


  return (
    <>
      {
        user.errors || Object.keys(user).length === 0 ? 
        <>
          <AboutSite />
        </> : 
          <HomePage allPosts={allPosts} updateAllPosts={updateAllPosts} allTags={allTags} />
      }
    </>
  )
}

export default LandingPage;