import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ContactFormData, ContactResponse } from '../types';
import { API_ENDPOINTS, ACCOMMODATION_TYPES, PEOPLE_OPTIONS, CONTACT_INFO } from '../config/constants';
import { isValidEmail, sanitizeText } from '../utils';
import { useFormValidation } from '../hooks';
import FooterNavigation from '../components/FooterNavigation';
import './ContactPage.css';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Reglas de validación
  const validationRules = {
    name: (value: string) => !value.trim() ? 'El nombre es obligatorio' : null,
    email: (value: string) => {
      if (!value.trim()) return 'El email es obligatorio';
      if (!isValidEmail(value)) return 'El formato del email no es válido';
      return null;
    },
    phone: () => null, // Opcional
    arrivalDate: (value: string) => {
      if (value && formData.departureDate) {
        const arrival = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (arrival < today) return 'La fecha de llegada no puede ser anterior a hoy';
      }
      return null;
    },
    departureDate: (value: string) => {
      if (value && formData.arrivalDate) {
        const arrival = new Date(formData.arrivalDate);
        const departure = new Date(value);
        if (departure <= arrival) return 'La fecha de salida debe ser posterior a la de llegada';
      }
      return null;
    },
    people: () => null,
    accommodationType: () => null,
    message: (value: string) => !value.trim() ? 'El mensaje es obligatorio' : null
  };
  
  const { formData, errors, setValue, validate, reset } = useFormValidation({
    name: '',
    email: '',
    phone: '',
    arrivalDate: '',
    departureDate: '',
    people: '1',
    accommodationType: 'Parcela',
    message: ''
  }, validationRules);

  // Manejo de cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValue(name as keyof ContactFormData, value);
  };

  // Envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizeText(formData.name.trim()),
          email: sanitizeText(formData.email.trim()),
          phone: sanitizeText(formData.phone.trim()),
          subject: `Consulta de reserva - ${formData.accommodationType}`,
          message: `${sanitizeText(formData.message.trim())}\n\n--- Detalles de la consulta ---\nFecha de llegada: ${formData.arrivalDate || 'No especificada'}\nFecha de salida: ${formData.departureDate || 'No especificada'}\nNúmero de personas: ${formData.people}\nTipo de alojamiento preferido: ${formData.accommodationType}`,
          arrival_date: formData.arrivalDate,
          departure_date: formData.departureDate,
          people: formData.people,
          accommodation_type: formData.accommodationType
        })
      });
      
      const result: ContactResponse = await response.json();
      
      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Tu mensaje ha sido enviado correctamente. Te responderemos pronto.'
        });
        
        // Limpiar formulario después del éxito
        reset();
      } else {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo o contacta directamente por teléfono.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      
      <div className="page-container">
        {/* Header */}
        <header className="contact-header">
          <button 
            onClick={() => navigate('/')}
            className="back-button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="page-title">Contacto</h1>
          <div className="spacer"></div>
        </header>

        {/* Formulario */}
        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Nombre completo */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nombre completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Tu nombre"
              className={`form-input ${errors.name ? 'error' : ''}`}
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Tu email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Teléfono */}
          <div className="form-group">
            <label htmlFor="phone" className="form-label">Teléfono</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Tu teléfono"
              className="form-input"
              disabled={isSubmitting}
            />
          </div>

          {/* Fechas */}
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="arrivalDate" className="form-label">Fecha de llegada</label>
              <input
                type="date"
                id="arrivalDate"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleInputChange}
                className={`form-input ${errors.arrivalDate ? 'error' : ''}`}
                disabled={isSubmitting}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.arrivalDate && <span className="error-message">{errors.arrivalDate}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="departureDate" className="form-label">Fecha de salida</label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleInputChange}
                className={`form-input ${errors.departureDate ? 'error' : ''}`}
                disabled={isSubmitting}
                min={formData.arrivalDate || new Date().toISOString().split('T')[0]}
              />
              {errors.departureDate && <span className="error-message">{errors.departureDate}</span>}
            </div>
          </div>

          {/* Número de personas */}
          <div className="form-group">
            <label htmlFor="people" className="form-label">Número de personas</label>
            <div className="select-container">
              <select
                id="people"
                name="people"
                value={formData.people}
                onChange={handleInputChange}
                className="form-select"
                disabled={isSubmitting}
              >
                {PEOPLE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined select-arrow">expand_more</span>
            </div>
          </div>

          {/* Tipo de alojamiento */}
          <div className="form-group">
            <label htmlFor="accommodationType" className="form-label">Tipo de alojamiento preferido</label>
            <div className="select-container">
              <select
                id="accommodationType"
                name="accommodationType"
                value={formData.accommodationType}
                onChange={handleInputChange}
                className="form-select"
                disabled={isSubmitting}
              >
                {ACCOMMODATION_TYPES.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined select-arrow">expand_more</span>
            </div>
          </div>

          {/* Mensaje */}
          <div className="form-group">
            <label htmlFor="message" className="form-label">Mensaje/Comentarios</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje"
              rows={5}
              className={`form-textarea ${errors.message ? 'error' : ''}`}
              disabled={isSubmitting}
            ></textarea>
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          {/* Status del envío */}
          {submitStatus.type && (
            <div className={`submit-status ${submitStatus.type}`}>
              <span className="material-symbols-outlined">
                {submitStatus.type === 'success' ? 'check_circle' : 'error'}
              </span>
              {submitStatus.message}
            </div>
          )}

          {/* Botón de envío */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Enviando...
              </>
            ) : (
              'Enviar'
            )}
          </button>
        </form>

        {/* Información de contacto adicional */}
        <div className="additional-contact">
          <h2 className="additional-title">Otras formas de contactarnos</h2>
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div className="contact-info">
                <p className="contact-method-title">Teléfono</p>
                <p className="contact-method-detail">{CONTACT_INFO.phone}</p>
              </div>
            </div>
            <div className="contact-method">
              <div className="contact-icon">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div className="contact-info">
                <p className="contact-method-title">Email</p>
                <p className="contact-method-detail">{CONTACT_INFO.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Navigation */}
      <FooterNavigation />
    </div>
  );
};

export default ContactPage;