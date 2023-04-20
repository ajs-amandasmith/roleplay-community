import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function AddAvatarForm({ addAvatar, setAddAvatar }) {
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const user = useSelector(state => state);
  const dispatch = useDispatch();
  const [noAvatar, setNoAvatar] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setNoAvatar(false);
    if (avatar === "" ) {
      setNoAvatar(true);
    } else {
      const formData = new FormData();
      formData.append('avatar', avatar);
      fetch(`/users/${user.id}`, {
        method: "PATCH",
        body: formData
      })
        .then((r) => {
          if (r.ok) {
            r.json().then(data => {
              dispatch({ type: 'user/avatar/update', payload: data.avatar})
              setAddAvatar(!addAvatar)
            })
          } else {
            r.json().then((err) => setError(err.error))
          }
        })
    }
  }

  return (
    <div className="div-welcome m-0">
      <form onSubmit={handleSubmit}>
        <label htmlFor="avatar">Update Avatar</label>
        <input id="avatar" type="file" accept="image" className="border" onChange={e => setAvatar(e.target.files[0])} ></input>
        <button type="submit" className="btn-confirm">Submit Image</button>
      </form>
      {noAvatar ? <p className="text-rose-500">No file attached</p> : null}
      {error === "Internal Server Error" ? <p className="text-rose-500">No file attached</p> : null }
    </div>
  )
}

export default AddAvatarForm;