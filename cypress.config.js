const { defineConfig } = require('cypress');

/* eslint-disable no-unused-vars */
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5500',
    watchForFileChanges: true,
    specPattern: 'cypress/e2e/**/*.cy.js',
    defaultCommandTimeout: 20000,
    retries: 2,
    setupNodeEvents(on, config) {},
  },
});
/* eslint-enable no-unused-vars */
