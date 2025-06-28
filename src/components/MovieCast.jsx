import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits, getImageUrl } from "../services/tmdb-api";

const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieCredits(movieId);
        setCast(data);
        setError(null);
      } catch {
        setError("Oyuncu bilgileri alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (cast.length === 0) return <p>Oyuncu bilgisi bulunamadı.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li
          key={id}
          style={{
            marginBottom: 15,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img
            src={profile_path ? getImageUrl(profile_path) : "https://placehold.co/50x75?text=N/A&font=roboto"}
            alt={name}
            width="50"
            style={{ borderRadius: 5 }}
          />
          <div>
            <p><strong>{name}</strong></p>
            <p>Karakter: {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
