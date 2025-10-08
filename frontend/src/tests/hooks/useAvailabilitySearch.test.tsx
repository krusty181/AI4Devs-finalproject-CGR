import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAvailabilitySearch } from '../../hooks/useAvailabilitySearch';
import * as availabilityService from '../../services/availabilityService';

// Mock the availability service
vi.mock('../../services/availabilityService');

const mockAvailabilityService = vi.mocked(availabilityService);

// Test wrapper with QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useAvailabilitySearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useAvailabilitySearch(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(undefined);
    expect(result.current.hasSearched).toBe(false);
  });

  it('should search for availability successfully', async () => {
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
      }
    ];

    mockAvailabilityService.searchAvailability.mockResolvedValue({
      data: { availableAccommodations: mockResults }
    });

    const { result } = renderHook(() => useAvailabilitySearch(), {
      wrapper: createWrapper(),
    });

    const searchParams = {
      checkInDate: '2024-07-15',
      checkOutDate: '2024-07-20',
      guests: 4
    };

    result.current.search(searchParams);

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual({ availableAccommodations: mockResults });
    expect(result.current.hasSearched).toBe(true);
    expect(result.current.error).toBe(null);

    expect(mockAvailabilityService.searchAvailability).toHaveBeenCalledWith(searchParams);
  });

  it('should handle search errors', async () => {
    const errorMessage = 'API Error';
    mockAvailabilityService.searchAvailability.mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useAvailabilitySearch(), {
      wrapper: createWrapper(),
    });

    const searchParams = {
      checkInDate: '2024-07-15',
      checkOutDate: '2024-07-20',
      guests: 4
    };

    result.current.search(searchParams);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBe(undefined);
    expect(result.current.hasSearched).toBe(true);
  });

  it('should reset search state', async () => {
    const mockResults = [
      {
        id: 1,
        name: 'Parcela Estándar',
        availableUnits: 3
      }
    ];

    mockAvailabilityService.searchAvailability.mockResolvedValue({
      data: { availableAccommodations: mockResults }
    });

    const { result } = renderHook(() => useAvailabilitySearch(), {
      wrapper: createWrapper(),
    });

    // Perform a search first
    result.current.search({
      checkInDate: '2024-07-15',
      checkOutDate: '2024-07-20',
      guests: 4
    });

    await waitFor(() => {
      expect(result.current.hasSearched).toBe(true);
    });

    // Reset the search
    result.current.reset();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(undefined);
    expect(result.current.hasSearched).toBe(false);
  });

  it('should validate search parameters', async () => {
    const { result } = renderHook(() => useAvailabilitySearch(), {
      wrapper: createWrapper(),
    });

    // Test with invalid parameters (past date)
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    const invalidParams = {
      checkInDate: pastDate.toISOString().split('T')[0],
      checkOutDate: '2024-07-20',
      guests: 4
    };

    const isValid = result.current.validateParams(invalidParams);
    expect(isValid).toBe(false);

    // Test with valid parameters
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const laterDate = new Date();
    laterDate.setDate(laterDate.getDate() + 7);

    const validParams = {
      checkInDate: futureDate.toISOString().split('T')[0],
      checkOutDate: laterDate.toISOString().split('T')[0],
      guests: 4
    };

    const isValidFuture = result.current.validateParams(validParams);
    expect(isValidFuture).toBe(true);
  });

  it('should calculate nights correctly', () => {
    const { result } = renderHook(() => useAvailabilitySearch(), {
      wrapper: createWrapper(),
    });

    const checkInDate = '2024-07-15';
    const checkOutDate = '2024-07-20';

    const nights = result.current.calculateNights(checkInDate, checkOutDate);
    expect(nights).toBe(5);
  });

  it('should format price correctly', () => {
    const { result } = renderHook(() => useAvailabilitySearch(), {
      wrapper: createWrapper(),
    });

    expect(result.current.formatPrice(35.0)).toBe('35,00 €');
    expect(result.current.formatPrice(120.5)).toBe('120,50 €');
    expect(result.current.formatPrice(1000)).toBe('1.000,00 €');
  });

  it('should calculate total price for stay', () => {
    const { result } = renderHook(() => useAvailabilitySearch(), {
      wrapper: createWrapper(),
    });

    const pricePerNight = 35.0;
    const nights = 5;

    const totalPrice = result.current.calculateTotalPrice(pricePerNight, nights);
    expect(totalPrice).toBe(175.0);
  });

  it('should filter results by accommodation type', async () => {
    const mockResults = [
      {
        id: 1,
        name: 'Parcela Estándar',
        type: 'standard',
        availableUnits: 3
      },
      {
        id: 2,
        name: 'Parcela Premium',
        type: 'premium',
        availableUnits: 1
      }
    ];

    mockAvailabilityService.searchAvailability.mockResolvedValue({
      data: { availableAccommodations: mockResults }
    });

    const { result } = renderHook(() => useAvailabilitySearch(), {
      wrapper: createWrapper(),
    });

    // Perform search
    result.current.search({
      checkInDate: '2024-07-15',
      checkOutDate: '2024-07-20',
      guests: 4
    });

    await waitFor(() => {
      expect(result.current.hasSearched).toBe(true);
    });

    // Filter by premium type
    const filteredResults = result.current.filterByType('premium');
    expect(filteredResults).toHaveLength(1);
    expect(filteredResults[0].name).toBe('Parcela Premium');

    // Filter by standard type
    const standardResults = result.current.filterByType('standard');
    expect(standardResults).toHaveLength(1);
    expect(standardResults[0].name).toBe('Parcela Estándar');

    // No filter (all results)
    const allResults = result.current.filterByType('all');
    expect(allResults).toHaveLength(2);
  });
});