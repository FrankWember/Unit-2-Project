import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Modal.css";
import MovieCard from "./MovieCard";

const Modal = ({ show, handleClose, movie }) => {
  const [genres, setGenres] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const getModalVideo = async (movieId) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const trailer = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setTrailerUrl("");
      }
    } catch (error) {
      console.error("Error fetching the trailer", error);
    }
  };

  useEffect(() => {
    if (movie) {
      console.log(movie.id);
      getModalVideo(movie.id);
    }
  }, [movie]);

  useEffect(() => {
    if (show) {
      fetchGenres();
    }
  }, [show]);

  const fetchGenres = async () => {
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGRlOGQ0NmQxNThjZGFjMzE4ZDZjYTYzOTE3ZDZlMyIsInN1YiI6IjY2Njc2YmFmM2FlYzcwOTZlMmRkYjRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h8C92XaxsaqIUa4ocVbhIMCuw6PxjyPpsQ8w7Wezdrw",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .join(", ");
  };

  if (!movie) return null;

  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="modalImage"
        />
        <section>
          <div>
            <h3 className="title">{movie.title}</h3>
            <span className="release">Released: {movie.release_date}</span>
          </div>

          <div className="facts">
            <span>Genres: {getGenreNames(movie.genre_ids)}</span>
          </div>
          {trailerUrl && (
            <iframe
              src={`${trailerUrl}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="MovieTrailer"
              className="trailer"
            ></iframe>
          )}

          <p className="overviewTitle">Overview</p>
          <p className="overview"> {movie.overview}</p>
        </section>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    overview: PropTypes.string.isRequired,
  }),
};

export default Modal;
