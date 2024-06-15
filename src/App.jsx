// src/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import MovieContainer from "./components/MovieContainer";
import Search from "./components/Search";
import Filter from "./components/Filter";
import SearchContainer from "./components/SearchContainer";
import SideBar from "./components/SideBar";

const App = () => {
  const [result, setResults] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [isSideBarMode, setIsSidebarMode] = useState(false);
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    if (!isSearchMode) {
      fetchNowPlaying();
    }
  }, [isSearchMode]);

  const handleSearchResults = (results) => {
    setResults(results);
    setShowSearchResults(results.length > 0);
  };

  const fetchNowPlaying = () => {
    const apiKey = "84de8d46d158cdac318d6ca63917d6e3";
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const toggleMode = () => {
    setIsSearchMode((prevMode) => !prevMode);
    setResults([]);
  };

  const toggleSideBar = () => {
    setIsSidebarMode(!isSideBarMode);
  };

  const addLikedMovie = (movie) => {
    setLikedMovies((prevMovies) => [...prevMovies, movie]);
  };

  const addWatchedMovie = (movie) => {
    setWatchedMovies((prevMovies) => [...prevMovies, movie]);
  };

  return (
    <>
      <header className="App-header">Flixster</header>

      <button onClick={toggleSideBar} className="ToggleSideBarButton">
        {isSideBarMode ? "SideBar" : "Show SideBar"}
      </button>

      <button onClick={toggleMode} className="ToggleButton">
        {isSearchMode ? "Show Now Playing" : "Search Movies"}
      </button>
      {isSearchMode && <Search setResults={handleSearchResults} />}
      <Filter setFilterCriteria={setFilterCriteria} />

      <main className="Main-App">
        {isSideBarMode && (
          <SideBar likedMovies={likedMovies} watchedMovies={watchedMovies} />
        )}
        {isSearchMode ? (
          <SearchContainer searchResults={result} />
        ) : (
          <MovieContainer
            filterCriteria={filterCriteria}
            currPage={page}
            addLikedMovie={addLikedMovie}
            addWatchedMovie={addWatchedMovie}
          />
        )}
      </main>
      <footer>
        <div className="App-footer">
          <div className="text-footer">2024 Flixster</div>
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="load"
          >
            Load More
          </button>
        </div>
      </footer>
    </>
  );
};

export default App;
