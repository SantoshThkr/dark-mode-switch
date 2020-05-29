import React from 'react';

function MovieCard({ movie }) {
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
    </div>
  );
}

export default MovieCard;
