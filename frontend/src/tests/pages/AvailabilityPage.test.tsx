import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AvailabilityPage from '../../pages/AvailabilityPage';
import * as availabilityService from '../../services/availabilityService';

// Mock the availability service
vi.mock('../../services/availabilityService');

const mockAvailabilityService = vi.mocked(availabilityService);

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

describe('AvailabilityPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search form correctly', () => {
    render(
      <TestWrapper>
        <AvailabilityPage />
      </TestWrapper>
    );

    expect(screen.getByText('Buscar Disponibilidad')).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha de entrada/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha de salida/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número de huéspedes/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
  });

  it('should validate form inputs', async () => {
    render(
      <TestWrapper>
        <AvailabilityPage />
      </TestWrapper>
    );

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/la fecha de entrada es obligatoria/i)).toBeInTheDocument();
      expect(screen.getByText(/la fecha de salida es obligatoria/i)).toBeInTheDocument();
    });
  });

  it('should validate that check-in date is in the future', async () => {
    render(
      <TestWrapper>
        <AvailabilityPage />
      </TestWrapper>
    );

    // Set a past date
    const checkInInput = screen.getByLabelText(/fecha de entrada/i);
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    
    fireEvent.change(checkInInput, {
      target: { value: pastDate.toISOString().split('T')[0] }
    });

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/la fecha debe ser futura/i)).toBeInTheDocument();
    });
  });

  it('should validate that check-out is after check-in', async () => {
    render(
      <TestWrapper>
        <AvailabilityPage />
      </TestWrapper>
    );

    const checkInInput = screen.getByLabelText(/fecha de entrada/i);
    const checkOutInput = screen.getByLabelText(/fecha de salida/i);
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

    // Set check-out before check-in
    fireEvent.change(checkInInput, {
      target: { value: dayAfterTomorrow.toISOString().split('T')[0] }
    });
    fireEvent.change(checkOutInput, {
      target: { value: tomorrow.toISOString().split('T')[0] }
    });

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/la fecha de salida debe ser posterior a la de entrada/i)).toBeInTheDocument();
    });
  });

  it('should display results after successful search', async () => {
    const mockResults = [
      {
        id: 1,
        name: 'Parcela Estándar',
        description: 'Parcela con servicios básicos',
        maxGuests: 6,
        pricePerNight: 35.0,
        availableUnits: 3,
        images: ['parcela1.jpg'],
        services: ['electricidad', 'agua']
      },
      {
        id: 2,
        name: 'Parcela Premium',
        description: 'Parcela con servicios premium',
        maxGuests: 8,
        pricePerNight: 55.0,
        availableUnits: 1,
        images: ['parcela2.jpg'],
        services: ['electricidad', 'agua', 'wifi']
      }
    ];

    mockAvailabilityService.searchAvailability.mockResolvedValue({
      data: { availableAccommodations: mockResults }
    });

    render(
      <TestWrapper>
        <AvailabilityPage />
      </TestWrapper>
    );

    // Fill in valid form data
    const checkInInput = screen.getByLabelText(/fecha de entrada/i);
    const checkOutInput = screen.getByLabelText(/fecha de salida/i);
    const guestsInput = screen.getByLabelText(/número de huéspedes/i);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate() + 8);

    fireEvent.change(checkInInput, {
      target: { value: tomorrow.toISOString().split('T')[0] }
    });
    fireEvent.change(checkOutInput, {
      target: { value: weekLater.toISOString().split('T')[0] }
    });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Parcela Estándar')).toBeInTheDocument();
      expect(screen.getByText('Parcela Premium')).toBeInTheDocument();
      expect(screen.getByText('3 disponibles')).toBeInTheDocument();
      expect(screen.getByText('1 disponibles')).toBeInTheDocument();
      expect(screen.getByText('35,00 €/noche')).toBeInTheDocument();
      expect(screen.getByText('55,00 €/noche')).toBeInTheDocument();
    });
  });

  it('should display no results message when search returns empty', async () => {
    mockAvailabilityService.searchAvailability.mockResolvedValue({
      data: { availableAccommodations: [] }
    });

    render(
      <TestWrapper>
        <AvailabilityPage />
      </TestWrapper>
    );

    // Fill in valid form data
    const checkInInput = screen.getByLabelText(/fecha de entrada/i);
    const checkOutInput = screen.getByLabelText(/fecha de salida/i);
    const guestsInput = screen.getByLabelText(/número de huéspedes/i);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate() + 8);

    fireEvent.change(checkInInput, {
      target: { value: tomorrow.toISOString().split('T')[0] }
    });
    fireEvent.change(checkOutInput, {
      target: { value: weekLater.toISOString().split('T')[0] }
    });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/no se encontraron alojamientos disponibles/i)).toBeInTheDocument();
    });
  });

  it('should display loading state during search', async () => {
    mockAvailabilityService.searchAvailability.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ data: { availableAccommodations: [] } }), 100))
    );

    render(
      <TestWrapper>
        <AvailabilityPage />
      </TestWrapper>
    );

    // Fill in valid form data
    const checkInInput = screen.getByLabelText(/fecha de entrada/i);
    const checkOutInput = screen.getByLabelText(/fecha de salida/i);
    const guestsInput = screen.getByLabelText(/número de huéspedes/i);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate() + 8);

    fireEvent.change(checkInInput, {
      target: { value: tomorrow.toISOString().split('T')[0] }
    });
    fireEvent.change(checkOutInput, {
      target: { value: weekLater.toISOString().split('T')[0] }
    });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);

    expect(screen.getByText(/buscando disponibilidad/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/buscando disponibilidad/i)).not.toBeInTheDocument();
    });
  });

  it('should handle API errors gracefully', async () => {
    mockAvailabilityService.searchAvailability.mockRejectedValue(
      new Error('API Error')
    );

    render(
      <TestWrapper>
        <AvailabilityPage />
      </TestWrapper>
    );

    // Fill in valid form data and submit
    const checkInInput = screen.getByLabelText(/fecha de entrada/i);
    const checkOutInput = screen.getByLabelText(/fecha de salida/i);
    const guestsInput = screen.getByLabelText(/número de huéspedes/i);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate() + 8);

    fireEvent.change(checkInInput, {
      target: { value: tomorrow.toISOString().split('T')[0] }
    });
    fireEvent.change(checkOutInput, {
      target: { value: weekLater.toISOString().split('T')[0] }
    });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/error al buscar disponibilidad/i)).toBeInTheDocument();
    });
  });

  it('should filter results by accommodation type', async () => {
    const mockResults = [
      {
        id: 1,
        name: 'Parcela Estándar',
        description: 'Parcela con servicios básicos',
        maxGuests: 6,
        pricePerNight: 35.0,
        availableUnits: 3,
        images: ['parcela1.jpg'],
        services: ['electricidad', 'agua'],
        type: 'standard'
      },
      {
        id: 2,
        name: 'Parcela Premium',
        description: 'Parcela con servicios premium',
        maxGuests: 8,
        pricePerNight: 55.0,
        availableUnits: 1,
        images: ['parcela2.jpg'],
        services: ['electricidad', 'agua', 'wifi'],
        type: 'premium'
      }
    ];

    mockAvailabilityService.searchAvailability.mockResolvedValue({
      data: { availableAccommodations: mockResults }
    });

    render(
      <TestWrapper>
        <AvailabilityPage />
      </TestWrapper>
    );

    // Perform search first
    const checkInInput = screen.getByLabelText(/fecha de entrada/i);
    const checkOutInput = screen.getByLabelText(/fecha de salida/i);
    const guestsInput = screen.getByLabelText(/número de huéspedes/i);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const weekLater = new Date();
    weekLater.setDate(weekLater.getDate() + 8);

    fireEvent.change(checkInInput, {
      target: { value: tomorrow.toISOString().split('T')[0] }
    });
    fireEvent.change(checkOutInput, {
      target: { value: weekLater.toISOString().split('T')[0] }
    });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Parcela Estándar')).toBeInTheDocument();
      expect(screen.getByText('Parcela Premium')).toBeInTheDocument();
    });

    // Now test filtering
    const typeFilter = screen.getByLabelText(/tipo de alojamiento/i);
    fireEvent.change(typeFilter, { target: { value: 'premium' } });

    await waitFor(() => {
      expect(screen.getByText('Parcela Premium')).toBeInTheDocument();
      expect(screen.queryByText('Parcela Estándar')).not.toBeInTheDocument();
    });
  });
});