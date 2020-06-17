# Movie Search App

A simple React application for searching movies using the [OMDb API](https://www.omdbapi.com/).

## Features

- Movie search
- Movie cards
- Movie details
- Loading state
- Error handling
- Responsive design

## Tech Stack

- React
- JavaScript
- Axios
- CSS
- REST API
- Jest
- React Testing Library

## Installation

```bash
npm install
```

## API Configuration

The app uses the OMDb API, which needs a free API key.

1. Get a key from https://www.omdbapi.com/apikey.aspx
2. Create a `.env.local` file in the project root:

```
REACT_APP_OMDB_API_KEY=your_api_key_here
```

3. Restart `npm start` after adding or changing the key.

`.env.local` is ignored by git, so the key won't be committed.

## Run

```bash
npm start
```

Open http://localhost:3000 in your browser.

## Test

```bash
npm test
```
