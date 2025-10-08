// utils/index.ts - Utilidades compartidas

import { API_BASE_URL, API_ENDPOINTS, AMENITY_ICONS } from '../config/constants';

/**
 * Obtiene la URL completa de una imagen
 */
export const getImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}/${imagePath}`;
};

/**
 * Genera URL de placeholder para imágenes que fallan al cargar
 */
export const getPlaceholderUrl = (type: string, width: number = 400, height: number = 300, variant?: number): string => {
  const params = new URLSearchParams({
    type,
    width: width.toString(),
    height: height.toString(),
    ...(variant && { variant: variant.toString() })
  });
  
  return `${API_ENDPOINTS.PLACEHOLDER}?${params.toString()}`;
};

/**
 * Obtiene el icono apropiado para una amenidad
 */
export const getAmenityIcon = (amenity: string): string => {
  const amenityKey = Object.keys(AMENITY_ICONS).find(key => 
    amenity.toLowerCase().includes(key.toLowerCase())
  );
  
  return amenityKey ? AMENITY_ICONS[amenityKey as keyof typeof AMENITY_ICONS] : 'check';
};

/**
 * Calcula el número de noches entre dos fechas
 */
export const calculateNights = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 3; // Valor por defecto
  
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = end.getTime() - start.getTime();
  
  return Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
};

/**
 * Formatea una fecha para mostrar en español
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Valida un email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounce function para optimizar búsquedas
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Genera un ID único para formularios
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Sanitiza texto para prevenir XSS
 */
export const sanitizeText = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Construye parámetros de URL para navegación
 */
export const buildUrlParams = (params: Record<string, string | number>): string => {
  const urlParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      urlParams.set(key, value.toString());
    }
  });
  
  return urlParams.toString();
};