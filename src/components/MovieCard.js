import React from 'react';

function MovieCard({ movie, onSelect }) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <div className="movie-card">
      {hasPoster ? (
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      ) : (
        <div className="no-poster">No poster available</div>
      )}

      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <p className="movie-type">{movie.Type}</p>
      </div>

      <button className="details-button" onClick={() => onSelect(movie.imdbID)}>
        View Details
      </button>
    </div>
  );
}

export default MovieCard;
