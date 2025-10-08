// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to fill availability search form
       * @example cy.fillAvailabilityForm('2024-07-15', '2024-07-20', 4)
       */
      fillAvailabilityForm(checkIn: string, checkOut: string, guests: number): Chainable<void>
      
      /**
       * Custom command to fill contact form
       * @example cy.fillContactForm('Juan Pérez', 'juan@email.com', 'Test message')
       */
      fillContactForm(name: string, email: string, message: string, phone?: string): Chainable<void>
      
      /**
       * Custom command to wait for API response
       * @example cy.waitForAPI('@availability')
       */
      waitForAPI(alias: string): Chainable<void>
      
      /**
       * Custom command to check accessibility
       * @example cy.checkA11y()
       */
      checkA11y(): Chainable<void>
    }
  }
}

Cypress.Commands.add('fillAvailabilityForm', (checkIn: string, checkOut: string, guests: number) => {
  cy.get('[data-testid="check-in-date"]').type(checkIn);
  cy.get('[data-testid="check-out-date"]').type(checkOut);
  cy.get('[data-testid="guests-input"]').clear().type(guests.toString());
});

Cypress.Commands.add('fillContactForm', (name: string, email: string, message: string, phone?: string) => {
  cy.get('[data-testid="contact-name"]').type(name);
  cy.get('[data-testid="contact-email"]').type(email);
  cy.get('[data-testid="contact-message"]').type(message);
  
  if (phone) {
    cy.get('[data-testid="contact-phone"]').type(phone);
  }
});

Cypress.Commands.add('waitForAPI', (alias: string) => {
  cy.wait(alias).then((interception) => {
    expect(interception.response?.statusCode).to.be.oneOf([200, 201]);
  });
});

Cypress.Commands.add('checkA11y', () => {
  // Basic accessibility checks
  cy.get('h1').should('exist'); // Page should have a main heading
  cy.get('[role="main"]').should('exist'); // Page should have a main landmark
  
  // Check for form labels
  cy.get('input, textarea, select').each(($el) => {
    const id = $el.attr('id');
    if (id) {
      cy.get(`label[for="${id}"]`).should('exist');
    }
  });
  
  // Check for alt text on images
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt');
  });
});

export {};