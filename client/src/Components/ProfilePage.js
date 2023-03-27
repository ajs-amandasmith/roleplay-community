import React, { useContext, useState } from "react";
// import { UserContext } from "../Context/user";
import { useSelector } from "react-redux";
import AddAvatarForm from "./AddAvatarForm";

function ProfilePage() {
  // const { user } = useContext(UserContext);
  const user = useSelector(state => state);
  const [addAvatar, setAddAvatar] = useState(false);

  // console.log('comments', user.comments)
  // console.log('posts', user.posts)
  // console.log('characters', user.characters)

  function handleAddAvatar() {
    setAddAvatar(!addAvatar)
  }

  // console.log('profile avatar', user.avatar)

  return (
    <div>
      <h1 className="mt-1 text-5xl font-medium leading-tight">Welcome, {user.username}!</h1>
      <h2 className="mt-1 text-4xl">You can update your profile settings here!</h2>
      <img className="h=[100px] w-[100px] object-cover" src={user?.avatar} />
      {addAvatar ? 
        <button className="border" onClick={handleAddAvatar}>Cancel</button> :
        <button className="border" onClick={handleAddAvatar}>{user.avatar ? "Update Avatar?" : "Add Avatar?"}</button>
      }
      {addAvatar ? <AddAvatarForm addAvatar={addAvatar} setAddAvatar={setAddAvatar} /> : null}
    </div>
  )
}

export default ProfilePage;