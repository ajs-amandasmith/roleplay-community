import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAvatarForm from "./AddAvatarForm";
import blank_avatar from '../images/blank_avatar.png';

function ProfilePage() {
  const user = useSelector(state => state.user.user);
  const status = useSelector(state => state.user.status);
  const characters = useSelector(state => state.characters);
  const [addAvatar, setAddAvatar] = useState(false);

  const displayCharacters = characters.map(character => (
    <div key={character.id} className="p-6 rounded-lg bg-sky-500">
      <img className="h=[100px] w-[100px] object-cover" alt="character" src={typeof character.avatar === "string" ? character.avatar : blank_avatar}/>
      <p>{character.name}</p>
    </div>
  ))

  function handleAddAvatar() {
    setAddAvatar(!addAvatar)
  }

  return (
    <div>
      {status === "loading" ? "Loading..." :
      <div>
        <h1 className="mt-1 text-5xl font-medium leading-tight">Welcome, {user.username}!</h1>
        <h2 className="mt-1 text-4xl">You can update your profile settings here!</h2>
        <img className="h=[100px] w-[100px] object-cover" src={typeof user.avatar === "string" ? user.avatar : blank_avatar} alt='user profile' />
        {addAvatar ? 
          <button className="border" onClick={handleAddAvatar}>Cancel</button> :
          <button className="border" onClick={handleAddAvatar}>{user.avatar ? "Update Avatar?" : "Add Avatar?"}</button>
        }
        {addAvatar ? <AddAvatarForm addAvatar={addAvatar} setAddAvatar={setAddAvatar} /> : null}
        <div className="grid grid-cols-3 gap-2">
          {displayCharacters}
        </div>
      </div>
    }
    </div>
  )
}

export default ProfilePage;