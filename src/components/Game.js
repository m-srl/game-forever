import React from "react";

//import style, animations
import styled from "styled-components";
import { motion } from "framer-motion";

import { useDispatch } from "react-redux";

import { loadDetails } from "../actions/gameDetailsAction";

import { Link } from "react-router-dom";

import { smallImage } from "../util";
import missingImage from "../assets/img/missing-image.jpg";

const Game = ({ name, id, releaseDate, image }) => {
  const convertIdToString = id.toString();
  const dispatch = useDispatch();

  const loadDetailsHandler = () => {
    dispatch(loadDetails(id));

    document.body.style.overflow = "hidden";
    document.querySelector(".App").style.paddingRight = "12px";
  };

  return (
    <StyledGame
      layoutId={`container${convertIdToString}`}
      onClick={loadDetailsHandler}
    >
       <Link to={`/game/${id}`}>
        <motion.h3 layoutId={`title${convertIdToString}`}>{name}</motion.h3>

        <p title="Release Date">
          {releaseDate !== null ? releaseDate : `test`}
        </p>

        <motion.img
          layoutId={`img${convertIdToString}`}
          src={image !== null ? smallImage(image, 640) : missingImage}
          alt={name}
        />
      </Link>
    </StyledGame>
  );
};

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  h3 {
    max-width: fit-content;
    text-align: center;
    display: inline-block;
    padding: 1.5rem 1rem;
  }
  &:hover {
    background: #6e6e6e;
    transition: background 1s ease;
    h3 {
      color: white;
    }
    p {
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    img {
      transition: all 1s ease;
      transform: scale(1.2);
    }
  }
`;

export default Game;
