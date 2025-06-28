import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../services/tmdb-api.js";
import { MovieList } from "../components/MovieList.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch {
        setError("Trend filmler alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <main>
      <h1>🔥 Trend Filmler</h1>

      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default HomePage;
