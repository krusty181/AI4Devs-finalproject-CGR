import React from 'react';
import { useNavigate } from 'react-router-dom';
import FooterNavigation from '../components/FooterNavigation';
import { ROUTES, CONTACT_INFO } from '../config/constants';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      
      <div className="page-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">{CONTACT_INFO.name}</h1>
            <p className="hero-subtitle">{CONTACT_INFO.location}</p>
            <p className="hero-description">
              Disfruta de la naturaleza en nuestro camping con alojamientos únicos y servicios completos.
            </p>
            <button 
              onClick={() => navigate(ROUTES.AVAILABILITY)}
              className="hero-button button button-primary"
            >
              <span className="material-symbols-outlined">search</span>
              Buscar disponibilidad
            </button>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <span className="material-symbols-outlined service-icon">pool</span>
              <h3>Piscina</h3>
              <p>Relájate en nuestra piscina al aire libre</p>
            </div>
            <div className="service-card">
              <span className="material-symbols-outlined service-icon">restaurant</span>
              <h3>Restaurante</h3>
              <p>Comida casera y productos locales</p>
            </div>
            <div className="service-card">
              <span className="material-symbols-outlined service-icon">playground</span>
              <h3>Zona infantil</h3>
              <p>Diversión garantizada para los más pequeños</p>
            </div>
            <div className="service-card">
              <span className="material-symbols-outlined service-icon">wifi</span>
              <h3>WiFi gratuito</h3>
              <p>Conexión de alta velocidad en todo el camping</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <h2 className="section-title">Contacto</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="material-symbols-outlined">call</span>
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <div className="contact-item">
              <span className="material-symbols-outlined">mail</span>
              <span>{CONTACT_INFO.email}</span>
            </div>
            <div className="contact-item">
              <span className="material-symbols-outlined">location_on</span>
              <span>{CONTACT_INFO.location}</span>
            </div>
          </div>
          <button 
            onClick={() => navigate(ROUTES.CONTACT)}
            className="button button-secondary"
          >
            Contactar ahora
          </button>
        </section>
      </div>

      <FooterNavigation />
    </div>
  );
};

export default HomePage;