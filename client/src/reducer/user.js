const initialState = { };

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
    default:
      return state;
  }
}



export default userReducer;