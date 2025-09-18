import { useTheme } from "../contexts/ThemeContext.jsx";

export default function Topbar() {
  const { theme, toggle } = useTheme();

  return (
    <header className="topbar">
      <div className="topbar__brand">
        <svg width="22" height="22" viewBox="0 0 24 24" className="brand-icon">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M7 8h10M7 12h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        <span className="brand-text">Kodigo</span>
      </div>

      <div className="topbar__spacer" />

      <button className="topbar__btn theme-toggle" onClick={toggle} aria-label="Cambiar tema">
        {theme === "dark" ? (
          // Sol
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        ) : (
          // Luna
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.6" fill="none"/>
          </svg>
        )}
      </button>

      <div className="topbar__avatar" title="Mi cuenta">
        <img src="/diverse-user-avatars.png" alt="avatar" />
      </div>
    </header>
  );
}
