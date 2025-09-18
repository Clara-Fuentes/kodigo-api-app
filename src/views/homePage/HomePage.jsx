
import React, { useState, useEffect } from 'react';
//import Navbar from '../../components/Navbar/Navbar';
//import Footer from '../../components/Footer/Footer';
//import { getAllBootcamps } from '../../api/bootcamp.service.js';
import './homePage.css';

//Import de assets
import backgroundVideo from '../../assets/videos/background.mp4';
//import machineLearningImage from '../../assets/imagenes/machine-learning.png';
//import codingScreenImage from '../../assets/imagenes/coding-screen.png';
//import javaCodeImage from '../../assets/imagenes/java-code.png';

// Un mapa para asociar un título de bootcamp (o un ID) con una imagen
/*const bootcampImageMap = {
  1: machineLearningImage, // Asociaremos por ID si la API lo provee
  2: codingScreenImage,
  3: javaCodeImage,
  // Puedes añadir más si es necesario
}; */

const HomePage = () => {
  /*const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBootcamps = async () => {
      try {
        const apiBootcamps = await getAllBootcamps();
        
        // 2. "Enriquecemos" los datos de la API con nuestras imágenes locales
        const enrichedBootcamps = apiBootcamps.map(bootcamp => ({
          ...bootcamp,
          image: bootcampImageMap[bootcamp.id] || codingScreenImage, // Usa la imagen correspondiente o una por defecto
          isFeatured: bootcamp.id === 2, // Lógica de ejemplo para destacar un bootcamp
        }));

        setBootcamps(enrichedBootcamps);
      } catch (err) {
        setError('No se pudieron cargar los bootcamps.');
      } finally {
        setLoading(false);
      }
    };

    loadBootcamps();
  }, []);

  if (loading) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '5rem' }}>Cargando bootcamps...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', paddingTop: '5rem' }}>Error: {error}</div>;  */

  return (
    <div className="homepage-container">
      {/*<Navbar />  */}
        
      <main>
        {/* --- Hero Section--- */}
        <section className="hero-section-new">
            <div className="video-background-container">
                 <video autoPlay loop muted playsInline>
                <source src={backgroundVideo} type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
            </div>

          {/* Contenido del hero */}
          <div className="hero-content">
            <h1 className="hero-title-new">
              Transforma tu futuro <br /> con Kodigo.
              <span className="hero-discount">70% <span className="discount-text">DE DESCUENTO</span></span>
            </h1>
            <p className="hero-subtitle-new">
              Domina las tecnologías más demandadas con nuestros bootcamps intensivos.
            </p>
            <button className="cta-button-new">Regístrate</button>
          </div>
        </section>

        {/* --- BOOTCAMPS --- */}
        <section className="bootcamps-section-new">
          <div className="bootcamps-text-content">
            <h2 className="bootcamps-title">Nuestros Bootcamps</h2>
            <p className="bootcamps-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          {/* <div className="bootcamps-cards-container">
            {mockBootcamps.map(bootcamp => (              
              <div key={bootcamp.id} className="bootcamp-card-new">
                {bootcamp.isFeatured && <div className="featured-star">★</div>}   
                <img src={bootcamp.image} alt={bootcamp.title} className="card-image" />
                <div className="card-placeholder-image"></div> /* Placeholder para la imagen
                <button className="card-button">{bootcamp.title}</button>
              </div>
            ))}
          </div> */}
        </section>
      </main>

      {/*<Footer /> */}
    </div>
  );
};

export default HomePage;