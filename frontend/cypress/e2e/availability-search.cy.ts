describe('Availability Search', () => {
  beforeEach(() => {
    cy.visit('/availability');
  });

  it('should render search form correctly', () => {
    cy.get('h1').should('contain', 'Buscar Disponibilidad');
    cy.get('[data-testid="availability-form"]').should('be.visible');
    cy.get('[data-testid="check-in-date"]').should('be.visible');
    cy.get('[data-testid="check-out-date"]').should('be.visible');
    cy.get('[data-testid="guests-input"]').should('be.visible');
    cy.get('[data-testid="search-button"]').should('be.visible');
  });

  it('should perform successful search and display results', () => {
    // Fill form with valid data
    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);

    // Submit search
    cy.get('[data-testid="search-button"]').click();

    // Verify loading state
    cy.get('[data-testid="loading-indicator"]').should('be.visible');

    // Wait for API response
    cy.waitForAPI('@searchAvailability');

    // Verify results are displayed
    cy.get('[data-testid="search-results"]').should('be.visible');
    cy.get('[data-testid="results-summary"]').should('contain', '3 alojamientos disponibles');

    // Check accommodation cards
    cy.get('[data-testid="accommodation-card"]').should('have.length', 3);

    // Verify first accommodation details
    cy.get('[data-testid="accommodation-card"]').first().within(() => {
      cy.get('[data-testid="accommodation-name"]').should('contain', 'Parcela Estándar');
      cy.get('[data-testid="accommodation-price"]').should('contain', '35,00 €/noche');
      cy.get('[data-testid="accommodation-available"]').should('contain', '3 disponibles');
      cy.get('[data-testid="accommodation-guests"]').should('contain', 'Hasta 6 huéspedes');
      cy.get('[data-testid="accommodation-size"]').should('contain', '80m²');
    });

    // Verify second accommodation (Premium)
    cy.get('[data-testid="accommodation-card"]').eq(1).within(() => {
      cy.get('[data-testid="accommodation-name"]').should('contain', 'Parcela Premium');
      cy.get('[data-testid="accommodation-price"]').should('contain', '55,00 €/noche');
      cy.get('[data-testid="accommodation-available"]').should('contain', '1 disponibles');
    });

    // Verify bungalow
    cy.get('[data-testid="accommodation-card"]').eq(2).within(() => {
      cy.get('[data-testid="accommodation-name"]').should('contain', 'Bungalow Familiar');
      cy.get('[data-testid="accommodation-price"]').should('contain', '85,00 €/noche');
      cy.get('[data-testid="accommodation-available"]').should('contain', '2 disponibles');
    });
  });

  it('should filter results by accommodation type', () => {
    // Perform initial search
    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);
    cy.get('[data-testid="search-button"]').click();
    cy.waitForAPI('@searchAvailability');

    // Verify all results are shown initially
    cy.get('[data-testid="accommodation-card"]').should('have.length', 3);

    // Filter by Standard type
    cy.get('[data-testid="type-filter"]').select('standard');
    cy.get('[data-testid="accommodation-card"]').should('have.length', 1);
    cy.get('[data-testid="accommodation-name"]').should('contain', 'Parcela Estándar');

    // Filter by Premium type
    cy.get('[data-testid="type-filter"]').select('premium');
    cy.get('[data-testid="accommodation-card"]').should('have.length', 1);
    cy.get('[data-testid="accommodation-name"]').should('contain', 'Parcela Premium');

    // Filter by Bungalow type
    cy.get('[data-testid="type-filter"]').select('bungalow');
    cy.get('[data-testid="accommodation-card"]').should('have.length', 1);
    cy.get('[data-testid="accommodation-name"]').should('contain', 'Bungalow Familiar');

    // Reset filter to show all
    cy.get('[data-testid="type-filter"]').select('all');
    cy.get('[data-testid="accommodation-card"]').should('have.length', 3);
  });

  it('should sort results by price', () => {
    // Perform search
    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);
    cy.get('[data-testid="search-button"]').click();
    cy.waitForAPI('@searchAvailability');

    // Sort by price ascending
    cy.get('[data-testid="sort-select"]').select('price-asc');
    cy.get('[data-testid="accommodation-card"]').first()
      .find('[data-testid="accommodation-name"]')
      .should('contain', 'Parcela Estándar'); // Cheapest first

    // Sort by price descending
    cy.get('[data-testid="sort-select"]').select('price-desc');
    cy.get('[data-testid="accommodation-card"]').first()
      .find('[data-testid="accommodation-name"]')
      .should('contain', 'Bungalow Familiar'); // Most expensive first
  });

  it('should navigate to accommodation detail page', () => {
    // Perform search
    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);
    cy.get('[data-testid="search-button"]').click();
    cy.waitForAPI('@searchAvailability');

    // Click on first accommodation
    cy.get('[data-testid="accommodation-card"]').first().click();

    // Verify navigation to detail page
    cy.url().should('include', '/accommodation/1');
    cy.get('[data-testid="detail-name"]').should('contain', 'Parcela Estándar');
  });

  it('should show no results message when search returns empty', () => {
    // Mock empty response
    cy.intercept('POST', '**/api/availability/search', {
      success: true,
      data: {
        availableAccommodations: [],
        totalResults: 0,
        availableUnits: 0
      }
    }).as('emptySearch');

    cy.fillAvailabilityForm('2024-12-25', '2024-12-30', 8);
    cy.get('[data-testid="search-button"]').click();
    cy.wait('@emptySearch');

    cy.get('[data-testid="no-results"]').should('be.visible');
    cy.get('[data-testid="no-results"]').should('contain', 'No se encontraron alojamientos disponibles');
    cy.get('[data-testid="no-results-suggestions"]').should('be.visible');
  });

  it('should validate form inputs', () => {
    // Test empty form submission
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="error-check-in"]').should('be.visible');
    cy.get('[data-testid="error-check-out"]').should('be.visible');

    // Test past dates
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    cy.get('[data-testid="check-in-date"]').type(yesterdayStr);
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="error-check-in"]').should('contain', 'La fecha debe ser futura');

    // Test check-out before check-in
    cy.get('[data-testid="check-in-date"]').clear().type('2024-07-20');
    cy.get('[data-testid="check-out-date"]').type('2024-07-15');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="error-check-out"]').should('contain', 'La fecha de salida debe ser posterior');

    // Test invalid guest number
    cy.get('[data-testid="check-in-date"]').clear().type('2024-07-15');
    cy.get('[data-testid="check-out-date"]').clear().type('2024-07-20');
    cy.get('[data-testid="guests-input"]').clear().type('0');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="error-guests"]').should('contain', 'Debe ser al menos 1 huésped');

    // Test maximum guests
    cy.get('[data-testid="guests-input"]').clear().type('20');
    cy.get('[data-testid="search-button"]').click();
    cy.get('[data-testid="error-guests"]').should('contain', 'Máximo 15 huéspedes');
  });

  it('should calculate total price for stay', () => {
    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);
    cy.get('[data-testid="search-button"]').click();
    cy.waitForAPI('@searchAvailability');

    // Check price calculation for 5 nights
    cy.get('[data-testid="accommodation-card"]').first().within(() => {
      cy.get('[data-testid="accommodation-price"]').should('contain', '35,00 €/noche');
      cy.get('[data-testid="total-price"]').should('contain', '175,00 €'); // 35 * 5 nights
      cy.get('[data-testid="nights-info"]').should('contain', '5 noches');
    });
  });

  it('should handle search errors gracefully', () => {
    // Mock API error
    cy.intercept('POST', '**/api/availability/search', {
      statusCode: 500,
      body: { error: 'Internal server error' }
    }).as('searchError');

    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);
    cy.get('[data-testid="search-button"]').click();

    cy.wait('@searchError');
    cy.get('[data-testid="error-message"]').should('be.visible');
    cy.get('[data-testid="error-message"]').should('contain', 'Error al buscar disponibilidad');
    cy.get('[data-testid="retry-button"]').should('be.visible');
  });

  it('should work properly on mobile devices', () => {
    cy.setMobileViewport();

    // Form should be usable on mobile
    cy.get('[data-testid="availability-form"]').should('be.visible');
    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);
    cy.get('[data-testid="search-button"]').click();
    cy.waitForAPI('@searchAvailability');

    // Results should display properly on mobile
    cy.get('[data-testid="search-results"]').should('be.visible');
    cy.get('[data-testid="accommodation-card"]').should('be.visible');

    // Cards should stack vertically on mobile
    cy.get('[data-testid="accommodation-card"]').first().should('have.css', 'width').and('match', /^(?!.*auto).*$/);
  });

  it('should preserve search context when navigating away and back', () => {
    // Perform search
    cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4);
    cy.get('[data-testid="search-button"]').click();
    cy.waitForAPI('@searchAvailability');

    // Navigate to contact page
    cy.get('[data-testid="nav-contact"]').click();
    cy.url().should('include', '/contact');

    // Navigate back to availability
    cy.get('[data-testid="nav-availability"]').click();
    cy.url().should('include', '/availability');

    // Verify search form still has the values
    cy.get('[data-testid="check-in-date"]').should('have.value', '2024-07-15');
    cy.get('[data-testid="check-out-date"]').should('have.value', '2024-07-20');
    cy.get('[data-testid="guests-input"]').should('have.value', '4');

    // Verify results are still displayed
    cy.get('[data-testid="search-results"]').should('be.visible');
    cy.get('[data-testid="accommodation-card"]').should('have.length', 3);
  });
});