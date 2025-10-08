describe('BOOTBOOKINGCAMP - Complete User Journey', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should complete full user journey from homepage to contact submission', () => {
    // 1. HOMEPAGE - Verify camping information loads
    cy.get('[data-testid="camping-name"]').should('contain', 'KCAMP - Camping Piloto');
    cy.get('[data-testid="camping-description"]').should('be.visible');
    cy.get('[data-testid="services-list"]').should('be.visible');
    cy.get('[data-testid="contact-info"]').should('be.visible');

    // Check navigation buttons are present
    cy.get('[data-testid="nav-availability"]').should('be.visible');
    cy.get('[data-testid="nav-contact"]').should('be.visible');

    // 2. NAVIGATE TO AVAILABILITY PAGE
    cy.get('[data-testid="nav-availability"]').click();
    cy.url().should('include', '/availability');

    // Verify availability page loads
    cy.get('h1').should('contain', 'Buscar Disponibilidad');
    cy.get('[data-testid="availability-form"]').should('be.visible');

    // 3. SEARCH FOR AVAILABILITY
    // Fill in search form
    const checkInDate = '2024-07-15';
    const checkOutDate = '2024-07-20';
    const guests = 4;

    cy.fillAvailabilityForm(checkInDate, checkOutDate, guests);

    // Submit search
    cy.get('[data-testid="search-button"]').click();

    // Verify search is performed
    cy.get('[data-testid="loading-indicator"]').should('be.visible');
    cy.waitForAPI('@searchAvailability');

    // 4. VERIFY SEARCH RESULTS
    cy.get('[data-testid="search-results"]').should('be.visible');
    cy.get('[data-testid="accommodation-card"]').should('have.length.at.least', 1);

    // Check first accommodation card details
    cy.get('[data-testid="accommodation-card"]').first().within(() => {
      cy.get('[data-testid="accommodation-name"]').should('contain', 'Parcela Estándar');
      cy.get('[data-testid="accommodation-price"]').should('contain', '35,00 €');
      cy.get('[data-testid="accommodation-available"]').should('contain', '3 disponibles');
      cy.get('[data-testid="accommodation-guests"]').should('contain', '6 huéspedes');
    });

    // 5. VIEW ACCOMMODATION DETAILS
    cy.get('[data-testid="accommodation-card"]').first().click();
    cy.url().should('include', '/accommodation/');

    // Verify accommodation detail page
    cy.get('[data-testid="detail-name"]').should('be.visible');
    cy.get('[data-testid="detail-description"]').should('be.visible');
    cy.get('[data-testid="detail-services"]').should('be.visible');
    cy.get('[data-testid="detail-images"]').should('be.visible');

    // 6. NAVIGATE TO CONTACT FROM DETAIL PAGE
    cy.get('[data-testid="contact-button"]').click();
    cy.url().should('include', '/contact');

    // 7. SUBMIT CONTACT FORM
    cy.get('h1').should('contain', 'Formulario de Contacto');
    cy.get('[data-testid="contact-form"]').should('be.visible');

    // Fill contact form with search context pre-filled
    cy.get('[data-testid="contact-check-in"]').should('have.value', checkInDate);
    cy.get('[data-testid="contact-check-out"]').should('have.value', checkOutDate);
    cy.get('[data-testid="contact-guests"]').should('have.value', guests.toString());

    cy.fillContactForm(
      'Juan Pérez',
      'juan.perez@email.com',
      'Me interesa hacer una reserva para las fechas seleccionadas. ¿Podrían contactarme?',
      '+34 666 123 456'
    );

    // Submit form
    cy.get('[data-testid="submit-contact"]').click();

    // Verify submission
    cy.get('[data-testid="loading-submit"]').should('be.visible');
    cy.waitForAPI('@submitContact');

    // 8. VERIFY SUCCESS MESSAGE
    cy.get('[data-testid="success-message"]').should('be.visible');
    cy.get('[data-testid="success-message"]').should('contain', 'Consulta enviada correctamente');
    cy.get('[data-testid="success-details"]').should('be.visible');

    // Verify form is reset after successful submission
    cy.get('[data-testid="contact-name"]').should('have.value', '');
    cy.get('[data-testid="contact-email"]').should('have.value', '');
    cy.get('[data-testid="contact-message"]').should('have.value', '');

    // 9. NAVIGATE BACK TO HOMEPAGE
    cy.get('[data-testid="nav-home"]').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('[data-testid="camping-name"]').should('be.visible');
  });

  it('should handle mobile responsive design', () => {
    // Test mobile viewport
    cy.setMobileViewport();

    // Verify mobile navigation
    cy.get('[data-testid="mobile-menu-toggle"]').should('be.visible');
    cy.get('[data-testid="mobile-menu-toggle"]').click();
    cy.get('[data-testid="mobile-nav-menu"]').should('be.visible');

    // Navigate on mobile
    cy.get('[data-testid="mobile-nav-availability"]').click();
    cy.url().should('include', '/availability');

    // Test form on mobile
    cy.get('[data-testid="availability-form"]').should('be.visible');
    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);
    cy.get('[data-testid="search-button"]').click();

    // Verify results display properly on mobile
    cy.waitForAPI('@searchAvailability');
    cy.get('[data-testid="search-results"]').should('be.visible');
    cy.get('[data-testid="accommodation-card"]').should('be.visible');
  });

  it('should handle error scenarios gracefully', () => {
    // Simulate API error for availability search
    cy.intercept('POST', '**/api/availability/search', {
      statusCode: 500,
      body: { error: 'Internal server error' }
    }).as('searchError');

    cy.visit('/availability');
    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);
    cy.get('[data-testid="search-button"]').click();

    cy.wait('@searchError');
    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.get('[data-testid="error-message"]').should('contain', 'Error al buscar disponibilidad');

    // Verify retry functionality
    cy.get('[data-testid="retry-button"]').should('be.visible');
    
    // Simulate successful retry
    cy.intercept('POST', '**/api/availability/search', { fixture: 'availability.json' }).as('searchRetry');
    cy.get('[data-testid="retry-button"]').click();
    cy.waitForAPI('@searchRetry');
    cy.get('[data-testid="search-results"]').should('be.visible');
  });

  it('should validate form inputs properly', () => {
    cy.visit('/availability');

    // Test empty form submission
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="error-check-in"]').should('contain', 'La fecha de entrada es obligatoria');
    cy.get('[data-testid="error-check-out"]').should('contain', 'La fecha de salida es obligatoria');

    // Test past date validation
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const pastDateStr = pastDate.toISOString().split('T')[0];

    cy.get('[data-testid="check-in-date"]').type(pastDateStr);
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="error-check-in"]').should('contain', 'La fecha debe ser futura');

    // Test check-out before check-in
    cy.get('[data-testid="check-in-date"]').clear().type('2024-07-20');
    cy.get('[data-testid="check-out-date"]').type('2024-07-15');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="error-check-out"]').should('contain', 'La fecha de salida debe ser posterior');

    // Test invalid guest number
    cy.get('[data-testid="guests-input"]').clear().type('0');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="error-guests"]').should('contain', 'Debe ser al menos 1 huésped');
  });

  it('should be accessible', () => {
    // Check accessibility on all main pages
    cy.visit('/');
    cy.checkA11y();

    cy.visit('/availability');
    cy.checkA11y();

    cy.visit('/contact');
    cy.checkA11y();

    // Test keyboard navigation
    cy.visit('/');
    cy.get('body').type('{tab}'); // Should focus on first focusable element
    cy.focused().should('be.visible');

    // Test skip links
    cy.get('[data-testid="skip-to-main"]').should('exist');
    cy.get('[data-testid="skip-to-main"]').click();
    cy.focused().should('have.attr', 'role', 'main');
  });

  it('should persist search context across pages', () => {
    cy.visit('/availability');

    // Perform search
    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);
    cy.get('[data-testid="search-button"]').click();
    cy.waitForAPI('@searchAvailability');

    // Go to contact page
    cy.get('[data-testid="nav-contact"]').click();

    // Verify search context is preserved
    cy.get('[data-testid="contact-check-in"]').should('have.value', '2024-07-15');
    cy.get('[data-testid="contact-check-out"]').should('have.value', '2024-07-20');
    cy.get('[data-testid="contact-guests"]').should('have.value', '4');

    // Go back to availability and verify results are still there
    cy.get('[data-testid="nav-availability"]').click();
    cy.get('[data-testid="search-results"]').should('be.visible');
    cy.get('[data-testid="accommodation-card"]').should('have.length.at.least', 1);
  });
});