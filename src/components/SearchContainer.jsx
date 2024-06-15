// src/components/SearchContainer.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import Modal from "./Modal";
import "./SearchContainer.css";

function SearchContainer({ searchResults }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  return (
    <div className="SearchContainer">
      {searchResults.length > 0 ? (
        searchResults.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <MovieCard
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
              rating={movie.vote_average}
              onClick={() => handleOpenModal(movie)}
            />
          </div>
        ))
      ) : (
        <div className="no-results">No results found.</div>
      )}
      {showModal && selectedMovie && (
        <Modal
          show={showModal}
          handleClose={handleCloseModal}
          movie={selectedMovie}
        />
      )}
    </div>
  );
}

SearchContainer.propTypes = {
  searchResults: PropTypes.array.isRequired,
};

export default SearchContainer;
