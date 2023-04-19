import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

function DeleteCharacter({ character, updateAllPosts }) {
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);

  function handleDelete() {
    setIsDeleted(false);
    fetch(`/characters/${character.id}`, {
      method: "DELETE"
    })
      dispatch({ type: "characters/remove", payload: character})
      setIsDeleted(true);
      updateAllPosts(character, "character-delete")
  }

  if (isDeleted) {
    return <Redirect to="/profile" />
  }

  return (
    <div>
      <button className="btn-cancel" onClick={handleDelete}>Delete Character?</button>
    </div>
  )
}

export default DeleteCharacter;