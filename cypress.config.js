const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: false,
    // Não salva vídeos na pasta
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
