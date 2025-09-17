export default function ViewToggle({ view = "grid", onChange }) {
  return (
    <div className="views">
      <button
        className={`view ${view === "grid" ? "is-on" : ""}`}
        title="Grid"
        onClick={() => onChange?.("grid")}
        aria-label="Grid"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" fill="none" stroke="#111827" strokeWidth="1.5"/>
        </svg>
      </button>
      <button
        className={`view ${view === "table" ? "is-on" : ""}`}
        title="Tabla"
        onClick={() => onChange?.("table")}
        aria-label="Tabla"
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="#111827" strokeWidth="1.5"/>
        </svg>
      </button>
    </div>
  );
}
