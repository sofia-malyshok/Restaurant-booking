import {Given} from 'cypress-cucumber-preprocessor/steps';

Given('Open aplication', () => {
    cy.visit('http://localhost:3002/booking');
});