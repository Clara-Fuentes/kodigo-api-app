export default function Tabs({ tab = "all", favoritesCount = 0, onChange }) {
  return (
    <div className="tabs">
      <button
        className={`tab ${tab === "all" ? "is-on" : ""}`}
        onClick={() => onChange?.("all")}
      >
        Todos los Bootcamps
      </button>
      <button
        className={`tab ${tab === "fav" ? "is-on" : ""}`}
        onClick={() => onChange?.("fav")}
      >
        Favoritos ({favoritesCount})
      </button>
    </div>
  );
}
