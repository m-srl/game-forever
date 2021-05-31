import React, { useEffect, useState } from "react";
// component style
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
//redux
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
//game images
import { smallImage } from "../util";

//platform icons
import playstation from "../assets/img/playstation.svg";
import nintendo from "../assets/img/nintendo.svg";
import xbox from "../assets/img/xbox.svg";
import apple from "../assets/img/apple.svg";
import macos from "../assets/img/macos.svg";
import gamepad from "../assets/img/gamepad.svg";
import linux from "../assets/img/linux.svg";
import windows from "../assets/img/windows.svg";

//rating stars
import starEmpty from "../assets/img/star-empty.png";
import starFull from "../assets/img/star-full.png";
import starHalf from "../assets/img/star-half.png";

import missingImage from "../assets/img/missing-image.jpg";

const GameDetails = ({ pathId }) => {
  const history = useHistory();

  const exitDetailsHandler = (e) => {
    const element = e.target;

    if (element.classList.contains("overlay") || e.key === "Escape") {
      history.push("/game-forever/");
      setTimeout(() => {
        document.body.style.overflow = "auto";
        document.querySelector(".App").style.paddingRight = "0";
      }, 1300);
    }
  };

  // Get platform icons
  const getPlatformIcons = (platform) => {
    switch (platform) {
      case "PlayStation":
        return playstation;
      case "Xbox":
        return xbox;
      case "PC":
        return windows;
      case "Nintendo":
        return nintendo;
      case "iOS":
        return apple;
      case "macOS":
        return macos;
      case "Apple Macintosh":
        return macos;
      case "Linux":
        return linux;
      default:
        return gamepad;
    }
  };

  // Number of stars logic
  const getStars = () => {
    const stars = [];
    const intRating = Math.floor(game.rating);
    const ratingRemainder = game.rating - intRating;

    for (let i = 1; i <= 5; i++) {
      if (i <= intRating) {
        stars.push(
          <img
            alt="star"
            key={i}
            src={starFull}
            title={`Game rating: ${game.rating}`}
          />
        );
      } else if (
        ratingRemainder > 0.25 &&
        ratingRemainder < 0.75 &&
        i <= intRating + 1
      ) {
        stars.push(
          <img
            alt="star"
            key={i}
            src={starHalf}
            title={`Game rating: ${game.rating}`}
          />
        );
      } else if (ratingRemainder >= 0.75 && i <= intRating + 1) {
        stars.push(
          <img
            alt="star"
            key={i}
            src={starFull}
            title={`Game rating: ${game.rating}`}
          />
        );
      } else {
        stars.push(
          <img
            alt="star"
            key={i}
            src={starEmpty}
            title={`Game rating: ${game.rating}`}
          />
        );
      }
    }
    return stars;
  };

  const { game, screenshots, isLoading } = useSelector(
    (state) => state.details
  );

  //array with each screenshot
  const screenshotsArray =
    (screenshots.results && screenshots.results.length) ||
    screenshots.results !== undefined ||
    screenshots.results !== null
      ? screenshots.results &&
        screenshots.results.map((screen) => (
          <Slide key={screen.id} className="slide">
            <motion.img
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 1.1, ease: "linear" },
              }}
              className="screenshot"
              key={screen.id}
              src={smallImage(screen.image, 1280)}
              alt={`screenshot of ${game.name}`}
            />
          </Slide>
        ))
      : [];

  const [slideIndex, setSlideIndex] = useState(1);
  const [getDots, setGetDots] = useState(null);

  //display current screenshot
  const showSlides = (number) => {
    if (number > (screenshotsArray && screenshotsArray.length)) {
      setSlideIndex(1);
    }
    if (number < 1) {
      setSlideIndex(screenshotsArray.length);
    }

    if (screenshotsArray !== undefined) {
      return screenshotsArray[slideIndex - 1];
    }
  };

  //change screenshot logic
  const changeSlides = (number) => {
    setGetDots(document.getElementsByClassName("dot"));
    setSlideIndex(slideIndex + number);
    showSlides(slideIndex);
    if (number > 0) {
      if (getDots !== null) {
        for (let i = 0; i < getDots.length; i++) {
          if (i === slideIndex - 1) {
            if (getDots[slideIndex - 1] && slideIndex < getDots.length) {
              getDots[slideIndex].classList.add("active");
            } else {
              getDots[getDots.length - slideIndex].classList.add("active");
            }
          } else {
            if (getDots[slideIndex - 1] && slideIndex < getDots.length) {
              getDots[slideIndex - 1].classList.remove("active");
            } else {
              getDots[getDots.length - 1].classList.remove("active");
            }
          }
        }
      }
    }
    if (number < 0) {
      if (getDots !== null) {
        for (let i = 0; i < getDots.length; i++) {
          if (i === getDots.length - slideIndex) {
            if (getDots[slideIndex - 2]) {
              getDots[slideIndex - 2].classList.add("active");
            } else {
              getDots[getDots.length - 1].classList.add("active");
            }
            activeSlide = slideIndex;
            getDots[activeSlide - 1].classList.remove("active");
          } else if (activeSlide) {
            if (activeSlide === 1) {
            }
            getDots[activeSlide - 1].classList.remove("active");
          } else {
          }
        }
      }
    }
  };
  let activeSlide;

  //change screenshot with keyboard arrows
  const changeSlidesKeys = (event) => {
    // setGetDots(document.getElementsByClassName("dot"));
    if (event.key === "ArrowLeft") {
      setSlideIndex(slideIndex - 1);
      showSlides(slideIndex);
    } else if (event.key === "ArrowRight") {
      setSlideIndex(slideIndex + 1);
      showSlides(slideIndex);
    }
  };

  const selectSlides = (number) => {
    setSlideIndex(number);
    showSlides(slideIndex);
    setGetDots(document.getElementsByClassName("dot"));
  };

  const [galleryOpen, setGalleryOpen] = useState(false);

  const openGalleryHandler = () => {
    setGalleryOpen(true);
  };

  const closeGalleryHandler = () => {
    setGalleryOpen(false);
    setSlideIndex(1);
  };

  useEffect(() => {
    document.body.addEventListener("keydown", changeSlidesKeys);
    window.addEventListener("keyup", exitDetailsHandler);

    return () => {
      document.body.removeEventListener("keydown", changeSlidesKeys);

      window.removeEventListener("keyup", exitDetailsHandler);
    };
  }, [changeSlidesKeys, selectSlides]);

  return (
    <>
      {!isLoading && (
        <CardOverlay className="overlay" onClick={exitDetailsHandler}>
          <Details layoutId={`container${pathId}`}>
            <Stats>
              <div className="title-rating">
                <motion.h3 layoutId={`title${pathId}`}>{game.name}</motion.h3>

                <p className="rating-stars">
                  Rating: <br /> {getStars()}
                </p>

                {game.publishers.map((data) => (
                  <p key={data.id} title="Publisher">
                    {data.name}
                  </p>
                ))}
                {game.website.length > 0 ? (
                  <a
                    className="website"
                    target="_blank"
                    rel="noreferrer"
                    href={game.website}
                    title="Visit game website"
                  >
                    Website
                  </a>
                ) : null}
              </div>
              <Info>
                <h3>Platforms</h3>

                <Platforms>
                  {game.parent_platforms.map((data) => (
                    <img
                      src={getPlatformIcons(data.platform.name)}
                      key={data.platform.id}
                      alt={data.platform.name}
                      title={data.platform.name}
                    />
                  ))}
                </Platforms>
                {game.genres.length > 0 ? (
                  <h3 className="genre-title">Genres</h3>
                ) : null}
                <Genres>
                  {game.genres.map((data, index) =>
                    index < 2 ? (
                      <p key={data.id} title={data.name}>
                        {" "}
                        {index < 1 ? data.name : `\u00A0/\u00A0${data.name}`}
                      </p>
                    ) : null
                  )}
                </Genres>
              </Info>
            </Stats>

            <Media>
              <motion.img
                layoutId={`img${pathId}`}
                src={
                  game.background_image !== null
                    ? smallImage(game.background_image, 1280)
                    : missingImage
                }
                alt={game.name}
              />
            </Media>
            <Description>
              <div dangerouslySetInnerHTML={{ __html: game.description }} />
            </Description>
            <Screenshot>
              {screenshotsArray && screenshotsArray.length
                ? screenshotsArray[0]
                : null}
              {screenshotsArray && screenshotsArray.length > 0 && (
                <button onClick={openGalleryHandler}>View More</button>
              )}
            </Screenshot>
            <AnimatePresence>
              {galleryOpen && (
                <Gallery
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 1.1, ease: "linear" },
                  }}
                  className="gallery"
                >
                  <SlideShow className="slideshow">
                    {screenshotsArray && screenshotsArray.length
                      ? showSlides(slideIndex)
                      : null}

                    <button
                      onClick={() => {
                        changeSlides(-1);
                      }}
                      className="prev"
                    >
                      &#10094;
                    </button>
                    <button
                      onClick={() => {
                        changeSlides(1);
                      }}
                      className="next"
                    >
                      &#10095;
                    </button>
                    <div onClick={closeGalleryHandler} className="close">
                      <p>+</p>
                    </div>
                  </SlideShow>
                  <Dots>
                    {(screenshotsArray && screenshotsArray.length) > 0 ||
                    screenshotsArray !== undefined ||
                    screenshotsArray !== null
                      ? screenshotsArray.map((screenshot, index) => {
                          if (index + 1 === slideIndex) {
                            return (
                              <span key={index}
                                onClick={() => {
                                  selectSlides(slideIndex);
                                }}
                                className={`dot dot${index} active`}
                              ></span>
                            );
                          } else {
                            return (
                              <span key={index}
                                onClick={() => {
                                  selectSlides(index + 1);
                                }}
                                key={index}
                                className={`dot dot${index}`}
                              ></span>
                            );
                          }
                        })
                      : null}
                  </Dots>
                </Gallery>
              )}
            </AnimatePresence>
          </Details>
        </CardOverlay>
      )}
    </>
  );
};

