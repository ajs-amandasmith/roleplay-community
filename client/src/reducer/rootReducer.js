import { combineReducers } from "redux";
import userReducer from "./user";
import charactersReducer from "./characters";
import postsReducer from "./posts";
import signedUp from "./signedUp";
import allCharacters from "./allCharacters";

const rootReducer = combineReducers({
  user: userReducer,
  characters: charactersReducer,
  posts: postsReducer,
  signedUp: signedUp,
  allCharacters: allCharacters
})

export default rootReducer;