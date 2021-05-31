//Starting URL
const starting_url = "https://api.rawg.io/api/";

// Current Date
const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};

const currentDay = getCurrentDay();
const currentMonth = getCurrentMonth();
const currentYear = new Date().getFullYear();

const prevYearDate = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYearDate = `${currentYear + 1}-${currentMonth}-${currentDay}`;
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

const API_KEY = "0bfb6886907f48a2aa311350195e33e4";

// Popular Games
const popularGames = `games?key=${API_KEY}&dates=${prevYearDate},${currentDate}&ordering=-rating&page_size=12`;
const upcomingGames = `games?key=${API_KEY}&dates=${currentDate},${nextYearDate}&ordering=-added&page_size=12`;
const newGames = `games?key=${API_KEY}&dates=${prevYearDate},${currentDate}&ordering=-released&page_size=12`;

export const popularGamesURL = () => `${starting_url}${popularGames}`;
export const upcomingGamesURL = () => `${starting_url}${upcomingGames}`;
export const newGamesURL = () => `${starting_url}${newGames}`;

//Get specific game details

export const gameDetailsURL = (gameId) =>
  `${starting_url}games/${gameId}?key=${API_KEY}`;

export const screenshotsURL = (gameId) =>
  `${starting_url}games/${gameId}/screenshots?key=${API_KEY}`;

export const searchGameURL = (game) =>
  `${starting_url}games?key=${API_KEY}&search=${game}&page_size=6`;
