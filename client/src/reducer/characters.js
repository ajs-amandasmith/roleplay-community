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
      return state.filter(character => character.id !== action.payload.id);

    case "characters/avatar/add":
      return state.map(character => {
        if (character.id === action.payload.id) return action.payload;
        return character
      })

    case "characters/update":
      return state.map(character => {
        if (character.id === action.payload.id) return action.payload;
        return character
      })

    case "user/get/loaded":
      if (action.payload.errors) return state;
      return action.payload.characters

    default:
      return state;
  }
}