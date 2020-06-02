import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { searchMovies, getMovieDetails } from './services/movieApi';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (searchText) => {
    setSelectedMovie(null);

    const data = await searchMovies(searchText);
    setMovies(data.Search || []);
  };

  const handleSelect = async (id) => {
    const data = await getMovieDetails(id);
    setSelectedMovie(data);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Search</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
      ) : (
        movies.length > 0 && <MovieList movies={movies} onSelect={handleSelect} />
      )}
    </div>
  );
}

export default App;
