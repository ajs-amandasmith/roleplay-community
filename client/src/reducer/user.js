const initialState = { 
  user: {},
  status: "idle"
};

export function fetchUser() {
  return function (dispatch) {
    dispatch({ type: "set-user-loading" });
    fetch("/me").then(r => {
      if(r.ok) {
        r.json().then(user => {
          dispatch({ type: "set-user-loaded", payload: user });
        })
      } else {
        r.json().then(err => {
          dispatch({ type: "set-user-loaded", payload: err })
        })
      }
    })
  }
}

// useEffect(() => {
//   return function (dispatch) {
//     fetch("/me").then((r) => {
//       if(r.ok) {
//         r.json().then((data) => {
//           dispatch({ type: "set-user", payload: data})
//         })
//       }
//     })
//   }
// })

export function addCharacter(character) {
  return { type: "add-character", payload: character }
}

function userReducer(state = initialState, action) {
  switch(action.type) {
    case "set-user-loaded":
      return {
        ...state,
        status: "idle",
        user: action.payload
      };
    case "set-user-loading":
      return {
        ...state,
        status: "loading"
      }
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