const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '4a4xx3',
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
    baseUrl: "https://adminqa.onestoplms.com",
    testIsolation: false,
    viewportWidth: 1000,
    viewportHeight: 660,
  },
});
