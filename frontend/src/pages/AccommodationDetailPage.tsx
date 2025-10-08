import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS } from '../config/constants';
import './AccommodationDetailPage.css';

// Interfaces
interface Accommodation {
  id: string;
  name: string;
  type: string;
  description: string;
  capacity: {
    adults: number;
    children: number;
  };
  price_per_night: number;
  size_m2?: number;
  bedrooms?: number;
  beds?: string;
  amenities: string[];
  rules?: {
    check_in?: string;
    check_out?: string;
    pets?: boolean;
    noise_curfew?: string;
    minimum_stay?: string;
  };
  location?: string;
  images: string[];
  services_nearby?: string[];
  reviews?: Array<{
    author: string;
    rating: number;
    comment: string;
  }>;
}

interface CampingInfo {
  name: string;
  location: string;
  rating: number;
  total_reviews: number;
}

interface ApiResponse {
  accommodation: Accommodation;
  camping: CampingInfo;
}

// Componentes auxiliares
const FooterNavigation: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="footer-nav">
      <button 
        onClick={() => navigate('/')}
        className="footer-button"
      >
        <span className="material-symbols-outlined">home</span>
        <span>Inicio</span>
      </button>
      <button 
        onClick={() => navigate('/availability')}
        className="footer-button active"
      >
        <span className="material-symbols-outlined">calendar_month</span>
        <span>Reservar</span>
      </button>
      <button 
        onClick={() => navigate('/contact')}
        className="footer-button"
      >
        <span className="material-symbols-outlined">call</span>
        <span>Contacto</span>
      </button>
    </div>
  );
};

// Calendar component
const Calendar: React.FC = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay();
  
  // Ajustar el día de la semana (0 es domingo, pero queremos que 0 sea lunes)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day"></div>);
  }
  
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === currentDate.getDate();
    const isSelected = i === 5 || i === 6; // Ejemplo de fechas seleccionadas
    let className = "calendar-day";
    
    if (isToday) className += " today";
    if (isSelected) className += " selected";
    if (i < currentDate.getDate() || i > currentDate.getDate() + 10) className += " unavailable";
    else className += " available";
    
    calendarDays.push(
      <div key={i} className={className}>
        {i}
      </div>
    );
  }
  
  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <h3 className="calendar-title">{currentMonth} {currentYear}</h3>
        <div className="calendar-nav">
          <button className="calendar-button">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="calendar-button">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      
      <div className="calendar-grid">
        <div className="calendar-day-label">L</div>
        <div className="calendar-day-label">M</div>
        <div className="calendar-day-label">X</div>
        <div className="calendar-day-label">J</div>
        <div className="calendar-day-label">V</div>
        <div className="calendar-day-label">S</div>
        <div className="calendar-day-label">D</div>
        {calendarDays}
      </div>
    </div>
  );
};

