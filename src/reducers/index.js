import { combineReducers } from "redux";
import gamesReducer from "./gamesReducer";
import gameDetailsReducer from "./gameDetailsReducer";

const allReducers = combineReducers({
  games: gamesReducer,
  details: gameDetailsReducer,
});

export default allReducers;
