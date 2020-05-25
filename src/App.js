import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import { searchMovies } from './services/movieApi';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (searchText) => {
    setQuery(searchText);

    const data = await searchMovies(searchText);
    setMovies(data.Search || []);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Search</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {query && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              {movie.Title} ({movie.Year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
