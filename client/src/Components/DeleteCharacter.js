import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

function DeleteCharacter({ character }) {
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);

  function handleDelete() {
    setIsDeleted(false);
    fetch(`/characters/${character.id}`, {
      method: "DELETE"
    })
      dispatch({ type: "characters/remove", payload: character})
      setIsDeleted(true);
  }

  if (isDeleted) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <button className="border-slate-400 bg-slate-200" onClick={handleDelete}>Delete Character?</button>
    </div>
  )
}

export default DeleteCharacter;