// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Setup interceptors for API calls
beforeEach(() => {
  // Intercept camping info API
  cy.intercept('GET', '**/api/camping/**', { fixture: 'camping.json' }).as('getCamping');
  
  // Intercept availability search API
  cy.intercept('POST', '**/api/availability/search', { fixture: 'availability.json' }).as('searchAvailability');
  
  // Intercept contact form submission
  cy.intercept('POST', '**/api/contact', { fixture: 'contact-response.json' }).as('submitContact');
});

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  // Return false to skip this error
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  
  if (err.message.includes('Script error')) {
    return false;
  }
  
  return true;
});

// Custom viewport sizes for testing
Cypress.Commands.add('setMobileViewport', () => {
  cy.viewport(375, 667); // iPhone 6/7/8
});

Cypress.Commands.add('setTabletViewport', () => {
  cy.viewport(768, 1024); // iPad
});

Cypress.Commands.add('setDesktopViewport', () => {
  cy.viewport(1280, 720); // Desktop
});

declare global {
  namespace Cypress {
    interface Chainable {
      setMobileViewport(): Chainable<void>;
      setTabletViewport(): Chainable<void>;
      setDesktopViewport(): Chainable<void>;
    }
  }
}