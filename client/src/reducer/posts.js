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
      if (action.payload.errors) return state;
      return action.payload.posts

      case "characters/remove":
        const payloadPosts = action.payload.posts
        return state.filter(post => {
          return payloadPosts.every(payload => {
            return payload.id !== post.id
          })
        })

    default:
      return state;
  }
}