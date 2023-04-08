// Action Creators:
export function fetchUser() {
  return function (dispatch) {
    dispatch({ type: "user/get/loading" });
    fetch("/me").then(r => {
      if(r.ok) {
        r.json().then(user => {
          dispatch({ type: "user/get/loaded", payload: user });
        })
      } else {
        r.json().then(err => {
          dispatch({ type: "user/get/loaded", payload: err })
        })
      }
    })
  }
}

// Reducers
const initialState = { 
  user: {},
  status: "idle"
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case "user/get/loaded":
      return {
        ...state,
        status: "idle",
        user: action.payload
      };

    case "user/get/loading":
      return {
        user: {},
        status: "loading"
      }

    case "user/remove":
      return {
        ...state,
        user: {}
      }

    case "user/avatar/update":
      return {
        ...state,
        user: {
          avatar: action.payload
        }
      }

    default:
      return state;
  }
}