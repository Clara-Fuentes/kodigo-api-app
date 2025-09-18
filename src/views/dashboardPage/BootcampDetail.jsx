import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

/** formatea precio */
const money = (v) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(v || 0);

/** mock local por si no hay API aún */
const MOCK = [
  {
    id: "1",
    area: "Desarrollo Web",
    title: "Full Stack JavaScript",
    description: "Aprende desarrollo web completo con JavaScript, React y Node.js",
    weeks: 16,
    price: 2499,
    image: "",
  },
];

export default function BootcampDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState(null);

  // simula fetch: aquí luego llamas a tu API
  useEffect(() => {
    const found = MOCK.find((b) => b.id === id) || MOCK[0];
    setItem(found);
  }, [id]);

  const category = useMemo(() => item?.area || "Bootcamp", [item]);

  if (!item) return null;

  return (
    <div className="container--full">
      <button className="back-link" onClick={() => nav(-1)}>← Volver</button>

      {/* HERO */}
      <section className="hero">
        {/* Columna izquierda */}
        <div>
          <span className="badge badge--secondary">{category}</span>
          <h1 className="hero__title">{item.title}</h1>
          <p className="hero__desc">{item.description}</p>

          {/* KPIs */}
          <div className="kpis">
            <div className="kpi">
              <div className="kpi__value">{item.weeks} semanas</div>
              <div className="kpi__label">Duración</div>
            </div>
            <div className="kpi kpi--accent">
              <div className="kpi__value">{money(item.price)}</div>
              <div className="kpi__label">Precio</div>
            </div>
          </div>

          {/* CTA */}
          <div className="cta">
            <button className="btn btn--primary">Inscribirse Ahora</button>
            <button className="btn btn--ghost">Más Información</button>
          </div>
        </div>

        {/* Media derecha */}
        <div className="hero__media">
          {item.image ? (
            <img src={item.image} alt={item.title} />
          ) : (
            <div className="ph" />
          )}
        </div>
      </section>

      {/* SEGMENTED TABS visuales */}
      <div className="segbar" style={{ marginTop: 18, marginBottom: 14 }}>
        <button className="segbar__btn is-on">Resumen</button>
        <button className="segbar__btn">Currículo</button>
        <button className="segbar__btn">Instructores</button>
        <button className="segbar__btn">Reseñas</button>
      </div>

      {/* ¿Qué aprenderás? */}
      <section className="learn">
        <h2 className="learn__title">¿Qué aprenderás?</h2>
        <p className="learn__subtitle">
          Este bootcamp te proporcionará las habilidades fundamentales y avanzadas necesarias para destacar en desarrollo web.
        </p>

        <div className="learn__grid">
          <div className="learn__card">
            <h3>Habilidades Técnicas</h3>
            <p>Domina las tecnologías más demandadas del mercado</p>
          </div>
          <div className="learn__card">
            <h3>Proyectos Reales</h3>
            <p>Construye un portafolio profesional</p>
          </div>
          <div className="learn__card">
            <h3>Mentoría 1:1</h3>
            <p>Apoyo personalizado de expertos</p>
          </div>
          <div className="learn__card">
            <h3>Empleabilidad</h3>
            <p>Preparación para el mercado laboral</p>
          </div>
        </div>
      </section>
    </div>
  );
}
