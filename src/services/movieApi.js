import axios from 'axios';

const API_URL = 'https://www.omdbapi.com/';
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export const searchMovies = async (query) => {
  const response = await axios.get(API_URL, {
    params: {
      apikey: API_KEY,
      s: query
    }
  });

  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await axios.get(API_URL, {
    params: {
      apikey: API_KEY,
      i: id,
      plot: 'short'
    }
  });

  return response.data;
};
