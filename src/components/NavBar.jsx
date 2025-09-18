import { useState } from "react";
import "./styles/navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Home", href: "#" },
    { name: "Dashboard", href: "#" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img className="navbar-logo" src="//academy.kodigo.org/pluginfile.php/1/theme_mb2nl/logo/1757611432/logo.png"/>
        {/* Links en escritorio */}
        <div className="navbar-links">
          {links.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
        </div>
        <div>
            <button className="navbar-button">LOGIN</button>
        </div>

        {/* Botón hamburguesa */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? "✖" : "☰"}
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="navbar-mobile">
          {links.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
