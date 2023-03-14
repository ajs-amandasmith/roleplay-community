import React, { useContext } from "react";
import { UserContext } from "../Context/user";
import AddAvatarForm from "./AddAvatarForm";

function ProfilePage() {
  const { user } = useContext(UserContext);

  console.log('user', user)

  return (
    <div>
      <h1 className="mt-1 text-5xl font-medium leading-tight">Welcome, {user.username}!</h1>
      <h2 className="mt-1 text-4xl">You can update your profile settings here!</h2>
      <img className="h=[300px] w-[300px] object-cover" src={user?.avatar} />
      <AddAvatarForm />
    </div>
  )
}

export default ProfilePage;