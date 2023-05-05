const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://master.dev.marginedge.com/",
        supportFile: 'cypress/support/index.js',
        specPattern: 'cypress/integration/**/*.js',
        setupNodeEvents(on, config) {
            require('cypress-terminal-report/src/installLogsPrinter')(on);
            return require('./cypress/plugins/index.js')(on, config)
        }
    },
    "numTestsKeptInMemory": 1,
    "viewportWidth": 1920,
    "viewportHeight": 1080,
    "reporterOptions": {
      "reportDir": 'cypress/reports/testResults',
      "charts": true,
      "reportPageTitle": 'MargineEdge Automation Test Report',
      "embeddedScreenshots": true,
      "inlineAssets": true
    },
    "videoRecording": true,
    "video": true,
    "videoUploadOnPasses": false,
    "redirectionLimit": 80,
    "defaultCommandTimeout": 50000,
    "pageLoadTimeout": 60000,
    "requestTimeout": 10000
});