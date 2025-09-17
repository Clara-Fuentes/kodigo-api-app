import { useEffect, useMemo, useState } from "react";
import BootcampCard from "../../components/BootcampCard.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import Tabs from "../../components/Tabs.jsx";
import ViewToggle from "../../components/ViewToggle.jsx";
import Modal from "../../components/Modal.jsx";
import CrudForm from "../../components/CrudForm.jsx";
import "./bootcamps.css";

import { fetchBootcampsMock } from "../../mocks/bootcamps.js";
import { mapBootcampApiToUi } from "../../api/adapters.js";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
const ENDPOINT = "/api/bootcamps";

const money = (v) =>
  new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(v || 0);

export default function BootcampsDashboard() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");      // "all" | "fav"
  const [view, setView] = useState("grid");   // "grid" | "table"
  const [loading, setLoading] = useState(true);
  const [showDeleted, setShowDeleted] = useState(false);

  // CRUD UI
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      setLoading(true);
      try {
        if (USE_MOCK) {
          const raw = await fetchBootcampsMock();
          if (!alive) return;
          setData(raw.map(mapBootcampApiToUi));
        } else {
          const r = await fetch(`${API_BASE}${ENDPOINT}`);
          const json = await r.json();
          const arr = Array.isArray(json) ? json : json?.items || [];
          if (!alive) return;
          setData(arr.map(mapBootcampApiToUi));
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => { alive = false; };
  }, []);

  const favoritesCount = useMemo(() => data.filter(d => d.favorite && !d.deleted).length, [data]);

  const baseList = useMemo(() => {
    let src = data;
    if (!showDeleted) src = src.filter(d => !d.deleted);
    if (tab === "fav") src = src.filter(d => d.favorite);
    const t = q.trim().toLowerCase();
    if (!t) return src;
    return src.filter(d =>
      `${d.title} ${d.description} ${d.category} ${d.modality}`.toLowerCase().includes(t)
    );
  }, [data, q, tab, showDeleted]);

  function toggleFav(id) {
    setData(prev => prev.map(x => x.id === id ? ({ ...x, favorite: !x.favorite }) : x));
  }

  function openNew() {
    setEditing(null);
    setModalOpen(true);
  }

  function onEdit(it) {
    setEditing(it);
    setModalOpen(true);
  }

  function onDelete(it) {
    setData(prev => prev.map(x => x.id === it.id ? ({ ...x, deleted: !x.deleted }) : x));
  }

  function save(values) {
    if (editing) {
      setData(prev => prev.map(x => x.id === editing.id ? ({ ...x, ...values }) : x));
    } else {
      const nextId = (data.reduce((m, x) => Math.max(m, Number(x.id) || 0), 0) || 0) + 1;
      setData(prev => [{ id: nextId, favorite: false, deleted: false, ...values }, ...prev]);
    }
    setModalOpen(false);
  }

  const list = baseList;

  return (
    <div className="layout layout--full">
      {/* Sidebar */}
      <aside className="sidebar sidebar--full">
        <div className="brand">
          <div className="brand__logo">K</div><strong>Kodigo</strong>
        </div>
        <nav className="nav">
          <button className={`nav__link ${tab === "all" ? "is-active" : ""}`} onClick={() => setTab("all")}>Bootcamps</button>
          <button className={`nav__link ${tab === "fav" ? "is-active" : ""}`} onClick={() => setTab("fav")}>
            Favoritos <span className="pill">{favoritesCount}</span>
          </button>
        </nav>
        <div className="sidebar__bottom">
          <label className="chk">
            <input type="checkbox" checked={showDeleted} onChange={(e)=>setShowDeleted(e.target.checked)} />
            <span>Mostrar eliminados</span>
          </label>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <header className="header">
          <h1>Dashboard</h1>
          <p>Explora y gestiona tus bootcamps favoritos</p>
        </header>

        <div className="toolbar">
          <Tabs tab={tab} favoritesCount={favoritesCount} onChange={setTab} />
          <div className="tools">
            <SearchBar value={q} onChange={setQ} />
            <button className="btn" onClick={openNew}>+ Nuevo</button>
            <ViewToggle view={view} onChange={setView} />
          </div>
        </div>

        {loading ? (
          <div className="empty">Cargando…</div>
        ) : list.length === 0 ? (
          <div className="empty">Sin resultados</div>
        ) : view === "grid" ? (
          <section className="grid grid--fill">
            {list.map((b) => (
              <BootcampCard
                key={b.id}
                item={b}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleFav={toggleFav}
              />
            ))}
          </section>
        ) : (
          <section className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Modalidad</th>
                  <th>Duración</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {list.map((b) => (
                  <tr key={b.id} className={b.deleted ? "row-deleted" : ""}>
                    <td className="cell-name"><div className="thumb" /><span className="name">{b.title}</span></td>
                    <td><span className="chip">{b.category}</span></td>
                    <td>{b.modality}</td>
                    <td>{b.weeks} semanas</td>
                    <td className="cell-price">{money(b.price)}</td>
                    <td className="cell-actions">
                      <button className="btn btn--ghost" onClick={() => onEdit(b)}>Editar</button>
                      <button className="btn btn--ghost" onClick={() => onDelete(b)}>
                        {b.deleted ? "Restaurar" : "Eliminar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>

      {/* Modal CRUD */}
      <Modal
        open={modalOpen}
        title={editing ? "Editar bootcamp" : "Nuevo bootcamp"}
        onClose={() => setModalOpen(false)}
      >
        <CrudForm initialValues={editing} onSubmit={save} />
      </Modal>
    </div>
  );
}
