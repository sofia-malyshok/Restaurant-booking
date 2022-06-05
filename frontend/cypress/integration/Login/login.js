// import cypress from 'cypress';
///<reference types="cypress" />
import {And, Given, Then, When} from 'cypress-cucumber-preprocessor/steps';

And('Click link to register', () => {
    cy.contains("Don't have an account? Register").click();
});

And('Fill all necessary fields in registration form', () => {
    cy.get('[data-testid="email-input"]').type('testowy@gmail.com');
    cy.get('[data-testid="password-input"]').type('123456!');
    cy.get('[data-testid="name-input"]').type('Anna');
    cy.get('[data-testid="surname-input"]').type('Nosek');
    cy.get('[data-testid="phone-input"]').type('+48467657646');
});
And('Click register button', () => {
    cy.get('[data-testid="register-submit"]').click();
});

And('Redirected to the log in page', () => {
    cy.get('[data-testid="login-container"]').should('contain', 'Please login');
});

Then('See page without reservations', ()=>{
    cy.get('#root').should('contain', 'No bookings yet ;(');
});
