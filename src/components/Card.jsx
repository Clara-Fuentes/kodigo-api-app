import "./styles/card.css";

export default function Card({ name, description, technologies }) {
    //Colores para las tecnologías
  const gradients = [
    "linear-gradient(135deg, #6a11cb, #2575fc)",
    "linear-gradient(135deg, #7124ffff, #f682f6ff)",
    "linear-gradient(135deg, #11998e, #803bf6ff)",
    "linear-gradient(135deg, #811472ff, #c27ef9ff)",
    "linear-gradient(135deg, #063d64ff, #51c0e5ff)"
  ];

  return (
    <div className="card">
      <h2 className="card-title">{name}</h2>
      <p className="card-subtitle">Descripcion del curso</p>
      <p className="card-description">{description}</p>
      <div className="card-technologies">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="tech-badge"
            style={{ background: gradients[index % gradients.length] }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
