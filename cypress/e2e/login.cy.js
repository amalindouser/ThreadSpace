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

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // Memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Log In$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // Klik tombol login tanpa mengisi email
    cy.get('button').contains(/^Log In$/).click();
    // Memverifikasi alert atau pesan error
    cy.get('input[placeholder="Email"]').should('have.attr', 'aria-invalid', 'true');
  });

  it('should display alert when password is empty', () => {
    // Isi email tetapi kosongkan password, kemudian klik login
    cy.get('input[placeholder="Email"]').type('email@gmail.com');
    cy.get('button').contains(/^Log In$/).click();

    // Memverifikasi alert atau pesan error
    cy.get('input[placeholder="Password"]').should('have.attr', 'aria-invalid', 'true');
  });

  it('should display alert when email and password are wrong', () => {
    // Isi email dan password yang salah kemudian klik login
    cy.get('input[placeholder="Email"]').type('wrongemail@gmail.com');
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    cy.get('button').contains(/^Log In$/).click();

    // Memverifikasi alert atau pesan error
    cy.get('.error-message').should('contain', 'Invalid email or password');
  });

  it('should display homepage when email and password are correct', () => {
    // Isi email dan password yang benar kemudian klik login
    cy.get('input[placeholder="Email"]').type('correctemail@gmail.com');
    cy.get('input[placeholder="Password"]').type('correctpassword');
    cy.get('button').contains(/^Log In$/).click();

    // Memverifikasi apakah halaman beranda ditampilkan
    cy.url().should('eq', 'http://localhost:5173/home');
  });
});
