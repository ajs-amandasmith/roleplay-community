// Action Creators:

// Reducers
const initialState = [];

export default function postsReducer(state = initialState, action) {
  switch(action.type) {
    case "posts/add":
      return [...state, action.payload];
    
    case "posts/remove":
      return state.filter(post => post.id !== action.payload.id);

    case "posts/update":
      return state.map(post => {
        if (post.id === action.payload.id) return action.payload;
        return post;
      })

    case "posts/image/add":
      return state.map(post => {
        if (post.id === action.payload.id) return action.payload;
        return post
      })

    case "user/get/loaded":
      return action.payload.posts

    default:
      return state;
  }
}