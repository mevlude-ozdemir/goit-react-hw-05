import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../services/tmdb-api";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
        setError(null);
      } catch {
        setError("İncelemeler alınamadı.");
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (reviews.length === 0) return <p>Henüz inceleme bulunmamaktadır.</p>;

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} style={{ marginBottom: 20 }}>
          <p><strong>Yazar:</strong> {author}</p>
          <p>{content}</p>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
