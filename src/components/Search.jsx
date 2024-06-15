import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Search.css";

function Search({ setResults }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData(query);
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    setQuery(e.target.value);
  };

  const fetchData = (query) => {
    const apiKey = "84de8d46d158cdac318d6ca63917d6e3";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setResults(data.results);
      });
  };

  return (
    <div className="Search">
      <input
        className="Search"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={handleSearchChange}
        className="SearchButton"
      >
        Search
      </button>
    </div>
  );
}

Search.propTypes = {
  setResults: PropTypes.func.isRequired,
};

export default Search;
