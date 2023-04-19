// Action Creators:
export function fetchAllCharacters() {
  return function (dispatch) {
    dispatch({ type: "characters/all/get/loading" });
    fetch("/characters").then(r => {
      if(r.ok) {
        r.json().then(characters => {
          dispatch({ type: "characters/all/get/loaded", payload: characters });
        })
      } else {
        r.json().then(err => {
          dispatch({ type: "characters/all/get/loaded", payload: err })
        })
      }
    })
  }
}

// Reducers
const initialState = [];

export default function allCharactersReducer(state = initialState, action) {
  switch(action.type) {
    case "characters/all/get/loaded":
      return action.payload;

    case "characters/all/get/loading":
      return []



    case "characters/all/remove":
      return {
        ...state,
        user: {}
      }

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

    default:
      return state;
  }
}