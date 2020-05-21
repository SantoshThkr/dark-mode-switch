import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setMessage('Please enter a movie name.');
      return;
    }

    setMessage('');
    onSearch(text.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Search</button>
      {message && <p className="search-message">{message}</p>}
    </form>
  );
}

export default SearchBar;
