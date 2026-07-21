const { capabilitiesList } = require('../config/capabilities');
const { createDriver, setSessionStatus } = require('../config/browserstackSession');
const { TodoPage } = require('../pages/TodoPage');

const APP_URL = process.env.APP_URL || 'http://localhost:8080';
const TEST_TIMEOUT = 90000;

/**
 * Runs one BrowserStack session per capability. Sessions are kicked
 * off together via Promise.all so all browsers/devices execute in
 * parallel in the BrowserStack cloud, instead of one after another.
 * Each session self-reports pass/fail to the BrowserStack dashboard
 * via the browserstack_executor call, and the test uses real
 * assertions (expect) rather than if/else + console.log.
 */
async function runOnCapability(capabilities) {
  const label = capabilities['bstack:options'].sessionName;
  const driver = await createDriver(capabilities);
  const todoPage = new TodoPage(driver);

  try {
    await todoPage.open(APP_URL);
    await todoPage.addTodo('Buy groceries');
    const text = await todoPage.getLatestTodoText();

    if (!text.includes('Buy groceries')) {
      throw new Error(`Unexpected todo text: "${text}"`);
    }

    await setSessionStatus(driver, 'passed', 'Test Passed');
    return { label, passed: true };
  } catch (err) {
    await setSessionStatus(driver, 'failed', err.message).catch(() => {});
    return { label, passed: false, error: err.message };
  } finally {
    await driver.quit();
  }
}

test(
  'adds a todo item across all browsers/devices in parallel',
  async () => {
    const results = await Promise.all(capabilitiesList.map(runOnCapability));

    const failures = results.filter((r) => !r.passed);

    // Log a per-browser summary so a failing combo is easy to spot,
    // even though the assertion below is what fails the Jest run.
    results.forEach((r) => {
      console.log(r.passed ? `✅ PASSED — ${r.label}` : `❌ FAILED — ${r.label}: ${r.error}`);
    });

    expect(failures).toEqual([]);
  },
  TEST_TIMEOUT
);
