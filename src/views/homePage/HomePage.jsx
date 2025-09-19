// src/views/homePage/HomePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homePage.css";

import Card from "../../components/Card.jsx";
import Footer from "../../components/Footer.jsx";
import { getBootcamps } from "../../api/bootcamps.service";

export default function HomePage() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Debounce del query
  const debouncedQ = useMemo(() => q.trim(), [q]);
  useEffect(() => {
    const id = setTimeout(() => {
      load(debouncedQ);
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ]);

  async function load(query) {
    let cancel = false;
    try {
      setLoading(true);
      setErr("");
      const resp = await getBootcamps(query);
      // Soporta { ok, data } o array directo
      const arr = Array.isArray(resp) ? resp : resp?.data || [];
      if (!cancel) setList(arr);
    } catch (e) {
      if (!cancel) setErr(e?.message || "No se pudo cargar la lista");
    } finally {
      if (!cancel) setLoading(false);
    }
    return () => {
      cancel = true;
    };
  }

  return (
    <div className="home-shell">
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Transforma tu <br /> futuro.
          </h1>
          <button className="hero-cta" onClick={() => nav("/login?tab=register")}>
            Registrarse
          </button>
        </div>
        <div className="hero-footer">Kodigo 2025 Derechos Reservados</div>
      </section>

      {/* PANEL GLASS: EXPLORAR BOOTCAMPS */}
      <section className="bootcamps-panel">
        <h2 className="bootcamps-title">Explorar Bootcamps</h2>
        <p className="bootcamps-sub">Programas intensivos con tecnologías actuales.</p>

        <div className="bootcamps-search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título o área..."
            className="search-lite"
          />
        </div>

        {loading && <p className="state-text">Cargando...</p>}
        {err && !loading && <p className="state-text err">{err}</p>}

        {!loading && !err && (
          <div className="bootcamps-grid">
            {list.map((b) => {
              // Normaliza campos desde tu entidad Bootcamp
              const id = b.id ?? b._id ?? b.uuid;
              const name = b.title ?? b.name ?? "Bootcamp";
              const description = b.description ?? "";
              const technologies =
                b.technologies ??
                (b.area ? [b.area] : []); // mostramos "area" como chip

              return (
                <div key={id} onClick={() => nav(`/bootcamps/${id}`)} style={{ cursor: "pointer" }}>
                  <Card name={name} description={description} technologies={technologies} />
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER GLASS */}
      <footer className="footer-wrapper">
        <Footer />
      </footer>
    </div>
  );
}
