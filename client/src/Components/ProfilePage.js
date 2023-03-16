import React, { useContext, useState } from "react";
import { UserContext } from "../Context/user";
import AddAvatarForm from "./AddAvatarForm";

function ProfilePage() {
  const { user } = useContext(UserContext);
  const [addAvatar, setAddAvatar] = useState(false);

  console.log('user', user.comments)

  function handleAddAvatar() {
    setAddAvatar(!addAvatar)
  }

  return (
    <div>
      <h1 className="mt-1 text-5xl font-medium leading-tight">Welcome, {user.username}!</h1>
      <h2 className="mt-1 text-4xl">You can update your profile settings here!</h2>
      <img className="h=[100px] w-[100px] object-cover" src={user?.avatar} />
      {addAvatar ? 
        <button className="border" onClick={handleAddAvatar}>Cancel</button> :
        <button className="border" onClick={handleAddAvatar}>{user.avatar ? "Update Avatar?" : "Add Avatar?"}</button>
      }
      {addAvatar ? <AddAvatarForm /> : null}
    </div>
  )
}

export default ProfilePage;