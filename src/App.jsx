import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Navigation } from "./components/Navigation.jsx";

// Sayfa bileşenlerini lazy-load yap
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const MoviesPage = lazy(() => import("./pages/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

// MovieDetails içindeki nested bileşenler
const MovieCast = lazy(() => import("./components/MovieCast.jsx"));
const MovieReviews = lazy(() => import("./components/MovieReviews.jsx"));

const App = () => {
  return (
    <>
      <Navigation />

      <Suspense fallback={<p>Yükleniyor...</p>}>
        <Routes>
          {/* Ana Sayfa */}
          <Route path="/" element={<HomePage />} />

          {/* Film Arama */}
          <Route path="/movies" element={<MoviesPage />} />

          {/* Film Detayları ve iç içe route'lar */}
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          {/* Bulunamayan sayfa */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
