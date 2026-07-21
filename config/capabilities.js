/**
 * Browser/OS/device matrix for BrowserStack Automate.
 * Kept separate from the test logic so new combinations can be added
 * without touching any test code.
 */

const desktopCapabilities = [
  {
    browserName: 'Chrome',
    'bstack:options': {
      os: 'Windows',
      osVersion: '11',
      browserVersion: 'latest',
      sessionName: 'Todo App - Chrome/Windows',
      local: false,
    },
  },
  {
    browserName: 'Safari',
    'bstack:options': {
      os: 'OS X',
      osVersion: 'Sonoma',
      browserVersion: 'latest',
      sessionName: 'Todo App - Safari/macOS',
      local: false,
    },
  },
  {
    browserName: 'Firefox',
    'bstack:options': {
      os: 'Windows',
      osVersion: '11',
      browserVersion: 'latest',
      sessionName: 'Todo App - Firefox/Windows',
      local: false,
    },
  },
  {
    browserName: 'Edge',
    'bstack:options': {
      os: 'Windows',
      osVersion: '11',
      browserVersion: 'latest',
      sessionName: 'Todo App - Edge/Windows',
      local: false,
    },
  },
];

// Real mobile devices via BrowserStack's App Automate / Automate device cloud.
const mobileCapabilities = [
  {
    browserName: 'chrome',
    'bstack:options': {
      deviceName: 'Samsung Galaxy S23',
      osVersion: '13.0',
      realMobile: true,
      sessionName: 'Todo App - Chrome/Galaxy S23',
      local: false,
    },
  },
  {
    browserName: 'safari',
    'bstack:options': {
      deviceName: 'iPhone 15',
      osVersion: '17',
      realMobile: true,
      sessionName: 'Todo App - Safari/iPhone 15',
      local: false,
    },
  },
];

const capabilitiesList = [...desktopCapabilities, ...mobileCapabilities];

module.exports = { capabilitiesList, desktopCapabilities, mobileCapabilities };
