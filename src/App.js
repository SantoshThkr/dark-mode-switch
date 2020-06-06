import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import { searchMovies, getMovieDetails } from './services/movieApi';

const API_ERROR = 'Unable to load movies.\nPlease try again.';
const NETWORK_ERROR = 'Something went wrong.\nPlease check your connection.';

function getErrorMessage(err) {
  // axios sets err.response only when the server actually replied
  return err.response ? API_ERROR : NETWORK_ERROR;
}

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (searchText) => {
    setQuery(searchText);
    setMovies([]);
    setSelectedMovie(null);
    setError('');
    setLoading(true);

    try {
      const data = await searchMovies(searchText);

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else if (data.Error !== 'Movie not found!') {
        setError(API_ERROR);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }

    setLoading(false);
  };

  const handleSelect = async (id) => {
    setError('');
    setDetailsLoading(true);

    try {
      const data = await getMovieDetails(id);

      if (data.Response === 'True') {
        setSelectedMovie(data);
      } else {
        setError(API_ERROR);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }

    setDetailsLoading(false);
  };

  let content = null;

  if (loading) {
    content = <p className="status">Searching movies...</p>;
  } else if (detailsLoading) {
    content = <p className="status">Loading movie details...</p>;
  } else if (selectedMovie) {
    content = <MovieDetails movie={selectedMovie} onBack={() => setSelectedMovie(null)} />;
  } else if (movies.length > 0) {
    content = <MovieList movies={movies} onSelect={handleSelect} />;
  } else if (query && !error) {
    content = <p className="status">No movies found for "{query}".</p>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Search</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {error && <p className="error">{error}</p>}
      {content}
    </div>
  );
}

export default App;
