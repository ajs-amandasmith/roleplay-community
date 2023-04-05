import React from "react";
import AddCharacterForm from "./AddCharacterForm";
import { useSelector } from "react-redux";
import blank_avatar from '../images/blank_avatar.png';
import AddCharacterAvatarForm from "./AddCharacterAvatarForm";

function CharacterPage() {
  const user = useSelector(state => state.user)
  const status = useSelector(state => state.status)
  const characters = user.characters
  console.log(characters)

  const displayCharacters = characters.map(character => (
    <div key={character.id}>
      <h3>{character.name}</h3>
      <img className="h=[100px] w-[100px] object-cover" src={typeof character.avatar == "string" ? character.avatar : blank_avatar} alt='character-avatar' />
      <AddCharacterAvatarForm character={character} />
    </div>
  ))

  console.log('user', typeof user.avatar)
  console.log(typeof characters[0].avatar)

  return (
    <div>
      {status === "loading" ? "Loading..." :
        <div>
          <AddCharacterForm />
          Character Page
          {displayCharacters}
        </div>
      }
    </div>
  )
}

export default CharacterPage;