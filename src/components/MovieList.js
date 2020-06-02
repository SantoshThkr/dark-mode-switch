import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, onSelect }) {
  return (
    <div>
      <h2>Search Results</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
