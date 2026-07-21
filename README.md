# BrowserStack Demo — Todo App

A small Todo app tested cross-browser/cross-device on BrowserStack Automate,
using Jest, the Page Object Model, and parallel session execution.

## Structure

```
app/                         Static Todo app (index.html)
server.js                    Simple static server for the app
pages/TodoPage.js            Page Object — all locators & interactions
config/capabilities.js       Browser/OS/device matrix (desktop + mobile)
config/browserstackSession.js  Driver creation + BrowserStack session status reporting
tests/todo.browserstack.test.js  Jest test suite
jest.config.js               Jest configuration
```

## Setup

```
npm install
export BROWSERSTACK_USERNAME=your_username
export BROWSERSTACK_ACCESS_KEY=your_access_key
```

Make sure the app is publicly reachable, or use BrowserStackLocal if testing
`http://localhost` (set `local: true` in `config/capabilities.js` and run the
BrowserStackLocal binary — see https://www.browserstack.com/local-testing).

## Run

```
npm run test:browserstack
```

This runs the test suite against every entry in `capabilitiesList`
(Chrome/Windows, Safari/macOS, Firefox/Windows, Edge/Windows, plus real
mobile devices: Samsung Galaxy S23 and iPhone 15) **in parallel** via
`Promise.all`, using Jest's `expect` assertions rather than manual
if/else + console.log.

Each session is explicitly marked `passed`/`failed` on the BrowserStack
dashboard using the `browserstack_executor` call, so results show up
directly in Automate — not just in the local console.

## What changed from v1

- Assertions (Jest `expect`) instead of if/else + console.log
- Sessions run in parallel (`Promise.all`) instead of sequentially
- Capabilities moved to `config/capabilities.js`
- Waits now check `elementIsVisible`, not just `elementLocated`
- BrowserStack session status is set explicitly (pass/fail) via `browserstack_executor`
- Locators/interactions extracted into `pages/TodoPage.js` (Page Object Model)
- Added Edge (desktop) and two real mobile devices (Galaxy S23, iPhone 15) to the matrix
