import React from "react";
import PropTypes from "prop-types";
import "./Filter.css";

function Filter({ setFilterCriteria }) {
  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
  };

  return (
    <div className="Filter">
      <select onChange={handleFilterChange}>
        <option value="" selected>
          Filter results
        </option>
        <option value="release_date">Released Date</option>
        <option value="vote_average">Vote Average</option>
        <option value="descending">Descending</option>
        <option value="ascending">Ascending</option>
      </select>
    </div>
  );
}

Filter.propTypes = {
  setFilterCriteria: PropTypes.func.isRequired,
};

export default Filter;
