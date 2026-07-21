const { Builder } = require('selenium-webdriver');

const USERNAME = process.env.BROWSERSTACK_USERNAME;
const ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;

if (!USERNAME || !ACCESS_KEY) {
  throw new Error('Missing BROWSERSTACK_USERNAME or BROWSERSTACK_ACCESS_KEY env vars.');
}

const BROWSERSTACK_HUB = `https://${USERNAME}:${ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`;

async function createDriver(capabilities) {
  return new Builder().usingServer(BROWSERSTACK_HUB).withCapabilities(capabilities).build();
}

/**
 * Marks the BrowserStack session as passed/failed so the dashboard
 * reflects the real test outcome instead of showing every session
 * as "unmarked".
 */
async function setSessionStatus(driver, status, reason) {
  await driver.executeScript(
    `browserstack_executor: ${JSON.stringify({
      action: 'setSessionStatus',
      arguments: { status, reason },
    })}`
  );
}

module.exports = { createDriver, setSessionStatus, BROWSERSTACK_HUB };
