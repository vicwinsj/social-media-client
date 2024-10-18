Cypress.Commands.add(
  'login',
  (email = 'vicwin52776@stud.noroff.no', password = 'passordet') => {
    cy.get('#loginModal input[name="email"]').type(email);
    cy.get('#loginModal input[name="password"]').type(password);
    cy.get('#loginModal form').submit();
  },
);
