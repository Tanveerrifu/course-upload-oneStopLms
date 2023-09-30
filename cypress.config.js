const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
    testIsolation: true,
    viewportWidth: 1366, // Set your desired width
    viewportHeight: 768, // Set your desired height
  },
});
