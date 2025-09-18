import { Link } from "react-router";

const money = (v) =>
  new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(v || 0);

export default function BootcampCard({ item, onToggleFav, onEdit, onDelete, onViewMore }) {
  if (!item) return null;

  return (
    <article className={`card card--elev ${item.deleted ? "is-deleted" : ""}`}>
      <div className="card__media">
        {item.image ? <img src={item.image} alt={item.title} /> : <div className="ph" />}

        {item.featured ? (
          <span className="badge badge--primary badge--floating">Destacado</span>
        ) : null}

        <div className="card__toolbar">
          {onEdit ? (
            <button className="icon-btn" aria-label="Editar" title="Editar" onClick={() => onEdit(item)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor"/>
                <path d="M20.71 7.04a1 1 0 0 0 0-1.42L18.34 3.3a1 1 0 0 0-1.42 0l-1.84 1.84 3.75 3.75 1.88-1.85z" fill="currentColor"/>
              </svg>
            </button>
          ) : null}
          {onDelete ? (
            <button
              className={`icon-btn ${item.deleted ? "icon-btn--restore" : "icon-btn--warn"}`}
              aria-label={item.deleted ? "Restaurar" : "Eliminar"}
              title={item.deleted ? "Restaurar" : "Eliminar"}
              onClick={() => onDelete(item)}
            >
              {item.deleted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12a8 8 0 1 0 2.34-5.66L4 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 5v4h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                  <path d="M6 6l1 14h10l1-14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ) : null}
        </div>

        <button className="fav" onClick={() => onToggleFav?.(item.id)} aria-label="Favorito" title="Favorito">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"
              fill={item.favorite ? "#ef4444" : "none"}
              stroke="#ef4444"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>

      <div className="card__body card__body--lg">
        <div className="badges">
          <span className="badge badge--secondary">{item.category}</span>
          <span className="badge badge--outline"><span className="emoji">📍</span>{item.modality}</span>
        </div>

        <h3 className="card__title">{item.title}</h3>
        <p className="card__desc">{item.description}</p>

        <div className="meta-row">
          <div className="muted"><span className="emoji">⏰</span>{item.weeks} semanas</div>
          <div className="strong"><span className="emoji">💰</span>{money(item.price)}</div>
        </div>
      </div>

      <div className="card__footer">
        {onViewMore ? (
          <button className="btn btn--primary w-full" onClick={() => onViewMore(item.id)}>Ver detalles</button>
        ) : (
          <Link className="btn btn--primary w-full" to={`/bootcamps/${item.id}`}>Ver detalles</Link>
        )}
      </div>
    </article>
  );
}
