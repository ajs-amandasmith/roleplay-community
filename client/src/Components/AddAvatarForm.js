import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function AddAvatarForm({ addAvatar, setAddAvatar }) {
  const [avatar, setAvatar] = useState();
  // const [errors, setErrors] = useState();
  const user = useSelector(state => state);
  const dispatch = useDispatch();

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
          // r.json().then(data => setUser(data))
          r.json().then(data => {
            console.log('data', data)
            console.log('formData', formData)
            dispatch({ type: 'user/avatar/update', payload: data.avatar})
            setAddAvatar(!addAvatar)
          })
        } else {
          // r.json().then((err) => setErrors(err.errors))
        }
      })
  }

  return (
    <div className="div-welcome m-0">
      <form onSubmit={handleSubmit}>
        <label htmlFor="avatar">Update Avatar</label>
        <input id="avatar" type="file" accept="image" className="border" onChange={e => setAvatar(e.target.files[0])} ></input>
        <button type="submit" className="btn-confirm">Submit Image</button>
      </form>
    </div>
  )
}

export default AddAvatarForm;