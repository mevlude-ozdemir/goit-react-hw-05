import axios from "axios";


const BASE_URL = "https://api.themoviedb.org/3";


const options = {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDIwZGVkMjAyOWU5ODM5ZjNmYWFlMmJmN2Q5YTg4MCIsIm5iZiI6MTc0MzcxODQ5OC45MzgsInN1YiI6IjY3ZWYwODYyMGM3OTFiZWI1N2FjZTc3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2DxrZdNadfhi5Mf9WKrvBLIngXJ9WAPmQNArya7fgzo",
  },
};

export const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day?language=en-US`;
  const response = await axios.get(url, options);
  return response.data.results;
};

// Arama sonucu film listesi getir (MoviesPage için)
export const searchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
  const response = await axios.get(url, options);
  return response.data.results;
};

// Tek bir filmin detaylarını getir (MovieDetailsPage için)
export const fetchMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?language=en-US`;
  const response = await axios.get(url, options);
  return response.data;
};

// Oyuncu kadrosunu getir (MovieCast için)
export const fetchMovieCredits = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/credits?language=en-US`;
  const response = await axios.get(url, options);
  return response.data.cast;
};

// İncelemeleri getir (MovieReviews için)
export const fetchMovieReviews = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`;
  const response = await axios.get(url, options);
  return response.data.results;
};

// Poster URL si üretici yardımcı fonksiyon
export const getImageUrl = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};
