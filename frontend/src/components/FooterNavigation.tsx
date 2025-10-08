// components/FooterNavigation.tsx - Componente de navegación inferior reutilizable

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../config/constants';

interface FooterNavigationProps {
  className?: string;
}

const FooterNavigation: React.FC<FooterNavigationProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string): boolean => {
    if (path === ROUTES.HOME) return location.pathname === path;
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className={`footer-nav ${className}`}>
      <button 
        onClick={() => navigate(ROUTES.HOME)}
        className={`footer-button ${isActive(ROUTES.HOME) ? 'active' : ''}`}
      >
        <span className="material-symbols-outlined">home</span>
        <span>Inicio</span>
      </button>
      <button 
        onClick={() => navigate(ROUTES.AVAILABILITY)}
        className={`footer-button ${isActive(ROUTES.AVAILABILITY) ? 'active' : ''}`}
      >
        <span className="material-symbols-outlined">calendar_month</span>
        <span>Reservar</span>
      </button>
      <button 
        onClick={() => navigate(ROUTES.CONTACT)}
        className={`footer-button ${isActive(ROUTES.CONTACT) ? 'active' : ''}`}
      >
        <span className="material-symbols-outlined">call</span>
        <span>Contacto</span>
      </button>
    </div>
  );
};

export default FooterNavigation;