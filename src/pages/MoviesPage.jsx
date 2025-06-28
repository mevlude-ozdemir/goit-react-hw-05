import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/tmdb-api.js";
import { MovieList } from "../components/MovieList.jsx";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // URL query parametresi için
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
      } catch {
        setError("Arama sırasında bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.query.value.trim();

    if (inputValue === "") {
      alert("Lütfen arama terimi giriniz.");
      return;
    }

    setSearchParams({ query: inputValue });
  };

  return (
    <main>
      <h1>Film Ara</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          autoComplete="off"
          placeholder="Film adı girin"
        />
        <button type="submit">Ara</button>
      </form>

      {loading && <p>Yükleniyor...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {query && movies.length === 0 && !loading && <p>Sonuç bulunamadı.</p>}
    </main>
  );
};

export default MoviesPage;
