// src/components/MovieContainer.jsx
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types";
import "./MovieContainer.css";
import Modal from "./Modal";
function MovieContainer({
  filterCriteria,
  currPage,
  addLikedMovie,
  addWatchedMovie,
}) {
  // need to extract the specific property
  const [movies, setMovies] = useState([]);

  // here, we start with an empty movie array to hold the
  //list of movies then everytime setMovies is called,
  //it updates the value of the movies array with the
  //new set of movies
  // const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    //Ask more details about how to use it in class
    fetchMovies(currPage); //calls the fetch movies if the currPage variable gets updated
  }, [currPage]);

  useEffect(() => {
    console.log(filterCriteria);
    filterMovies();
  }, [filterCriteria]);

  const fetchMovies = async (currPage) => {
    //declaring an async function which takes the currPage number as variable
    //originally, currPage is 1 in as in the useState,
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=" +
      currPage;
    console.log("test", url);
    //we store the url of the api and add the currPage number at the end
    //to access the various available currPages

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NGRlOGQ0NmQxNThjZGFjMzE4ZDZjYTYzOTE3ZDZlMyIsInN1YiI6IjY2Njc2YmFmM2FlYzcwOTZlMmRkYjRkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h8C92XaxsaqIUa4ocVbhIMCuw6PxjyPpsQ8w7Wezdrw",
      },
    }; //stores the options variables needed for the api

    //function to fetch the movies
    try {
      const response = await fetch(url, options); //fetch method
      //returning a promise(data) and storing it in the response const

      if (!response.ok) {
        // if a response is received
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); //returns a promise of the response converted into a json

      if (currPage === 1) {
        setMovies(data.results);
      } else if (currPage > 1) {
        console.log(movies);
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
      //store the resulting json in the movies array
    } catch (error) {
      console.log(error);
    }
  };

  const filterMovies = () => {
    let filtered = [...movies];
    console.log(filterCriteria);
    console.log(filtered)
    switch (filterCriteria) {
      case "release_date":
        filtered = filtered.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
        break;
      case "vote_average":
        filtered = filtered.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "descending":
        filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "ascending":
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    console.log(filtered);
    setMovies(filtered);
  };

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  //fetchMovies(currPage); // Calling the fetch movies function inside the useEffect
  // Empty array for the previous useEffect implementation to ensure
  // that the effect runs only once

  return (
    <div className="MovieContainer">
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
            rating={movie.vote_average}
            onClick={() => handleOpenModal(movie)}
            addLikedMovie={() => addLikedMovie(movie)}
            addWatchedMovie={() => addWatchedMovie(movie)}
          />
        </div>
      ))}

      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        movie={selectedMovie}
      />
    </div>
  );
}
MovieContainer.propTypes = {
  filterCriteria: PropTypes.string.isRequired,
  currPage: PropTypes.number.isRequired,
  addLikedMovie: PropTypes.func.isRequired,
  addWatchedMovie: PropTypes.func.isRequired,
};

export default MovieContainer;
