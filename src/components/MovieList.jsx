import { Link, useLocation } from "react-router-dom";

export const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }} // detay sayfasına konum bilgisini taşır
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
