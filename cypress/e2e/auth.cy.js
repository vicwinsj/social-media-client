describe('Login Functionality', () => {
    beforeEach(() => {
      cy.visit('/index.html');
    });
  
    it('logs in successfully with valid credentials', () => {
      cy.intercept('POST', '**/api/v1/social/auth/login', {
        statusCode: 200,
        body: { name: 'Victor' },
      }).as('loginRequest');
  
      cy.get('#loginModal input[name="email"]').type('vicwin52776@stud.noroff.no');
      cy.get('#loginModal input[name="password"]').type('passordet');
      cy.get('#loginModal form').submit();
  
      cy.wait('@loginRequest', { timeout: 20000 }).then(() => {
        expect(localStorage.getItem('token')).to.exist;
        cy.url().should('include', 'view=profile');
        cy.url().should('include', 'name=Victor');
      });
    });
  
    it('shows an error message with invalid credentials', () => {
      cy.intercept('POST', '**/api/v1/social/auth/login', {
        statusCode: 401,
        body: { error: 'Invalid credentials' },
      }).as('loginRequest');
  
      cy.get('#loginModal input[name="email"]').type('wrong@test.com');
      cy.get('#loginModal input[name="password"]').type('wrong123');
      cy.get('#loginModal form').submit();
  
      cy.wait('@loginRequest', { timeout: 20000 });
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains(
          'Either your username was not found or your password is incorrect'
        );
      });
    });
  
    it('logs out successfully', () => {
      cy.login();
      cy.get('#logout-btn').click();
      cy.url().should('not.include', 'view=profile');
    });
  });