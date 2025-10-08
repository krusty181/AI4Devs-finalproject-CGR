// config/constants.ts - Constantes de configuración de la aplicación

// API Base URL desde variable de entorno - ¡Cambiar solo en .env!
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  AVAILABILITY: `${API_BASE_URL}/availability.php`,
  ACCOMMODATION: `${API_BASE_URL}/accommodation.php`,
  CONTACT: `${API_BASE_URL}/contact.php`,
  PLACEHOLDER: `${API_BASE_URL}/placeholder.php`
} as const;

export const ROUTES = {
  HOME: '/',
  AVAILABILITY: '/availability',
  ACCOMMODATION: '/accommodation',
  CONTACT: '/contact'
} as const;

export const THEME_COLORS = {
  primary: '#54cf17',
  primaryLight: '#ecf7e6',
  background: '#f6f8f6',
  textColor: '#333333',
  lightGray: '#7a7a7a',
  borderColor: '#e0e0e0',
  errorColor: '#dc3545',
  successColor: '#28a745',
  surfaceSubtle: '#f0f2f0'
} as const;

export const ACCOMMODATION_TYPES = [
  'Parcela',
  'Cabaña',
  'Glamping Suite',
  'Tienda de campaña',
  'Autocaravana'
] as const;

export const PEOPLE_OPTIONS = [
  { value: '1', label: '1 persona' },
  { value: '2', label: '2 personas' },
  { value: '3', label: '3 personas' },
  { value: '4', label: '4 personas' },
  { value: '5', label: '5 personas' },
  { value: '6', label: '6 personas' },
  { value: '7+', label: '7 o más personas' }
] as const;

export const CONTACT_INFO = {
  phone: '+34 666 777 888',
  email: 'reservas@camping.com',
  name: 'Camping Oasis',
  location: 'Costa Brava, Girona'
} as const;

export const AMENITY_ICONS = {
  'Wifi': 'wifi',
  'Cocina': 'kitchen',
  'Baño': 'bathroom',
  'Chimenea': 'fireplace',
  'Terraza': 'deck',
  'TV': 'tv',
  'Calefacción': 'heat',
  'Aire': 'ac_unit',
  'Parking': 'local_parking',
  'Desayuno': 'breakfast_dining',
  'Jacuzzi': 'hot_tub',
  'Bosque': 'forest'
} as const;

export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 1000
} as const;