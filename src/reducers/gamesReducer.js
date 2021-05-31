const initialState = {
  popularGames: [],
  newGames: [],
  upcomingGames: [],
  searchedGames: [],
  isSearched: null,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {
        ...state,
        popularGames: action.payload.popularGamesData,
        newGames: action.payload.newGamesData,
        upcomingGames: action.payload.upcomingGamesData,
      };
    case "FETCH_SEARCHED_GAMES":
      return {
        ...state,
        searchedGames: action.payload.searchedGames,
        isSearched: true,
      };
    case "CLEAR_SEARCHED_GAMES":
      return { ...state, searchedGames: [], isSearched: null };
    default:
      return { ...state };
  }
};

export default gamesReducer;
