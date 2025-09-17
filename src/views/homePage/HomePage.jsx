
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Navbar from '../../components/Navbar/Navbar';
//import Footer from '../../components/Footer/Footer';
import backgroundVideo from '../../assets/videos/background.mp4';
import './homePage.css';

const HomePage = () => {
 
  return (
    <div className="homepage-container">
      {/*<Navbar />  */}
        
      <main>
        {/* ---  CON DEGRADADO --- */}
        <section className="hero-section-new">

            <div className="video-background-container">
                 <video autoPlay loop muted playsInline>
                <source src={backgroundVideo} type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
            </div>

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