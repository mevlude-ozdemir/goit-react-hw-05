import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Aradığınız sayfa mevcut değil.</p>
      <Link to="/">Ana Sayfaya Dön</Link>
    </main>
  );
};

export default NotFoundPage;
