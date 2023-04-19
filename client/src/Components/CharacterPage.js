import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddCharacterForm from "./AddCharacterForm";
import { useSelector } from "react-redux";
import blank_avatar from '../images/blank_avatar.png';
import AddCharacterAvatarForm from "./AddCharacterAvatarForm";

function CharacterPage() {
  const status = useSelector(state => state.status)
  const allCharacters = useSelector(state => state.allCharacters)
  const [addCharacter, setAddCharacter] = useState(false);

  const displayCharacters = allCharacters.map(character => (
    <div key={character.id} className="post-list-item">
      <Link to={`/characters/${character.id}`}><h3 className="ml-2">{character.name}</h3></Link>
      <p className="post-list-user">User: {character.user.username}</p>
      <img className="h=[100px] w-[100px] object-cover ml-2" src={typeof character.avatar == "string" ? character.avatar : blank_avatar} alt='character-avatar' />
      <p className="post-post">About: {character.about}</p>
      <AddCharacterAvatarForm character={character} />
    </div>
  ))

  return (
    <>
      {status === "loading" ? "Loading..." :
        <div className="flex flex-col">
          <h1>All Characters</h1>
          {addCharacter ? <button className="btn-cancel place-self-center" onClick={e => setAddCharacter(false)}>Cancel</button> : <button className="btn-confirm place-self-center" onClick={e => setAddCharacter(true)}>Add Character?</button>}
          {addCharacter ? <AddCharacterForm setAddCharacter={setAddCharacter} /> : null}
          <div className="post-list">
            {displayCharacters}
          </div>
        </div>
      }
    </>
  )
}

export default CharacterPage;