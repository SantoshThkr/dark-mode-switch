import React from 'react';

function MovieDetails({ movie, onBack }) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <div className="movie-details">
      <h2>{movie.Title}</h2>

      {hasPoster ? (
        <img src={movie.Poster} alt={movie.Title} className="details-poster" />
      ) : (
        <div className="no-poster details-no-poster">No poster available</div>
      )}

      <div className="details-info">
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Runtime:</strong> {movie.Runtime}</p>
        <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
        <p><strong>Plot:</strong></p>
        <p>{movie.Plot}</p>
      </div>

      <button className="back-button" onClick={onBack}>
        Back to Results
      </button>
    </div>
  );
}

export default MovieDetails;
