const initialState = { };

export function addCharacter(character) {
  return { type: "add-character", payload: character }
}

function userReducer(state = initialState, action) {
  switch(action.type) {
    case "set-user":
      state = action.payload
      return state;
    case "remove-user":
      state = { };
      return state;
    case "update-avatar":
      return {
        ...state,
        avatar: action.payload
       }
       case "add-character":
        return {
          ...state,
          characters: [...state.characters, action.payload]
        }
    default:
      return state;
  }
}



export default userReducer;