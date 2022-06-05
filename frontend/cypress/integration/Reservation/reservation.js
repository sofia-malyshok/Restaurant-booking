///<reference types="cypress" />
import {And, Given, Then, When} from 'cypress-cucumber-preprocessor/steps';

When('Click book table button', () => {
    cy.get('.navbar-nav a.nav-link').contains('Book a table').click();
});

And('Select the number of guests equals {string}', (ammountOfGuests) => {
    cy.get('[data-testid="guests-select"]').select(ammountOfGuests);
});

And('Select booking date', () => {
    cy.get('[data-testid="date-button"]').click();
    cy.get('[data-testid="date-picker"]').contains('30').click({force: true});
});

And('Select booking time', () => {
    cy.get('[data-testid="start-time"] div div').eq(0).click();
    cy.get('[data-testid="start-time"] div .stp--select__dropdown').children().eq(12).click();
    cy.get('[data-testid="end-time"] div div').eq(0).click();
    cy.get('[data-testid="end-time"] div .stp--select__dropdown').children().eq(13).click();
});

And('Move to the next step', () => {
    cy.get('[data-testid="continue-button"]').click();
});

And('Select a table {string}', (numberOfTable) => {
    cy.get('svg g').children().eq(numberOfTable).click();
});

Then('See confirmation of reservation', () => {
    cy.get('[data-testid="thanks-button"]').should('contain', 'Thank you for your booking');

});

And('Log in', ()=>{
    cy.login();
});

When('Click my bookings button', () => {
    cy.get('.navbar-nav a.nav-link').contains('My Bookings').click();
});

Then('User can not move forward and see message about no availible tables', () => {
    cy.get('[data-testid="continue-button"]').should('be.disabled');
    cy.get('#root').contains('Please choose another one').should('be.visible');
});

And('Click delete reservation for {string} reservation on reservations list', (numberOfReserbation) => {
    cy.get('.list-group-numbered').find('li').eq(numberOfReserbation - 1).contains('Cancel').click();
});

And('Confirm deletion', () => {
    cy.get('button').contains('Delete').click();
});