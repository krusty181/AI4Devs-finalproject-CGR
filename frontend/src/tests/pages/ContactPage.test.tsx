import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import ContactPage from '../../pages/ContactPage';
import * as contactService from '../../services/contactService';

// Mock the contact service
vi.mock('../../services/contactService');

const mockContactService = vi.mocked(contactService);

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

describe('ContactPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render contact form correctly', () => {
    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );

    expect(screen.getByText('Formulario de Contacto')).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar consulta/i })).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /enviar consulta/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/el email es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/el mensaje es obligatorio/i)).toBeInTheDocument();
    });
  });

  it('should validate email format', async () => {
    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/el formato del email no es válido/i)).toBeInTheDocument();
    });
  });

  it('should validate phone format', async () => {
    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );

    const phoneInput = screen.getByLabelText(/teléfono/i);
    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.blur(phoneInput);

    await waitFor(() => {
      expect(screen.getByText(/el formato del teléfono no es válido/i)).toBeInTheDocument();
    });
  });

  it('should submit form successfully', async () => {
    const mockResponse = {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '+34 666 123 456',
      message: 'Me interesa hacer una reserva',
      created_at: '2024-01-01T00:00:00Z'
    };

    mockContactService.submitContact.mockResolvedValue({
      data: mockResponse
    });

    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Juan Pérez' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'juan@email.com' }
    });
    fireEvent.change(screen.getByLabelText(/teléfono/i), {
      target: { value: '+34 666 123 456' }
    });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: 'Me interesa hacer una reserva' }
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /enviar consulta/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/consulta enviada correctamente/i)).toBeInTheDocument();
      expect(screen.getByText(/te contactaremos pronto/i)).toBeInTheDocument();
    });

    expect(mockContactService.submitContact).toHaveBeenCalledWith({
      name: 'Juan Pérez',
      email: 'juan@email.com',
      phone: '+34 666 123 456',
      message: 'Me interesa hacer una reserva',
      check_in_date: undefined,
      check_out_date: undefined,
      guests: undefined,
      accommodation_type: undefined
    });
  });

  it('should submit form with dates and guests', async () => {
    const mockResponse = {
      id: 1,
      name: 'María García',
      email: 'maria@email.com',
      phone: '+34 677 987 654',
      message: 'Consulta con fechas específicas',
      created_at: '2024-01-01T00:00:00Z'
    };

    mockContactService.submitContact.mockResolvedValue({
      data: mockResponse
    });

    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );

    // Fill in the form with all fields
    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'María García' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'maria@email.com' }
    });
    fireEvent.change(screen.getByLabelText(/teléfono/i), {
      target: { value: '+34 677 987 654' }
    });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: 'Consulta con fechas específicas' }
    });
    fireEvent.change(screen.getByLabelText(/fecha de entrada/i), {
      target: { value: '2024-07-15' }
    });
    fireEvent.change(screen.getByLabelText(/fecha de salida/i), {
      target: { value: '2024-07-20' }
    });
    fireEvent.change(screen.getByLabelText(/número de huéspedes/i), {
      target: { value: '4' }
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /enviar consulta/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/consulta enviada correctamente/i)).toBeInTheDocument();
    });

    expect(mockContactService.submitContact).toHaveBeenCalledWith({
      name: 'María García',
      email: 'maria@email.com',
      phone: '+34 677 987 654',
      message: 'Consulta con fechas específicas',
      check_in_date: '2024-07-15',
      check_out_date: '2024-07-20',
      guests: 4,
      accommodation_type: undefined
    });
  });

  it('should handle form submission errors', async () => {
    mockContactService.submitContact.mockRejectedValue(
      new Error('API Error')
    );

    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Juan Pérez' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'juan@email.com' }
    });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: 'Test message' }
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /enviar consulta/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/error al enviar la consulta/i)).toBeInTheDocument();
      expect(screen.getByText(/por favor, inténtalo de nuevo/i)).toBeInTheDocument();
    });
  });

  it('should display loading state during submission', async () => {
    mockContactService.submitContact.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ data: {} }), 100))
    );

    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Juan Pérez' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'juan@email.com' }
    });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: 'Test message' }
    });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /enviar consulta/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/enviando/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.queryByText(/enviando/i)).not.toBeInTheDocument();
    });
  });

  it('should reset form after successful submission', async () => {
    const mockResponse = {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@email.com',
      message: 'Test message',
      created_at: '2024-01-01T00:00:00Z'
    };

    mockContactService.submitContact.mockResolvedValue({
      data: mockResponse
    });

    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );

    const nameInput = screen.getByLabelText(/nombre completo/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/mensaje/i) as HTMLTextAreaElement;

    // Fill in the form
    fireEvent.change(nameInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@email.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /enviar consulta/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/consulta enviada correctamente/i)).toBeInTheDocument();
    });

    // Form should be reset
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(messageInput.value).toBe('');
  });

  it('should validate date range when both dates are provided', async () => {
    render(
      <TestWrapper>
        <ContactPage />
      </TestWrapper>
    );

    // Set check-out before check-in
    fireEvent.change(screen.getByLabelText(/fecha de entrada/i), {
      target: { value: '2024-07-20' }
    });
    fireEvent.change(screen.getByLabelText(/fecha de salida/i), {
      target: { value: '2024-07-15' }
    });

    // Trigger validation by submitting
    fireEvent.change(screen.getByLabelText(/nombre completo/i), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@email.com' }
    });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: 'Test message' }
    });

    const submitButton = screen.getByRole('button', { name: /enviar consulta/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/la fecha de salida debe ser posterior a la de entrada/i)).toBeInTheDocument();
    });
  });
});