import "./styles/card.css";

export default function Card({ name, description, technologies = [] }) {
  const gradients = [
    "linear-gradient(135deg, #60a5fa, #4f46e5)", // azul
    "linear-gradient(135deg, #a855f7, #7c3aed)", // violeta
    "linear-gradient(135deg, #ec4899, #f472b6)", // rosa
    "linear-gradient(135deg, #34d399, #10b981)", // verde
    "linear-gradient(135deg, #22d3ee, #06b6d4)", // cian
  ];

  return (
    <div className="card">
      <div className="card-inner">
        <h2 className="card-title">{name || "Bootcamp"}</h2>
        <p className="card-subtitle">{description ? "Descripción" : "Próximamente"}</p>
        {description && <p className="card-description">{description}</p>}

        {!!technologies.length && (
          <div className="card-technologies">
            {technologies.map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="tech-badge"
                style={{ background: gradients[i % gradients.length] }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
