# Use [Istanbul](https://istanbul.js.org) coverage collection with [Playwright Test](https://playwright.dev/docs/test-intro)

[![Coverage Status](https://coveralls.io/repos/github/jpourdanis/playwright-test-coverage/badge.svg)](https://coveralls.io/github/jpourdanis/playwright-test-coverage)
[![CI](https://github.com/jpourdanis/playwright-test-coverage/actions/workflows/nodejs.yml/badge.svg)](https://github.com/jpourdanis/playwright-test-coverage/actions/workflows/nodejs.yml)

This example demonstrates how to use [nyc](https://github.com/istanbuljs/nyc) to collect coverage data during runtime with your end-to-end tests which will be stored on the filesystem. When applying the shown parts, you are able to view the coverage report e.g. as HTML, or convert it to the `lcov` format for upload to [Coveralls](https://coveralls.io/) or other similar providers. In this example, we are using GitHub Actions to run the tests and upload them to Coveralls.

## Prerequisites

- The web application which you are using needs to have [nyc](https://github.com/istanbuljs/nyc) configured during the build process.
- It's recommended to only enable it during end-to-end testing, for example by checking a variable to determine if it should be enabled.
- You could also add it only when the dev server `NODE_ENV=development` is used.

## Usage

- Place [`baseFixtures.ts`](https://github.com/jpourdanis/playwright-test-coverage/blob/main/e2e/baseFixtures.ts) into your test directory. Instead of requiring `@playwright/test` to get the test object, use `./baseFixtures`.
- This will collect the corresponding coverage files into the `.nyc_output` directory which can be used from the [Istanbul CLI](https://github.com/istanbuljs/nyc).
- For an example test, see [App.test.ts](/e2e/App.test.ts)

## Coverage formats

Helpful commands are the following:

- `npx nyc report --reporter=html` -> Writes an HTML report to `coverage/index.html`.
- `npx nyc report --reporter=lcov` -> commonly used to upload to Coveralls or [Codecov](https://about.codecov.io/).
- `npx nyc report --reporter=text` -> CLI output how the current code coverage per file and statement will look like.


# Understanding baseFixtures.ts: Istanbul Code Coverage for Playwright Tests

## What Does This File Do?

The baseFixtures.ts file is a specialized tool that adds code coverage tracking to your Playwright tests. In simple terms:

## 🔍 Main Purpose

**It tracks which parts of your application code are actually used during testing.**

## 📊 How It Works in Simple Steps

1. **Setup**: Creates a folder called `.nyc_output` to store coverage data
2. **Preparation**: Clears any old coverage data before tests start
3. **During Tests**: Adds special listeners to your web application to track code execution
4. **After Each Page**: Collects data about which lines of code were executed
5. **After Tests**: Saves all this information as JSON files that tools like Istanbul can read

## 🛠️ Key Features

- **Automatic Cleanup**: Removes old coverage data before starting new tests
- **Event Watching**: Captures coverage when pages change or close
- **Data Collection**: Grabs the `__coverage__` object that Istanbul adds to your application
- **UUID Generation**: Creates unique filenames for each coverage report
- **Playwright Integration**: Extends Playwright's test system without changing how you write tests

## 💡 Why It's Useful

- **Quality Assurance**: Shows you which parts of your code aren't being tested
- **Test Improvement**: Helps identify areas that need more test coverage
- **Documentation**: Provides metrics you can share with your team
- **CI/CD Integration**: Works with tools like Coveralls for coverage reporting
