describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should render contact form correctly', () => {
    cy.get('h1').should('contain', 'Formulario de Contacto');
    cy.get('[data-testid="contact-form"]').should('be.visible');
    
    // Check all form fields
    cy.get('[data-testid="contact-name"]').should('be.visible');
    cy.get('[data-testid="contact-email"]').should('be.visible');
    cy.get('[data-testid="contact-phone"]').should('be.visible');
    cy.get('[data-testid="contact-message"]').should('be.visible');
    cy.get('[data-testid="contact-check-in"]').should('be.visible');
    cy.get('[data-testid="contact-check-out"]').should('be.visible');
    cy.get('[data-testid="contact-guests"]').should('be.visible');
    
    cy.get('[data-testid="submit-contact"]').should('be.visible');
    cy.get('[data-testid="submit-contact"]').should('contain', 'Enviar Consulta');
  });

  it('should submit contact form successfully', () => {
    // Fill in the form
    cy.fillContactForm(
      'Juan Pérez',
      'juan.perez@email.com',
      'Me interesa hacer una reserva para el verano. ¿Podrían contactarme?',
      '+34 666 123 456'
    );

    // Add optional fields
    cy.get('[data-testid="contact-check-in"]').type('2024-07-15');
    cy.get('[data-testid="contact-check-out"]').type('2024-07-20');
    cy.get('[data-testid="contact-guests"]').type('4');

    // Submit form
    cy.get('[data-testid="submit-contact"]').click();

    // Verify loading state
    cy.get('[data-testid="loading-submit"]').should('be.visible');
    cy.get('[data-testid="submit-contact"]').should('be.disabled');

    // Wait for API response
    cy.waitForAPI('@submitContact');

    // Verify success message
    cy.get('[data-testid="success-message"]').should('be.visible');
    cy.get('[data-testid="success-message"]').should('contain', 'Consulta enviada correctamente');
    cy.get('[data-testid="success-details"]').should('contain', 'Te contactaremos pronto');

    // Verify form is reset
    cy.get('[data-testid="contact-name"]').should('have.value', '');
    cy.get('[data-testid="contact-email"]').should('have.value', '');
    cy.get('[data-testid="contact-message"]').should('have.value', '');
    cy.get('[data-testid="contact-phone"]').should('have.value', '');
  });

  it('should validate required fields', () => {
    // Try to submit empty form
    cy.get('[data-testid="submit-contact"]').click();

    // Check validation errors
    cy.get('[data-testid="error-name"]').should('contain', 'El nombre es obligatorio');
    cy.get('[data-testid="error-email"]').should('contain', 'El email es obligatorio');  
    cy.get('[data-testid="error-message"]').should('contain', 'El mensaje es obligatorio');

    // Form should not be submitted
    cy.get('[data-testid="success-message"]').should('not.exist');
  });

  it('should validate email format', () => {
    cy.get('[data-testid="contact-email"]').type('invalid-email');
    cy.get('[data-testid="contact-name"]').click(); // Trigger blur

    cy.get('[data-testid="error-email"]').should('contain', 'El formato del email no es válido');

    // Test valid email
    cy.get('[data-testid="contact-email"]').clear().type('valid@email.com');
    cy.get('[data-testid="contact-name"]').click();

    cy.get('[data-testid="error-email"]').should('not.exist');
  });

  it('should validate phone format', () => {
    cy.get('[data-testid="contact-phone"]').type('123');
    cy.get('[data-testid="contact-name"]').click(); // Trigger blur

    cy.get('[data-testid="error-phone"]').should('contain', 'El formato del teléfono no es válido');

    // Test valid phone
    cy.get('[data-testid="contact-phone"]').clear().type('+34 666 123 456');
    cy.get('[data-testid="contact-name"]').click();

    cy.get('[data-testid="error-phone"]').should('not.exist');
  });

  it('should validate date range when provided', () => {
    // Fill required fields first
    cy.fillContactForm('Juan Pérez', 'juan@email.com', 'Test message');

    // Set invalid date range (check-out before check-in)
    cy.get('[data-testid="contact-check-in"]').type('2024-07-20');
    cy.get('[data-testid="contact-check-out"]').type('2024-07-15');

    cy.get('[data-testid="submit-contact"]').click();

    cy.get('[data-testid="error-dates"]').should('contain', 'La fecha de salida debe ser posterior a la de entrada');

    // Fix the dates
    cy.get('[data-testid="contact-check-out"]').clear().type('2024-07-25');

    cy.get('[data-testid="submit-contact"]').click();
    cy.waitForAPI('@submitContact');

    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('should handle form submission errors', () => {
    // Mock API error
    cy.intercept('POST', '**/api/contact', {
      statusCode: 500,
      body: { error: 'Internal server error' }
    }).as('submitError');

    // Fill and submit form
    cy.fillContactForm('Juan Pérez', 'juan@email.com', 'Test message');
    cy.get('[data-testid="submit-contact"]').click();

    cy.wait('@submitError');

    // Verify error message
    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.get('[data-testid="error-message"]').should('contain', 'Error al enviar la consulta');
    
    // Verify retry button
    cy.get('[data-testid="retry-button"]').should('be.visible');

    // Test retry functionality
    cy.intercept('POST', '**/api/contact', { fixture: 'contact-response.json' }).as('submitRetry');
    cy.get('[data-testid="retry-button"]').click();
    cy.waitForAPI('@submitRetry');

    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('should pre-fill form with search context from availability page', () => {
    // Simulate coming from availability search with context
    const searchContext = {
      checkInDate: '2024-07-15',
      checkOutDate: '2024-07-20',
      guests: 4,
      selectedAccommodation: 'Parcela Estándar'
    };

    // Visit contact page with search context (simulated via localStorage or URL params)
    cy.window().then((win) => {
      win.localStorage.setItem('searchContext', JSON.stringify(searchContext));
    });

    cy.visit('/contact');

    // Verify pre-filled fields
    cy.get('[data-testid="contact-check-in"]').should('have.value', '2024-07-15');
    cy.get('[data-testid="contact-check-out"]').should('have.value', '2024-07-20');
    cy.get('[data-testid="contact-guests"]').should('have.value', '4');
    
    // Verify pre-filled message mentions the accommodation
    cy.get('[data-testid="contact-message"]').should('contain', 'Parcela Estándar');
  });

  it('should work properly on mobile devices', () => {
    cy.setMobileViewport();

    // Form should be fully visible and usable on mobile
    cy.get('[data-testid="contact-form"]').should('be.visible');
    
    // Test form interaction on mobile
    cy.fillContactForm('Juan Pérez', 'juan@email.com', 'Mobile test message');
    
    // Submit should work on mobile
    cy.get('[data-testid="submit-contact"]').should('be.visible').click();
    cy.waitForAPI('@submitContact');

    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('should maintain accessibility standards', () => {
    // Check form labels
    cy.get('[data-testid="contact-name"]').should('have.attr', 'id');
    cy.get('label[for="contact-name"]').should('exist');

    // Check form validation aria attributes
    cy.get('[data-testid="submit-contact"]').click();
    
    cy.get('[data-testid="contact-name"]').should('have.attr', 'aria-invalid', 'true');
    cy.get('[data-testid="contact-email"]').should('have.attr', 'aria-invalid', 'true');

    // Check error messages are properly linked
    cy.get('[data-testid="error-name"]').should('have.attr', 'role', 'alert');
  });

  it('should show character count for message field', () => {
    const longMessage = 'a'.repeat(100);
    
    cy.get('[data-testid="contact-message"]').type(longMessage);
    cy.get('[data-testid="message-counter"]').should('contain', '100/500');

    // Test approaching limit
    const nearLimitMessage = 'a'.repeat(490);
    cy.get('[data-testid="contact-message"]').clear().type(nearLimitMessage);
    cy.get('[data-testid="message-counter"]').should('contain', '490/500');
    cy.get('[data-testid="message-counter"]').should('have.class', 'warning');

    // Test exceeding limit
    const overLimitMessage = 'a'.repeat(510);
    cy.get('[data-testid="contact-message"]').clear().type(overLimitMessage);
    cy.get('[data-testid="message-counter"]').should('contain', '500/500'); // Should be truncated
    cy.get('[data-testid="contact-message"]').should('have.value', 'a'.repeat(500));
  });

  it('should handle accommodation type selection', () => {
    cy.get('[data-testid="accommodation-type"]').should('be.visible');
    cy.get('[data-testid="accommodation-type"]').select('parcela_premium');
    
    // Fill rest of form and submit
    cy.fillContactForm('Juan Pérez', 'juan@email.com', 'Interesado en parcela premium');
    cy.get('[data-testid="submit-contact"]').click();
    cy.waitForAPI('@submitContact');

    // Verify success message appears
    cy.get('[data-testid="success-message"]').should('be.visible');
  });

  it('should clear form when reset button is clicked', () => {
    // Fill form
    cy.fillContactForm('Juan Pérez', 'juan@email.com', 'Test message', '+34 666 123 456');
    cy.get('[data-testid="contact-check-in"]').type('2024-07-15');
    cy.get('[data-testid="contact-guests"]').type('4');

    // Click reset button
    cy.get('[data-testid="reset-form"]').click();

    // Verify all fields are cleared
    cy.get('[data-testid="contact-name"]').should('have.value', '');
    cy.get('[data-testid="contact-email"]').should('have.value', '');
    cy.get('[data-testid="contact-message"]').should('have.value', '');
    cy.get('[data-testid="contact-phone"]').should('have.value', '');
    cy.get('[data-testid="contact-check-in"]').should('have.value', '');
    cy.get('[data-testid="contact-guests"]').should('have.value', '');
  });
});