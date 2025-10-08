import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import * as campingService from '../../services/campingService';

// Mock the camping service
vi.mock('../../services/campingService');

const mockCampingService = vi.mocked(campingService);

// Test wrapper with providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const mockCampingData = {
  camping_id: 1,
  name: 'KCAMP - Camping Piloto',
  description: 'Disfruta de unas vacaciones inolvidables en nuestro camping piloto, ubicado en un entorno natural privilegiado.',
  location: 'Costa Brava, Girona, España',
  phone: '+34 972 123 456',
  email: 'info@kcamp.com',
  website: 'https://kcamp.com',
  services: [
    'WiFi gratuito',
    'Piscina',
    'Restaurante',
    'Parque infantil',
    'Supermercado',
    'Lavandería'
  ],
  images: [
    'camping-general.jpg',
    'piscina.jpg',
    'restaurante.jpg',
    'parcelas.jpg'
  ],
  latitude: 41.9794,
  longitude: 3.0297
};

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCampingService.getCampingInfo.mockResolvedValue({
      data: mockCampingData
    });
  });

  it('should render camping information correctly', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Wait for the component to load camping data
    expect(await screen.findByText('KCAMP - Camping Piloto')).toBeInTheDocument();
    expect(screen.getByText(/disfruta de unas vacaciones inolvidables/i)).toBeInTheDocument();
    expect(screen.getByText('Costa Brava, Girona, España')).toBeInTheDocument();
  });

  it('should display services list', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Wait for services to load
    expect(await screen.findByText('WiFi gratuito')).toBeInTheDocument();
    expect(screen.getByText('Piscina')).toBeInTheDocument();
    expect(screen.getByText('Restaurante')).toBeInTheDocument();
    expect(screen.getByText('Parque infantil')).toBeInTheDocument();
    expect(screen.getByText('Supermercado')).toBeInTheDocument();
    expect(screen.getByText('Lavandería')).toBeInTheDocument();
  });

  it('should display contact information', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Wait for contact info to load
    expect(await screen.findByText('+34 972 123 456')).toBeInTheDocument();
    expect(screen.getByText('info@kcamp.com')).toBeInTheDocument();
    expect(screen.getByText('https://kcamp.com')).toBeInTheDocument();
  });

  it('should display navigation buttons', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Wait for component to load
    await screen.findByText('KCAMP - Camping Piloto');

    // Check for navigation buttons
    expect(screen.getByText('Ver Disponibilidad')).toBeInTheDocument();
    expect(screen.getByText('Contactar')).toBeInTheDocument();
  });

  it('should handle loading state', () => {
    mockCampingService.getCampingInfo.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ data: mockCampingData }), 100))
    );

    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    expect(screen.getByText(/cargando información del camping/i)).toBeInTheDocument();
  });

  it('should handle error state', async () => {
    mockCampingService.getCampingInfo.mockRejectedValue(
      new Error('Failed to fetch camping data')
    );

    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    expect(await screen.findByText(/error al cargar la información del camping/i)).toBeInTheDocument();
  });

  it('should render image gallery', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Wait for images to load
    await screen.findByText('KCAMP - Camping Piloto');

    // Check that images are rendered (assuming they have alt attributes)
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('should have correct page structure with semantic HTML', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Wait for content to load
    await screen.findByText('KCAMP - Camping Piloto');

    // Check for semantic elements
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // Check for heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('KCAMP - Camping Piloto');
  });

  it('should display services with proper accessibility', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Wait for services to load
    await screen.findByText('WiFi gratuito');

    // Services should be in a list for accessibility
    const servicesList = screen.getByRole('list');
    expect(servicesList).toBeInTheDocument();

    const serviceItems = screen.getAllByRole('listitem');
    expect(serviceItems.length).toBe(6); // Number of services
  });

  it('should have working navigation links', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>
    );

    // Wait for navigation to load
    await screen.findByText('Ver Disponibilidad');

    const availabilityLink = screen.getByText('Ver Disponibilidad');
    const contactLink = screen.getByText('Contactar');

    expect(availabilityLink).toBeInTheDocument();
    expect(availabilityLink.closest('a')).toHaveAttribute('href', '/availability');
    
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
  });
});