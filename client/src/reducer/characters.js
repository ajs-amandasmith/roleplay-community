export function addCharacter(character) {
  return {
    type: "characters/add",
    payload: character
  }
}