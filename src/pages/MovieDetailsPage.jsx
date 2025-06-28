import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  NavLink,
  Outlet,
  Link,
} from "react-router-dom";
import { fetchMovieDetails, getImageUrl } from "../services/tmdb-api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();

  // Geri dönüş için konumu useRef ile sakla
  const backLinkLocationRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
        setError(null);
      } catch {
        setError("Film bilgisi alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [movieId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!movie) return null;

  const { title, overview, genres, poster_path, vote_average, release_date } =
    movie;

  return (
    <main>
      <Link to={backLinkLocationRef.current}>&larr; Geri</Link>

      <div style={{ display: "flex", marginTop: 20 }}>
        <img
          src={getImageUrl(poster_path)}
          alt={title}
          width="250"
          style={{ marginRight: 20 }}
        />
        <div>
          <h2>
            {title} ({release_date?.slice(0, 4)})
          </h2>
          <p>User Score: {Math.round(vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      <hr />

      <nav>
        <NavLink
          to="cast"
          state={{ from: backLinkLocationRef.current }}
          style={({ isActive }) => ({
            marginRight: 10,
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "tomato" : "black",
          })}
        >
          Oyuncular
        </NavLink>

        <NavLink
          to="reviews"
          state={{ from: backLinkLocationRef.current }}
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            color: isActive ? "tomato" : "black",
          })}
        >
          İncelemeler
        </NavLink>
      </nav>

      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
