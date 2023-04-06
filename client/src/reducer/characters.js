//Action Creators:
export function addCharacter(character) {
  return {
    type: "characters/add",
    payload: character
  }
}

export function removeCharacter(id) {
  return {
    type: "characters/remove",
    payload: id
  }
}

// Reducers:
const initialState = [];

export default function charactersReducer(state = initialState, action) {
  switch (action.type) {
    case "characters/add":
      return [
        ...state, action.payload
      ]

    case "characters/remove":
      return state.filter(character => character.id !== action.payload);

    case "user/get/loaded":
      return action.payload.characters

    default:
      return state;
  }
}