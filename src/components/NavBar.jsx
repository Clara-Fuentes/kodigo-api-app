// src/components/Navbar.jsx
import { useContext, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import "./styles/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { token, user, logout } = useContext(AuthContext);

  const hasToken =
    token || (typeof window !== "undefined" && localStorage.getItem("token"));
  const currentUser =
    user ||
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("user") || "null"));

  // 👇 aquí cambiamos About ⇢ Dashboard si hay login
  const items = useMemo(() => {
    const base = [{ name: "Home", to: "/home" }];
    if (hasToken) {
      base.push({ name: "Dashboard", to: "/dashboard" });
      // (si quieres conservar About además del Dashboard, agrégalo aquí)
    } else {
      base.push({ name: "About", to: "/about" });
      base.push({ name: "Register", to: "/login?tab=register" });
      base.push({ name: "Login", to: "/login" });
    }
    return base;
  }, [hasToken]);

  const initials = useMemo(() => {
    const n = currentUser?.name || currentUser?.email || "";
    if (!n) return "";
    const parts = String(n).trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() || "").join("");
  }, [currentUser]);

  const handleLogout = () => {
    // puedes mantener tu modal con diseño si ya lo agregaste;
    // aquí dejo el confirm simple por brevedad:
    if (!window.confirm("¿Estás seguro de que deseas cerrar sesión?")) return;
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="nb-wrap">
      <nav className="nb-shell">
        <button className="nb-brand" onClick={() => navigate("/home")}>
          <img src="//academy.kodigo.org/pluginfile.php/1/theme_mb2nl/logo/1757611432/logo.png" alt="KODIGO" />
        </button>

        <ul className="nb-center">
          {items.map((it) => (
            <li key={it.name}>
              <NavLink
                to={it.to}
                className={({ isActive }) => "nb-link" + (isActive ? " nb-link-active" : "")}
                end={it.to === "/home"}
              >
                {it.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nb-right">
          {hasToken ? (
            <>
              <div className="nb-user">
                <div className="nb-avatar" title={currentUser?.name || currentUser?.email}>
                  {initials || "🧑"}
                </div>
                <span className="nb-username">{currentUser?.name || currentUser?.email || "Usuario"}</span>
              </div>
              <button className="nb-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <div className="nb-auth">
              <Link className="nb-auth-link" to="/login?tab=register">Register</Link>
              <span className="nb-sep">•</span>
              <Link className="nb-auth-link" to="/login">Login</Link>
            </div>
          )}
        </div>

        <button aria-label="Toggle menu" className="nb-toggle" onClick={() => setOpen((v) => !v)}>
          {open ? "✖" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="nb-mobile">
          {items.map((it) => (
            <NavLink
              key={it.name}
              to={it.to}
              className={({ isActive }) => "nb-moblink" + (isActive ? " nb-moblink-active" : "")}
              onClick={() => setOpen(false)}
              end={it.to === "/home"}
            >
              {it.name}
            </NavLink>
          ))}

          {hasToken ? (
            <button
              className="nb-moblink nb-logout-btn"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : null}
        </div>
      )}
    </header>
  );
}
