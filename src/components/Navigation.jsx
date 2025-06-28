import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const activeStyle = {
    fontWeight: "bold",
    color: "tomato",
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <NavLink
        to="/"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        end // sadece tam '/' eşleştiğinde aktif olsun
      >
        Ana Sayfa
      </NavLink>

      {" | "}

      <NavLink
        to="/movies"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Film Ara
      </NavLink>
    </nav>
  );
};
