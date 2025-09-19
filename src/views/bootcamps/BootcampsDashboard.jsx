// src/views/bootcamps/BootcampsDashboard.jsx
// ... (imports iguales)

const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? "true") === "true"; // ✅ fallback seguro
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
const ENDPOINT = "/api/bootcamps";

// Si no usas 'money' aquí, puedes borrarlo
const money = (v) =>
  new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(v || 0);

export default function BootcampsDashboard() {
  // ... (estado y effects como ya los tienes)

  return (
    <div className="layout layout--full">
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

      <main className="main">
        <header className="header">
          <h1 className="page-title">Explorar Bootcamps</h1>
          <p>Programas intensivos con tecnologías actuales.</p>
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
                onClick={() => nav(`/bootcamps/${b.id}`)}
              />
            ))}
          </section>
        ) : (
          <section className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Área</th>
                  <th>Duración</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {list.map((b) => (
                  <tr key={b.id} className={b.deleted ? "row-deleted" : ""}>
                    <td className="cell-name">
                      <div className="thumb" />
                      <button className="link-like name" onClick={() => nav(`/bootcamps/${b.id}`)}>
                        {b.title}
                      </button>
                    </td>
                    <td><span className="chip">{b.area ?? "—"}</span></td>
                    <td>{b.weeks} semanas</td>
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
