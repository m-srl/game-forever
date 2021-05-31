// Resize images from API
export const smallImage = (imagePath, size) => {
  const image = imagePath !== null ? (imagePath.match(/media\/screenshots/)
    ? imagePath.replace(
        "media/screenshots",
        `media/resize/${size}/-/screenshots`
      )
    :  imagePath.replace("/media/games/", `/media/resize/${size}/-/games/`))
   : null;
  return image;
};