const CardOverlay = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  &::-webkit-scrollbar {
    width: 12px;
    background-color: #f5f5f5;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #a5a5a5;
  }
`;

const Details = styled(motion.div)`
  &::after {
    content: "";
    min-height: 5vh;
    position: absolute;

    padding: 1rem;
  }
  width: 50%;
  border-radius: 1rem;
  padding: 2rem;

  background: white;
  position: absolute;
  left: 25%;

  top: 5%;
  color: black;
  z-index: 200;

  transition: overflow 0s;
  img {
    width: 100%;
  }
  @media screen and (max-width: 1300px) {
    left: 20%;
    width: 60%;
  }
  @media screen and (max-width: 1000px) {
    left: 20%;
    width: 65%;

    h3 {
      font-size: 1.1rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline-block;
  }
  .title-rating {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .website {
    font-weight: bold;
    color: #0044ff;
    font-size: 1.1rem;
    margin: 1.5rem 0;
    transition: all 1s ease;
    &:hover {
      color: red;
    }
  }
  .rating-stars {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    br {
      display: none;
    }

    img {
      padding: 0.1rem;
      margin-left: 0.1rem;
    }
  }
  @media screen and (max-width: 1300px) {
    .rating-stars {
      display: block;

      img {
        margin-left: 0;
      }
      br {
        display: block;
      }
    }
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    justify-content: center !important;
    align-items: center;
    text-align: center;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    .website {
      margin: 1rem;
    }
  }
`;

const Info = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .genre-title {
    padding: 1rem 0 0.3rem;
  }
`;

const Platforms = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  img {
    margin: 0 0.5rem;
  }
  @media screen and (max-width: 1000px) {
    img {
      margin: 0.5rem;
      max-height: 50%;
    }
  }
`;
const Genres = styled(motion.div)`
  display: flex;
  justify-content: flex-start;

  flex-wrap: wrap;
  h3 {
    margin: 0;
  }
  p {
    margin: 0;
  }
`;

const Media = styled(motion.div)`
  margin-top: 1rem;
  img {
    width: 100%;

    object-fit: cover;
  }
`;

const Description = styled(motion.div)`
  margin: 2rem 0;
`;
const Gallery = styled(motion.div)`
  z-index: 400;
  width: 100%;
  height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
  display: block;
  opacity: 1;
  transition: all 1s ease;
`;
const SlideShow = styled(motion.div)`
  z-index: 500;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  height: 100vh;
  background: #9b9b9b;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 1s ease;
    object-fit: cover;
  }

  .prev,
  .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    margin-top: -22px;
    padding: 1rem;
    color: white;
    font-weight: bold;
    font-size: 2.5rem;
    transition: 0.6s ease;
    border: none;
    background: transparent;
    border-radius: 0 3px 3px 0;
    user-select: none;
  }
  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }
  .close {
    cursor: pointer;
    position: absolute;
    top: 7%;
    right: 5%;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 1s ease;
    user-select: none;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;

    p {
      color: white;
      transform: rotate(45deg);
      font-size: 2.5rem;
    }
  }
  .prev:hover,
  .next:hover,
  .close:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
const Slide = styled(motion.div)`
  display: block;
  width: 100%;
`;

const Screenshot = styled(motion.div)`
  position: relative;

  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.2);
    font-size: 1.1rem;
    border: 0.3rem solid white;
    padding: 1rem 1.5rem;
    font-family: "Montserrat", sans-serif;
    font-size: 1.6rem;
    cursor: pointer;
    font-weight: 500;
    color: white;
    transition: all 1s ease;
    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  }
`;

const Dots = styled(motion.div)`
  z-index: 500;
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translate(-50%, -8%);
  .dot {
    cursor: pointer;
    height: 1.2rem;
    width: 1.2rem;
    margin: 0.5rem 0.5rem;
    background-color: #252525;
    border-radius: 50%;
    border: 2px solid white;
    display: inline-block;
    transition: background-color 0.6s ease;
  }
  .active,
  .dot:hover {
    background-color: #a5a5a5;
  }
`;

export default GameDetails;
