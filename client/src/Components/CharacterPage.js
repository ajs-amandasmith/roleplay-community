import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddCharacterForm from "./AddCharacterForm";
import { useSelector } from "react-redux";
import blank_avatar from '../images/blank_avatar.png';

function CharacterPage() {
  const status = useSelector(state => state.status)
  const allCharacters = useSelector(state => state.allCharacters)
  const [addCharacter, setAddCharacter] = useState(false);

  const displayCharacters = allCharacters.map(character => (
    <div key={character.id} className="post-list-item">
      <Link to={`/characters/${character.id}`}>
        <h3 className="ml-2">{character.name}</h3>
        <p className="post-list-user">User: {character.user.username}</p>
        <img className="h=[100px] w-[100px] object-cover ml-2 mb-4" src={typeof character.avatar == "string" ? character.avatar : blank_avatar} alt='character-avatar' />
        {character.about ? <p className="post-post">About: {character.about}</p> : null}
      </Link>
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