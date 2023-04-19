const initialState = {
  signedUp: false
};

export default function postsReducer(state = initialState, action) {
  switch(action.type) {
    case "signed-up":
      return {
        ...state,
        signedUp: true
      };
    
      case "done":
        return {
          ...state,
          signedUp: false
        }
    
    default:
      return state;
  }
}