// Componente principal
const AccommodationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Extraer parámetros de búsqueda
  const checkIn = queryParams.get('check_in') || '';
  const checkOut = queryParams.get('check_out') || '';
  
  // Calcular número de noches
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 3; // Default value
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };
  
  const nights = calculateNights();
  
  useEffect(() => {
    const fetchAccommodationDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${API_ENDPOINTS.ACCOMMODATION}?id=${id}`);
        
        if (!response.ok) {
          throw new Error('Error al cargar los datos del alojamiento');
        }
        
        const data: ApiResponse = await response.json();
        setAccommodation(data.accommodation);
        // camping data is available in data.camping but not needed in state
      } catch (err) {
        setError('Error al cargar los detalles del alojamiento');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAccommodationDetails();
  }, [id]);
  
  // Función para obtener la URL completa de la imagen
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}/${imagePath}`;
  };
  
  if (isLoading) {
    return (
      <div className="accommodation-detail-page">
        <div className="page-container">
          <header className="detail-header">
            <button 
              onClick={() => navigate('/availability')} 
              className="back-button"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="page-subtitle">Alojamiento</h1>
            <div className="spacer"></div>
          </header>
          <div className="detail-content" style={{ padding: '20px', textAlign: 'center' }}>
            <p>Cargando detalles del alojamiento...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !accommodation) {
    return (
      <div className="accommodation-detail-page">
        <div className="page-container">
          <header className="detail-header">
            <button 
              onClick={() => navigate('/availability')} 
              className="back-button"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="page-subtitle">Alojamiento</h1>
            <div className="spacer"></div>
          </header>
          <div className="detail-content" style={{ padding: '20px', textAlign: 'center' }}>
            <p>{error || 'No se encontró información del alojamiento'}</p>
            <button 
              onClick={() => navigate('/availability')}
              style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px' }}
            >
              Volver a la búsqueda
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="accommodation-detail-page">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      
      <div className="page-container">
        <header className="detail-header">
          <button 
            onClick={() => navigate('/availability')} 
            className="back-button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="page-subtitle">
            Inicio &gt; Disponibilidades &gt; {accommodation.name}
          </h1>
          <div className="spacer"></div>
        </header>

        <div className="detail-content">
          {/* Imagen Principal */}
          <img 
            src={getImageUrl(accommodation.images[0])}
            alt={accommodation.name}
            className="main-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `${API_BASE_URL}/placeholder.php?type=${id}&width=600&height=400`;
            }}
          />
          
          {/* Detalles del alojamiento */}
          <div className="detail-section">
            <h2 className="accommodation-title">{accommodation.name}</h2>
            <p className="accommodation-description">{accommodation.description}</p>
            
            {/* Información básica */}
            <div className="info-section">
              <h3 className="info-title">Capacidad máxima</h3>
              <div className="info-row">
                <span className="info-value">{accommodation.capacity.adults + accommodation.capacity.children} personas</span>
              </div>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Dimensiones</h3>
              <div className="info-row">
                <span className="info-value">{accommodation.size_m2 || '40'} m²</span>
              </div>
            </div>
            
            <div className="info-section">
              <h3 className="info-title">Características</h3>
              <div className="info-row">
                <span className="info-value">
                  {accommodation.bedrooms ? `${accommodation.bedrooms} habitaciones, ` : ''}
                  {accommodation.beds || '1 baño, cocina equipada'}
                </span>
              </div>
            </div>
            
            {/* Galería */}
            <div className="gallery-section">
              <h3 className="gallery-title">Galería</h3>
              <div className="gallery-grid">
                {accommodation.images.slice(1).map((image, index) => (
                  <img 
                    key={index}
                    src={getImageUrl(image)} 
                    alt={`${accommodation.name} - Imagen ${index + 2}`}
                    className="gallery-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `${API_BASE_URL}/placeholder.php?type=${id}&width=300&height=200&variant=${index + 1}`;
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Servicios incluidos */}
            <div className="services-section">
              <h3 className="services-title">Servicios incluidos</h3>
              <div className="services-grid">
                {accommodation.amenities.map((amenity, index) => (
                  <div key={index} className="service-item">
                    <span className="material-symbols-outlined service-icon">
                      {amenity.includes('Wifi') ? 'wifi' : 
                       amenity.includes('Cocina') ? 'kitchen' : 
                       amenity.includes('Baño') ? 'bathroom' : 
                       amenity.includes('Chimenea') ? 'fireplace' :
                       amenity.includes('Terraza') ? 'deck' :
                       amenity.includes('TV') ? 'tv' :
                       amenity.includes('Calefacción') ? 'heat' :
                       amenity.includes('Aire') ? 'ac_unit' :
                       amenity.includes('Parking') ? 'local_parking' :
                       amenity.includes('Desayuno') ? 'breakfast_dining' :
                       amenity.includes('Jacuzzi') ? 'hot_tub' :
                       amenity.includes('Bosque') ? 'forest' : 'check'}
                    </span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Precios */}
            <div className="prices-section">
              <h3 className="prices-title">Precios</h3>
              <div className="price-row">
                <span className="price-label">Precio base por noche</span>
                <span className="price-value">€{accommodation.price_per_night}</span>
              </div>
              <div className="price-row">
                <span className="price-label">Extras (limpieza)</span>
                <span className="price-value">€20</span>
              </div>
              <div className="price-row">
                <span className="price-label">Impuestos</span>
                <span className="price-value">€15</span>
              </div>
              <div className="price-row price-total">
                <span className="price-label">Precio total estimado</span>
                <span className="price-value">€{(accommodation.price_per_night * nights) + 20 + 15}</span>
              </div>
            </div>
            
            {/* Calendario */}
            <Calendar />
            
            {/* Información adicional */}
            <div className="additional-info-section">
              <h3 className="additional-info-title">Información Adicional</h3>
              <div className="info-row">
                <span className="info-label">Política de Cancelación</span>
                <span className="info-value">Flexible</span>
              </div>
              <div className="info-row">
                <span className="info-label">Check-in/Check-out</span>
                <span className="info-value">
                  {accommodation.rules?.check_in || '15:00'}/{accommodation.rules?.check_out || '11:00'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Normas</span>
                <span className="info-value">
                  {accommodation.rules?.pets === false ? 'No se admiten mascotas' : 'Se admiten mascotas'}
                </span>
              </div>
            </div>
            
            {/* Acciones */}
            <div className="actions-section">
              <button className="reserve-button">
                Reservar este Alojamiento
              </button>
              <button className="contact-button" onClick={() => navigate('/contact')}>
                Contactar para más información
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Navigation */}
      <FooterNavigation />
    </div>
  );
};

export default AccommodationDetailPage;