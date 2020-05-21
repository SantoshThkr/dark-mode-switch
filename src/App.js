import React, { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [query, setQuery] = useState('');

  const handleSearch = (searchText) => {
    setQuery(searchText);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Search</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      {query && <p>Searching for "{query}"</p>}
    </div>
  );
}

export default App;
