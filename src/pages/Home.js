import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";

//import components
import Game from "../components/Game";
import GameDetails from "../components/GameDetails";

//imoirt style, animations
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useLocation } from "react-router-dom";

import "../index.css";

const Home = () => {
  //get the location of the page
  const location = useLocation();
  // location of game id
  const pathId = location.pathname.split("/")[2];

  //Fetch Games
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);
  //get fetched data
  const { popularGames, upcomingGames, newGames, searchedGames, isSearched } =
    useSelector((state) => state.games);

  return (
    <GameList>
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {pathId && <GameDetails pathId={pathId} />}
        </AnimatePresence>
        {isSearched !== null ? (
          isSearched === true ? (
            searchedGames.length > 0 ? (
              <Searched>
                <h2>Search Results</h2>
                <Games>
                  {searchedGames.map((game) => (
                    <Game
                      name={game.name}
                      releaseDate={game.released}
                      id={game.id}
                      image={game.background_image}
                      key={game.id}
                    />
                  ))}
                </Games>
              </Searched>
            ) : (
              <div>
                <h2 className="search-no-results">
                  Search Results <span>(0)</span>{" "}
                </h2>
                <p className="search-no-results">No matching results... </p>
              </div>
            )
          ) : null
        ) : null}

        <h2>Upcoming Games</h2>
        <Games>
          {upcomingGames.map((game) => (
            <Game
              name={game.name}
              releaseDate={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <h2>Popular Games</h2>
        <Games>
          {popularGames.map((game) => (
            <Game
              name={game.name}
              releaseDate={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
        <h2>New Games</h2>
        <Games>
          {newGames.map((game) => (
            <Game
              name={game.name}
              releaseDate={game.released}
              id={game.id}
              image={game.background_image}
              key={game.id}
            />
          ))}
        </Games>
      </AnimateSharedLayout>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0 5rem;
  h2 {
    padding: 5rem 0;
    font-family: "Gaming Font";
  }
  h2.search-no-results {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    span {
      font-family: sans-serif;
      font-style: italic;
      font-weight: bold;
    }
  }
  p.search-no-results {
    margin-bottom: 5rem;
  }
  @media screen and (max-width: 1220px) {
    h2 {
      font-size: calc(0.75rem + 3vw);
      text-align: center;
    }
    p.search-no-results {
      text-align: center;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;
const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 3rem;
  margin-bottom: 3rem;
  @media screen and (max-width: 1220px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
  }
  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const Searched = styled(motion.div)`
  ${Games} {
    min-height: 40vh;
  }
`;

export default Home;
