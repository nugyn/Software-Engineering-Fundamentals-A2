exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'http://localhost',
      browser: 'chrome'
    }
  },
  include: {
    I: './steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'WebdriverIO',
  plugins: {
    "autoDelay": {
      "enabled": true,
      "config": {
        "delayBefore": 0,
        "delayAfter": 50
      }
    },
    "allure": {}
 }
}