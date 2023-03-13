import React, { useContext } from "react";
import { UserContext } from "../Context/user";

function ProfilePage() {
  const { user, setUser } = useContext(UserContext);

  console.log('user', user)

  return (
    <div>
      <h1 className="mt-1 text-5xl font-medium leading-tight">Welcome, {user.username}!</h1>
      <h2 className="mt-1 text-4xl">You can update your profile settings here!</h2>
      
    </div>
  )
}

export default ProfilePage;