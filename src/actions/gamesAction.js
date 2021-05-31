import axios from "axios";
import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchGameURL,
} from "../api";

//Create action

export const loadGames = () => async (dispatch) => {
  const popularGamesData = await axios.get(popularGamesURL());
  const newGamesData = await axios.get(newGamesURL());
  const upcomingGamesData = await axios.get(upcomingGamesURL());

  dispatch({
    type: "FETCH_GAMES",
    payload: {
      popularGamesData: popularGamesData.data.results,
      upcomingGamesData: upcomingGamesData.data.results,
      newGamesData: newGamesData.data.results,
    },
  });
};

export const fetchSearch = (game) => async (dispatch) => {
  const searchGames = await axios.get(searchGameURL(game));

  dispatch({
    type: "FETCH_SEARCHED_GAMES",
    payload: {
      searchedGames: searchGames.data.results,
    },
  });
};
