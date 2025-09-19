import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

export default function LoginPage() {
  const { search } = useLocation();
  const tab = useMemo(
    () => new URLSearchParams(search).get("tab") || "login",
    [search]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0b0a13",
        color: "#fff",
        padding: 16,
      }}
    >
      <div style={{ width: "100%", maxWidth: 520 }}>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 12 }}>
          <Link to="/login" style={{ color: tab === "login" ? "#fff" : "#A1A1AA" }}>Login</Link>
          <span>•</span>
          <Link to="/login?tab=register" style={{ color: tab === "register" ? "#fff" : "#A1A1AA" }}>Register</Link>
        </div>

        {tab === "register" ? <Register /> : <Login />}
      </div>
    </div>
  );
}
