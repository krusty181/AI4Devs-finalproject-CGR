// hooks/index.ts - Hooks personalizados reutilizables

import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import type { SearchParams } from '../types';

/**
 * Hook para manejar parámetros de búsqueda de la URL
 */
export const useSearchParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const searchParams: SearchParams = {
    check_in: queryParams.get('check_in') || '',
    check_out: queryParams.get('check_out') || '',
    adults: parseInt(queryParams.get('adults') || '2', 10),
    children: parseInt(queryParams.get('children') || '0', 10)
  };
  
  return searchParams;
};

/**
 * Hook para manejar estados de carga
 */
export const useLoading = (initialState: boolean = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  
  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);
  
  return { isLoading, startLoading, stopLoading };
};

/**
 * Hook para manejar errores
 */
export const useError = () => {
  const [error, setError] = useState<string | null>(null);
  
  const clearError = useCallback(() => setError(null), []);
  const setErrorMessage = useCallback((message: string) => setError(message), []);
  
  return { error, setError: setErrorMessage, clearError };
};

/**
 * Hook para realizar llamadas a API
 */
export const useApi = <T>() => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { error, setError, clearError } = useError();
  const [data, setData] = useState<T | null>(null);
  
  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    startLoading();
    clearError();
    
    try {
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, setError, clearError]);
  
  return { data, isLoading, error, execute };
};

/**
 * Hook para validación de formularios
 */
export const useFormValidation = <T extends Record<string, any>>(
  initialData: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  
  const validate = useCallback((field?: keyof T) => {
    const fieldsToValidate = field ? [field] : Object.keys(validationRules) as Array<keyof T>;
    const newErrors: Partial<Record<keyof T, string>> = { ...errors };
    
    fieldsToValidate.forEach((fieldName) => {
      const error = validationRules[fieldName](formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      } else {
        delete newErrors[fieldName];
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, errors, validationRules]);
  
  const setValue = useCallback((field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validar el campo individual después de un pequeño delay
    setTimeout(() => validate(field), 100);
  }, [validate]);
  
  const reset = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);
  
  return {
    formData,
    errors,
    touched,
    setValue,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0
  };
};

/**
 * Hook para manejar scroll y mostrar/ocultar elementos
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };
    
    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection, lastScrollY]);
  
  return scrollDirection;
};

/**
 * Hook para detectar el tamaño de pantalla
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const handleChange = () => setMatches(media.matches);
    media.addListener(handleChange);
    
    return () => media.removeListener(handleChange);
  }, [matches, query]);
  
  return matches;
};