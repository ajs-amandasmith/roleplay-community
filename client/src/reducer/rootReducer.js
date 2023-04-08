import { combineReducers } from "redux";
import userReducer from "./user";
import charactersReducer from "./characters";
import postsReducer from "./posts";

const rootReducer = combineReducers({
  user: userReducer,
  characters: charactersReducer,
  posts: postsReducer
})

export default rootReducer;