const initialState = {
  user: {},
  characters: [],
  posts: [],
  comments: [],
  status: "idle"
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "user/get/loaded":
      return {
        ...state,
        status: "idle",
        user: action.payload
      }

    case "user/get/loading":
      return {
        ...state,
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

    case "characters/add":
      return {
        ...state,
        characters: [
          ...state.characters,
          action.payload
        ]
      }

    default:
      return state;
  }
}