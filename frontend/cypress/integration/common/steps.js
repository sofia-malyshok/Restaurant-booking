Given('Log in to the application', () => {
    cy.visit(Cypress.env('FRONTEND_URL'), { timeout: 15000 });
    cy.login();
    cy.url().should('include', '/bookings');
  });
  Given('User opens aplication', () => {
    cy.visit('http://localhost:3000/');
});

When('Click Login', () => {
    cy.get('.navbar-nav a.nav-link').contains('Login').click();
});

And('Provide an email', () => {
    cy.get('[data-testid="user-email"]').type('soniamalish17@gmail.com');
});

And('Provide a password', () => {
    cy.get('[data-testid="user-password"]').type('123456!');
});

And('Click login button', () => {
    cy.get('[data-testid="submit-login"]').click();
});

Given('Click Logout', () => {
    cy.get('.navbar-nav a.nav-link').contains('Logout').click();
});

Then('See start screen', () => {
    cy.get('[data-testid="motto"]').should('contain', 'Enjoy time with your closest ones');
});
Given('User opens aplication', () => {
  cy.visit('http://localhost:3000/');
  });

  And('List of user`s reservation is visible and have length {string}', (lengthOfList) => {
    cy.get('.list-group-numbered').find('li').should('have.length', lengthOfList);
});

  Then('List of user`s reservation is visible and have length {string}', (lengthOfList) => {
    cy.get('.list-group-numbered').find('li').should('have.length', lengthOfList);
});   
