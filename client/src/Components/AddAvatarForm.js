import React, { useState, useContext } from "react";
import { UserContext } from "../Context/user"; 

function AddAvatarForm() {
  const [avatar, setAvatar] = useState();
  const [errors, setErrors] = useState();
  const { user, setUser } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatar);
    fetch(`/users/${user.id}`, {
      method: "PATCH",
      body: formData
    })
      .then((r) => {
        if (r.ok) {
          r.json().then(data => setUser(data))
        } else {
          r.json().then((err) => setErrors(err.errors))
        }
      })

  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="avatar">Update Avatar</label>
      <input id="avatar" type="file" accept="image" className="border" onChange={e => setAvatar(e.target.files[0])} ></input>
      <button type="submit" className="border-slate-400 bg-slate-200">Submit Image</button>
    </form>
  )
}

export default AddAvatarForm;