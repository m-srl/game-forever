import React, { useState } from "react";

import styled from "styled-components";
import { motion } from "framer-motion";

import logo from "../assets/img/game-forever-nobg.png";

import { fetchSearch } from "../actions/gamesAction";
import { useDispatch } from "react-redux";

const Nav = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [searched, setSearched] = useState(false);

  const inputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (searchInput !== "") {
      setSearchInput("");
      setSearched(true);
      dispatch(fetchSearch(searchInput));
    } else {
      alert("Search field cannot be empty");
    }
  };
  const clearSearch = (e) => {
    e.preventDefault();
    if (searched) {
      dispatch({ type: "CLEAR_SEARCHED_GAMES" });
      setSearched(false);
    } else {
      alert("There is nothing to clear");
    }
  };
  return (
    <StyledNav>
      <Logo>
        <a href="/game-forever">
          <img src={logo} alt="logo" />
        </a>
      </Logo>
      <StyledSearch>
        <input
          value={searchInput}
          onChange={inputHandler}
          className="search"
          type="text"
          placeholder="Search games..."
        />
        <button onClick={submitSearch} type="submit" className="search">
          Search
        </button>
        <button onClick={clearSearch} type="submit" className="clear">
          Clear results
        </button>
      </StyledSearch>
    </StyledNav>
  );
};

const StyledNav = styled(motion.nav)`
  padding: 3rem 5rem;
  text-align: center;
  position: relative;
  background: #9e9e9e;
`;
const Logo = styled(motion.div)`
  margin-bottom: 2rem;

  a {
    display: inline-block;
  }
  img {
    margin: 0 auto;
    cursor: pointer;
    transition: transform 1s ease;
    &:hover {
      transform: scale(1.2);
    }
  }

  @media screen and (max-width: 500px) {
    img {
      width: 80%;
    }
  }
`;
const StyledSearch = styled(motion.form)`
  input {
    width: 30%;
    font-size: 1.6rem;
    padding: 0.5rem;
    border: none;
    margin-top: 1rem;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    outline-color: red;
    font-weight: 500;
    font-family: "Montserrat", sans-serif;
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;

    &:focus {
      outline: none;
      box-shadow: inset 0 0 2px 2px red;
    }
  }

  button {
    font-family: "Montserrat", sans-serif;
    font-size: 1.6rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: red;
    color: white;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    transition: all 1s ease;

    &:hover {
      background: #d30303;
    }
  }
  .clear {
    display: block;
    margin: 2rem auto;
  }
  @media screen and (max-width: 1220px) {
    input {
      width: 50%;
    }
  }
  @media screen and (max-width: 768px) {
    input {
      display: block;
      font-size: 1.1rem;
      margin: auto;
      margin-bottom: 2rem;
    }
    button {
      font-size: 1.1rem;
    }
  }
  @media screen and (max-width: 500px) {
    input {
      width: 80%;
      display: block;
      font-size: 0.7rem;
      margin: auto;
      margin-bottom: 2rem;
    }
    button {
      font-size: 0.7rem;
    }
  }
`;

export default Nav;
