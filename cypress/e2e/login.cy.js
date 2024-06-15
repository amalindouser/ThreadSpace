/* eslint-disable linebreak-style */
/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
// cypress/e2e/login.cy.js
/* eslint-disable linebreak-style */
/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

/// cypress/e2e/login.cy.js

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });
  it('should display alert when email is empty', () => {
    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });
  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Email"]').type('testuser');
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });
  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="Email"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('wrong_password');

    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User ID or password is wrong');
    });
  });
  it('should display homepage when email and password are correct', () => {
    cy.get('input[placeholder="Email"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('test123456');
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('button').contains('Logout').should('be.visible');
  });
});
