const { By, until } = require('selenium-webdriver');

const DEFAULT_TIMEOUT = 10000;

/**
 * Page Object for the Todo demo app. All locators and interactions
 * live here so tests read as behavior, not element plumbing.
 */
class TodoPage {
  constructor(driver) {
    this.driver = driver;
    this.locators = {
      input: By.id('todo-input'),
      addBtn: By.id('add-btn'),
      todoItems: By.css('#todo-list li'),
      latestTodoText: By.css('#todo-list li:last-child'),
    };
  }

  async open(url) {
    await this.driver.get(url);
    // Wait for the input to be visible (not just present in the DOM)
    // before interacting with the page at all.
    await this.driver.wait(
      until.elementIsVisible(await this.driver.wait(until.elementLocated(this.locators.input), DEFAULT_TIMEOUT)),
      DEFAULT_TIMEOUT
    );
  }

  async addTodo(text) {
    const input = await this.driver.wait(until.elementLocated(this.locators.input), DEFAULT_TIMEOUT);
    await this.driver.wait(until.elementIsVisible(input), DEFAULT_TIMEOUT);
    await input.sendKeys(text);

    const addBtn = await this.driver.wait(until.elementLocated(this.locators.addBtn), DEFAULT_TIMEOUT);
    await this.driver.wait(until.elementIsVisible(addBtn), DEFAULT_TIMEOUT);
    await addBtn.click();
  }

  async getLatestTodoText() {
    const item = await this.driver.wait(until.elementLocated(this.locators.latestTodoText), DEFAULT_TIMEOUT);
    await this.driver.wait(until.elementIsVisible(item), DEFAULT_TIMEOUT);
    return item.getText();
  }
}

module.exports = { TodoPage };
