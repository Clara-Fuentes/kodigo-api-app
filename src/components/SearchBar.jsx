export default function SearchBar({ value, onChange, placeholder = "Buscar bootcamps..." }) {
  return (
    <div className="search">
      <svg width="16" height="16" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" stroke="#6b7280" strokeWidth="1.5" fill="none" />
        <path d="M21 21l-4.35-4.35" stroke="#6b7280" strokeWidth="1.5" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label="Buscar"
      />
    </div>
  );
}
