import { FaEyeSlash } from "react-icons/fa";

export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 50,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    750: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
    },
  },
};

export const updateFavourites = (id, favourites) => {
  //If already liked then remove if from the Favourite List
  if (favourites.includes(id)) {
    return favourites.filter((resId) => resId !== id);
  } else {
    // Else Add it to the Favourite List
    return [...favourites, id];
  }
};
