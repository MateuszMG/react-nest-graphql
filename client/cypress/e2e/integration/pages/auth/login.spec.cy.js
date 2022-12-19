/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable no-undef */
/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

const testId = (testId) => `[data-testid="${testId}"]`;

describe('login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3011/login');
  });

  // describe('texts', () => {
  //   it('title schould have text "Login"', () => {
  //     cy.get(testId('text_title')).should('have.text', 'Login');
  //   });

  //   it('reset button schould have text "Reset"', () => {
  //     cy.get(testId('button_reset')).should('have.text', 'Reset');
  //   });

  //   it('submit button schould have text "Login"', () => {
  //     cy.get(testId('button_submit')).should('have.text', 'Login');
  //   });

  //   it('email input schould have placeholder "your.email@gmail.com"', () => {
  //     cy.get(testId('input_email')).should(
  //       'have.attr',
  //       'placeholder',
  //       'your.email@gmail.com',
  //     );
  //   });

  //   it('password input schould have placeholder "StrongPassword1!"', () => {
  //     cy.get(testId('input_password')).should(
  //       'have.attr',
  //       'placeholder',
  //       'StrongPassword1!',
  //     );
  //   });

  //   it('email label schould have text "Email"', () => {
  //     cy.contains('label', 'Email');
  //   });

  //   it('password label schould have text "Password"', () => {
  //     cy.contains('label', 'Password');
  //   });
  // });

  describe('actions', () => {
    // describe('email input', () => {
    //   it('email input schould type the text correctly', () => {
    //     cy.get(testId('input_email'))
    //       .type('fake@email.com')
    //       .should('have.value', 'fake@email.com');
    //   });

    //   it('schould show error: "Invalid email"', () => {
    //     cy.get(testId('input_email')).type('fake');
    //     cy.contains('span', 'Invalid email');
    //   });

    //   it('schould show error: "Email cannot exceed 128 characters"', () => {
    //     cy.get(testId('input_email')).type(Array(129).fill(1).join(''));
    //     cy.contains('span', 'Email cannot exceed 128 characters');
    //   });

    // it('schould disappear error', () => {
    //   cy.get(testId('input_email')).type('f');
    //   cy.contains('span', 'Invalid email');
    //   cy.get(testId('input_email')).type('fake@email.com');
    //   cy.findByText('Invalid email').should('not.exist');
    // });
    // });

    describe('password input', () => {
      it('password input schould type the text correctly', () => {
        cy.get(testId('input_password'))
          .type('password')
          .should('have.value', 'password');
      });

      const trimError = 'Password cannot contain leading and trailing spaces';
      it(`schould show error: ${trimError}`, () => {
        cy.get(testId('input_password')).type(' ');
        cy.contains('span', trimError);
      });

      const minError = 'Password must be at least 6 characters long';
      it(`schould show error: ${minError}`, () => {
        cy.get(testId('input_password')).type(Array(5).fill(1).join(''));
        cy.contains('span', minError);
      });

      const maxError = 'Password cannot exceed 72 characters';
      it(`schould show error: ${maxError}`, () => {
        cy.get(testId('input_password')).type(Array(71).fill(1).join(''));
        cy.findByText(maxError).should('not.exist');
        cy.get(testId('input_password')).type(Array(72).fill(1).join(''));
        cy.contains('span', maxError);
      });

      const matchesError =
        'Password must contain, one uppercase, one number and one special case character: # $ ! . % & * ?';
      it(`schould show error: ${matchesError}`, () => {
        cy.get(testId('input_password')).type('pass');
        cy.findByText(matchesError).should('not.exist');
        cy.get(testId('input_password')).type('password');
        cy.contains('span', matchesError);
      });
    });
  });
});
