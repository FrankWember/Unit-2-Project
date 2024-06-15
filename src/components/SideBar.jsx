// src/components/SideBar.jsx
import React from "react";
import PropTypes from "prop-types";
import "./SideBar.css";

function SideBar({ likedMovies, watchedMovies }) {
  return (
    <div className="SideBar">
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#now-playing">Now Playing</a>
        </li>
        <li>
          <a href="#search">Search</a>
        </li>
        <li>
          <a href="#favorites">Favorites</a>
          <ul>
            {likedMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </li>
        <li>
          <a href="#watched">Watched</a>
          <ul>
            {watchedMovies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

SideBar.propTypes = {
  likedMovies: PropTypes.array.isRequired,
  watchedMovies: PropTypes.array.isRequired,
};

export default SideBar;
