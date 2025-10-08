import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS } from '../config/constants';
import './AvailabilityPage.css';

// Tipos
interface SearchParams {
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
}

interface Accommodation {
  id: string;
  name: string;
  type: string;
  description: string;
  price_per_night: number;
  images: string[];
  capacity: {
    adults: number;
    children: number;
  };
  amenities: string[];
}

interface AvailabilityData {
  available_accommodations?: Accommodation[];
  exact_matches?: Accommodation[];
  random_suggestions?: Accommodation[];
  has_random_suggestions?: boolean;
}

// Componentes
const AccommodationCard: React.FC<{
  accommodation: Accommodation;
  searchParams: SearchParams;
  getImageUrl: (path: string) => string;
}> = ({ accommodation, searchParams, getImageUrl }) => {
  const navigate = useNavigate();
  
  const handleViewAvailability = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(`/accommodation/${accommodation.id}?check_in=${searchParams.check_in}&check_out=${searchParams.check_out}&adults=${searchParams.adults}&children=${searchParams.children}`);
  };
  
  const totalCapacity = accommodation.capacity.adults + accommodation.capacity.children;
  
  return (
    <div className="accommodation-card">
      <img 
        className="accommodation-image"
        alt={accommodation.name}
        src={getImageUrl(accommodation.images[0])}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `${API_BASE_URL}/placeholder.php?type=${accommodation.id}&width=400&height=300`;
        }}
      />
      <div className="accommodation-content">
        <h4 className="accommodation-title">{accommodation.name}</h4>
        <p className="accommodation-type">
          {accommodation.type} - {totalCapacity} personas
        </p>
        <p className="accommodation-description">{accommodation.description}</p>
        <div className="amenities-container">
          {accommodation.amenities && accommodation.amenities.slice(0, 3).map((amenity: string, index: number) => (
            <span key={index} className="amenity">
              <span className="material-symbols-outlined amenity-icon">
                {amenity.includes('Wifi') ? 'wifi' : 
                 amenity.includes('TV') ? 'tv' : 
                 amenity.includes('AC') || amenity.includes('aire') ? 'ac_unit' : 
                 amenity.includes('baño') ? 'bathroom' : 'check'}
              </span>
              {amenity}
            </span>
          ))}
        </div>
        <p className="price">€{accommodation.price_per_night}/noche</p>
        <a 
          href="#" 
          className="view-availability"
          onClick={handleViewAvailability}
        >
          Ver disponibilidad
        </a>
      </div>
    </div>
  );
};

