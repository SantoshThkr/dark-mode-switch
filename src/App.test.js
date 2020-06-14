import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import { searchMovies } from './services/movieApi';

jest.mock('./services/movieApi');

const movie = {
  imdbID: 'tt1375666',
  Title: 'Inception',
  Year: '2010',
  Type: 'movie',
  Poster: 'https://example.com/inception.jpg'
};

const movieDetails = {
  ...movie,
  Genre: 'Action, Adventure, Sci-Fi',
  Director: 'Christopher Nolan',
  Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
  Runtime: '148 min',
  imdbRating: '8.8',
  Plot: 'A thief who steals corporate secrets through dream-sharing technology.'
};

describe('SearchBar', () => {
  test('renders the input and lets the user type', () => {
    render(<SearchBar onSearch={() => {}} />);

    const input = screen.getByPlaceholderText('Search for a movie');
    userEvent.type(input, 'Inception');

    expect(input).toHaveValue('Inception');
  });

  test('calls onSearch with the search text', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    userEvent.type(screen.getByPlaceholderText('Search for a movie'), 'Inception');
    userEvent.click(screen.getByText('Search'));

    expect(onSearch).toHaveBeenCalledWith('Inception');
  });

  test('shows a message when the input is empty', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    userEvent.click(screen.getByText('Search'));

    expect(screen.getByText('Please enter a movie name.')).toBeInTheDocument();
    expect(onSearch).not.toHaveBeenCalled();
  });
});

describe('MovieCard', () => {
  test('renders title, year and poster', () => {
    render(<MovieCard movie={movie} onSelect={() => {}} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('2010')).toBeInTheDocument();
    expect(screen.getByAltText('Inception')).toHaveAttribute('src', movie.Poster);
  });

  test('shows a placeholder when there is no poster', () => {
    render(<MovieCard movie={{ ...movie, Poster: 'N/A' }} onSelect={() => {}} />);

    expect(screen.getByText('No poster available')).toBeInTheDocument();
  });
});

describe('MovieDetails', () => {
  test('renders movie details', () => {
    render(<MovieDetails movie={movieDetails} onBack={() => {}} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Christopher Nolan')).toBeInTheDocument();
    expect(screen.getByText('148 min')).toBeInTheDocument();
    expect(screen.getByText('8.8')).toBeInTheDocument();
  });

  test('back button calls onBack', () => {
    const onBack = jest.fn();
    render(<MovieDetails movie={movieDetails} onBack={onBack} />);

    userEvent.click(screen.getByText('Back to Results'));

    expect(onBack).toHaveBeenCalled();
  });
});

describe('App', () => {
  test('shows an error message when the api fails', async () => {
    searchMovies.mockRejectedValue({ response: { status: 500 } });
    render(<App />);

    userEvent.type(screen.getByPlaceholderText('Search for a movie'), 'Inception');
    userEvent.click(screen.getByText('Search'));

    expect(await screen.findByText(/Unable to load movies/)).toBeInTheDocument();
  });

  test('shows a message when no movies are found', async () => {
    searchMovies.mockResolvedValue({ Response: 'False', Error: 'Movie not found!' });
    render(<App />);

    userEvent.type(screen.getByPlaceholderText('Search for a movie'), 'xyz');
    userEvent.click(screen.getByText('Search'));

    expect(await screen.findByText('No movies found for "xyz".')).toBeInTheDocument();
  });
});
