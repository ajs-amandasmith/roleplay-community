import { combineReducers } from "redux";
import userReducer from "./user";
import charactersReducer from "./characters";

const rootReducer = combineReducers({
  user: userReducer,
  characters: charactersReducer
})

export default rootReducer;