// src/components/MovieCard.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MovieCard.css";
import heart1 from "../assets/heart1.png";
import heart2 from "../assets/heart2.png";

function MovieCard({
  image,
  title,
  rating,
  onClick,
  addLikedMovie,
  addWatchedMovie,
}) {
  const [like, setLike] = useState(false);
  const [watched, setWatched] = useState(false);

  const handleLikeClick = (event) => {
    event.stopPropagation();
    setLike((prevLike) => !prevLike);
    if (!like) {
      addLikedMovie();
    }
  };

  const handleWatchedClick = (event) => {
    event.stopPropagation();
    setWatched((prevWatched) => !prevWatched);
    if (!watched) {
      addWatchedMovie();
    }
  };

  return (
    <div className="movieCard" onClick={onClick}>
      <img src={image} alt={title} className="CardImage" />
      <h3 className="CardTitle">{title}</h3>
      <p className="rating">Rating: {rating}</p>
      <img
        src={like ? heart2 : heart1}
        alt="Like"
        onClick={handleLikeClick}
        className="likeButton"
      />
      <div>
        <span className="WatchedList" onClick={handleWatchedClick}>
          {watched ? "Watched" : "Add to List"}
        </span>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  addLikedMovie: PropTypes.func.isRequired,
  addWatchedMovie: PropTypes.func.isRequired,
};

export default MovieCard;