const SearchForm: React.FC<{
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
  isLoading: boolean;
}> = ({ searchParams, setSearchParams, selectedType, setSelectedType, handleSearch, isLoading }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="search-form">
      <div className="dates-container">
        <div className="form-group">
          <label className="form-label">Entrada</label>
          <input 
            className="date-input form-control"
            type="date"
            value={searchParams.check_in}
            onChange={(e) => setSearchParams(prev => ({ ...prev, check_in: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Salida</label>
          <input 
            className="date-input form-control"
            type="date"
            value={searchParams.check_out}
            onChange={(e) => setSearchParams(prev => ({ ...prev, check_out: e.target.value }))}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Huéspedes</label>
        <select 
          className="select-dropdown form-control"
          value={`${searchParams.adults} adultos, ${searchParams.children} niños`}
          onChange={(e) => {
            const value = e.target.value;
            const adultsMatch = value.match(/(\d+) adultos/);
            const childrenMatch = value.match(/(\d+) niños/);
            setSearchParams(prev => ({
              ...prev,
              adults: adultsMatch ? parseInt(adultsMatch[1]) : 2,
              children: childrenMatch ? parseInt(childrenMatch[1]) : 0
            }));
          }}
        >
          <option>2 adultos, 0 niños</option>
          <option>2 adultos, 1 niño</option>
          <option>2 adultos, 2 niños</option>
          <option>4 adultos, 0 niños</option>
          <option>4 adultos, 2 niños</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Tipo de alojamiento</label>
        <div className="type-buttons">
          <button 
            type="button"
            className={`btn-type ${selectedType === 'Cabañas' ? 'selected' : ''}`}
            onClick={() => setSelectedType('Cabañas')}
          >
            Cabañas
          </button>
          <button 
            type="button"
            className={`btn-type ${selectedType === 'Parcelas' ? 'selected' : ''}`}
            onClick={() => setSelectedType('Parcelas')}
          >
            Parcelas
          </button>
          <button 
            type="button"
            className={`btn-type ${selectedType === 'Glamping' ? 'selected' : ''}`}
            onClick={() => setSelectedType('Glamping')}
          >
            Glamping
          </button>
        </div>
      </div>

      <button 
        className="btn-search"
        type="submit"
        disabled={isLoading}
      >
        <span className="material-symbols-outlined">search</span>
        <span>{isLoading ? 'Buscando...' : 'Buscar disponibilidad'}</span>
      </button>
    </form>
  );
};

const ResultsSection: React.FC<{
  availability: AvailabilityData | null;
  searchParams: SearchParams;
  totalGuests: number;
  getImageUrl: (path: string) => string;
}> = ({ availability, searchParams, totalGuests, getImageUrl }) => {
  if (!availability) return null;
  
  return (
    <div className="results-section">
      <h3 className="results-title">Resultados</h3>
      <p className="results-subtitle">
        Del {new Date(searchParams.check_in).toLocaleDateString('es-ES')} al {new Date(searchParams.check_out).toLocaleDateString('es-ES')} · {totalGuests} huéspedes
      </p>
      
      {availability.has_random_suggestions && availability.random_suggestions && (
        <>
          <div className="no-results-alert">
            <p>No se encontraron resultados exactos para tu búsqueda.</p>
          </div>
          
          <h3 className="suggestion-title">También te puede interesar</h3>
          
          {availability.random_suggestions.map((accommodation: Accommodation) => (
            <AccommodationCard 
              key={accommodation.id} 
              accommodation={accommodation} 
              searchParams={searchParams}
              getImageUrl={getImageUrl}
            />
          ))}
        </>
      )}
      
      {!availability.has_random_suggestions && availability.available_accommodations && availability.available_accommodations.length > 0 && (
        <>
          {availability.available_accommodations.map((accommodation: Accommodation) => (
            <AccommodationCard 
              key={accommodation.id} 
              accommodation={accommodation} 
              searchParams={searchParams}
              getImageUrl={getImageUrl}
            />
          ))}
        </>
      )}
      
      {!availability.has_random_suggestions && (!availability.available_accommodations || availability.available_accommodations.length === 0) && (
        <div className="no-results-alert">
          <p>No se encontraron resultados disponibles.</p>
        </div>
      )}
    </div>
  );
};

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
      <button className="footer-button active">
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

// Componente principal
const AvailabilityPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    check_in: new Date().toISOString().split('T')[0],
    check_out: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    adults: 2,
    children: 0,
  });
  
  // Calcular el número total de huéspedes usando useMemo para evitar recálculos innecesarios
  const totalGuests = useMemo(() => {
    return Number(searchParams.adults) + Number(searchParams.children);
  }, [searchParams.adults, searchParams.children]);

  const [availability, setAvailability] = useState<AvailabilityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('Cabañas');

  // Función para buscar disponibilidad
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        check_in: searchParams.check_in,
        check_out: searchParams.check_out,
        adults: searchParams.adults.toString(),
        children: searchParams.children.toString(),
        type: selectedType.toLowerCase()
      });
      
      const response = await fetch(`${API_ENDPOINTS.AVAILABILITY}?${params}`);
      const data = await response.json();
      
      // Crear una copia para no modificar el original directamente
      const result = {...data};
      
      // Obtener todos los alojamientos para recomendaciones si no hay resultados
      let allAccommodations = [...(data.available_accommodations || [])];
      
      // Filtrar resultados por tipo de alojamiento seleccionado
      if (result && result.available_accommodations) {
        let filteredAccommodations = [];
        
        if (selectedType === 'Cabañas') {
          filteredAccommodations = result.available_accommodations.filter(
            (acc: Accommodation) => acc.type && acc.type.toLowerCase().includes('cabaña')
          );
        } else if (selectedType === 'Parcelas') {
          filteredAccommodations = result.available_accommodations.filter(
            (acc: Accommodation) => acc.type && acc.type.toLowerCase().includes('parcela')
          );
        } else if (selectedType === 'Glamping') {
          filteredAccommodations = result.available_accommodations.filter(
            (acc: Accommodation) => acc.type && acc.type.toLowerCase().includes('glamping')
          );
        } else {
          filteredAccommodations = result.available_accommodations;
        }
        
        // Almacenar los resultados exactos y los resultados aleatorios por separado
        result.exact_matches = filteredAccommodations;
        
        // Si no hay resultados exactos, mostrar todos los disponibles como recomendaciones
        if (filteredAccommodations.length === 0 && allAccommodations.length > 0) {
          result.has_random_suggestions = true;
          // Ordenar aleatoriamente las recomendaciones
          result.random_suggestions = allAccommodations
            .sort(() => Math.random() - 0.5)
            .slice(0, 3); // Mostrar máximo 3 recomendaciones aleatorias
        } else {
          // Si hay resultados exactos, mostrarlos como disponibles
          result.available_accommodations = filteredAccommodations;
          result.has_random_suggestions = false;
        }
      }
      
      setAvailability(result);
    } catch (err) {
      setError('Error al buscar disponibilidad');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para obtener la URL completa de la imagen
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}/${imagePath}`;
  };

  // Inicializar búsqueda al cargar la página
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="availability-page">
      {/* Fuentes de Google y Material Icons */}
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      
      <div className="page-container">
        {/* Header */}
        <header className="page-header">
          <button 
            onClick={() => navigate('/')} 
            className="back-button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="page-title">Camping Oasis</h1>
          <div className="spacer"></div>
        </header>

        <main className="main-content">
          <h2 className="main-heading">Encuentra tu lugar perfecto</h2>
          
          {/* Search Form Component */}
          <SearchForm 
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            handleSearch={handleSearch}
            isLoading={isLoading}
          />

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Results Section Component */}
          <ResultsSection 
            availability={availability}
            searchParams={searchParams}
            totalGuests={totalGuests}
            getImageUrl={getImageUrl}
          />
        </main>
      </div>

      {/* Footer Navigation Component */}
      <FooterNavigation />
    </div>
  )
}

export default AvailabilityPage