import { combineReducers } from "redux";
import userReducer from "./user";
import charactersReducer from "./characters";
import postsReducer from "./posts";
import signedUp from "./signedUp";

const rootReducer = combineReducers({
  user: userReducer,
  characters: charactersReducer,
  posts: postsReducer,
  signedUp: signedUp
})

export default rootReducer;