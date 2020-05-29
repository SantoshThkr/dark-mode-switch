import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import { searchMovies } from './services/movieApi';

function App() {
  const [movies, setMovies] = useState([]);

  const handleSearch = async (searchText) => {
    const data = await searchMovies(searchText);
    setMovies(data.Search || []);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Search</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

export default App;
