# Test Automation Best Practices in Action

[![Coverage Status](https://coveralls.io/repos/github/jpourdanis/playwright-test-coverage/badge.svg?branch=main)](https://coveralls.io/github/jpourdanis/playwright-test-coverage?branch=main)
[![CI](https://github.com/jpourdanis/playwright-test-coverage/actions/workflows/nodejs.yml/badge.svg)](https://github.com/jpourdanis/playwright-test-coverage/actions/workflows/nodejs.yml)

![Demo Animation](demo.webp)

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

## Visual Regression Testing

### Introduction

. While functional tests cover most interactions, we noticed that for some static pages—like FAQs or other content-heavy sections—visual testing adds real value. Even minor CSS changes or layout shifts can break the page in ways users notice, but automated functional tests often miss these subtle regressions.

Visual testing lets us capture screenshots of key pages and automatically compare them against a reference, so we can catch unintended visual changes before they reach users. Playwright makes it easy to implement visual testing in just a few lines of code.

### The challenge: different machines, different results

This approach works on a single machine but may fail on another due to subtle rendering differences. Fonts, spacing, and other visual details vary between operating systems: Windows renders fonts differently than macOS, which renders differently than Linux. For visual tests this can cause false positives when running on different developer machines or CI.

For example, a screenshot taken on a macOS laptop may fail if the same test runs on a Linux-based CI environment.

### The solution: Docker

Docker gives us a consistent environment so visual tests pass reliably everywhere. We build a Docker image on the official Playwright image (which includes browsers and needed system dependencies), install project dependencies, and copy the code into the image.

Example Dockerfile (simplified):

```dockerfile
# Use the official Playwright image which includes browsers and deps
FROM mcr.microsoft.com/playwright:v1

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Default command can run the Playwright test runner
CMD ["npm", "test"]
```

### Docker Compose

We use Docker Compose to make running visual tests easy and consistent. The Compose setup lets developers start everything with a single command and use the exact same setup in CI. Key points:

- Defines a `playwright` service responsible for running tests.
- Builds the Docker image using our `Dockerfile`.
- Sets `/app` as the default working directory.
- Mounts volumes for:
  - Project directory — so the container can access source code without copying it every time.
  - Screenshots — so new screenshots persist and visual diffs remain across container runs.
  - Playwright reports — so test reports are available locally and as CI artifacts.

This eliminates layout differences caused by varying screen sizes and makes visual diffs easy to review. After test execution, screenshots are saved in the `screenshots/` folder at the repository root (and snapshots/baselines are stored in `e2e/snapshots` where applicable).

### Why it matters

With this setup we catch real visual regressions while ignoring harmless OS-level differences. Docker guarantees a consistent testing environment and Playwright makes capturing and comparing screenshots straightforward. Our tests are therefore reliable, reproducible, and actionable—keeping the UI looking great everywhere.

### Running visual tests locally

You can run visual tests either directly on your machine (with Node and Playwright installed) or inside Docker for a consistent environment. The instructions below are OS-agnostic.

Run using Docker (recommended for consistent CI results):

- Ensure a Docker daemon is running (Docker Desktop, Colima, or another provider).

- Build and run tests with Docker Compose:
- Run the test suite: `npm run test:e2e:docker`
- Update snapshot baselines: `npm run test:e2e:docker:update`

Screenshots and snapshots

- Visual diffs and screenshots are saved to the `screenshots/` folder at the repository root.
- Baseline snapshots are stored in `e2e/snapshots` and are mounted by the Compose service so updates persist between runs.

Tips

- Use Docker for CI to avoid OS-specific font and rendering differences that cause false positives.
- Only update snapshot baselines after reviewing diffs to avoid accepting unintended visual changes.

## QA Best Practices & Test Patterns

To demonstrate robust testing methodologies, we have added several test suites in the `e2e/tests/` directory showcasing advanced Playwright patterns often utilized by Senior QA Engineers.

### 1. Page Object Model (POM)
**File:** `e2e/tests/pom-refactored.spec.ts` & `e2e/pages/HomePage.ts`
- **Concept:** The Page Object Model abstracts page interactions and locators into a separate class (`HomePage.ts`). 
- **Why it is important:** Tests become highly readable and declarative. If an element's selector changes (e.g., a button ID is updated), you only need to update the `HomePage.ts` class, not the fifty test files that click that button. It reduces code duplication and significantly improves test maintenance.
- **How to write:** Create a class for a specific page or component. Define elements using `page.locator()` in the constructor. Create async methods for user actions (e.g., `clickSubmit()`, `enterEmail()`). Import this class into your test file, instantiate it in a `beforeEach` hook, and call its methods.
- **How to verify:** Run the test using `npx playwright test e2e/tests/pom-refactored.spec.ts`. The test execution output should show the steps passing. You can also review the trace viewer (`npx playwright show-trace`) to see that the locators are resolving correctly via the POM methods.

### 2. Accessibility (a11y) Testing
**File:** `e2e/tests/a11y.spec.ts`
- **Concept:** Automated accessibility auditing using `@axe-core/playwright`.
- **Why it is important:** Ensures our application is usable by individuals with disabilities. This test scans the DOM for violations against Web Content Accessibility Guidelines (WCAG), such as insufficient color contrast, missing ARIA attributes, or incorrect heading hierarchies. Integrating this into CI prevents regressions that make the app exclusionary.
- **How to write:** Install `@axe-core/playwright`. In your test, navigate to the desired state, wait for elements to render, and instantiate `AxeBuilder` passing the `page` object. Call `.analyze()` and assert that the `violations` array is empty (`expect(results.violations).toEqual([])`).
- **How to verify:** Run the test using `npx playwright test e2e/tests/a11y.spec.ts`. If it fails, the CLI output will clearly list the WCAG violation (e.g., color contrast ratio of 2.5 instead of 3.0) and the specific HTML node that caused it. 

### 3. Network Mocking & Interception
**File:** `e2e/tests/network-mocking.spec.ts`
- **Concept:** Intercepting HTTP requests to modify traffic before it reaches the browser or backend.
- **Why it is important:** Allows us to test behaviors that are hard to replicate consistently in a live environment. We can abort requests to verify fallback mechanisms or mock API responses to test UI states (errors, empty responses) flawlessly without touching a database.
- **How to write:** Use `page.route('**/pattern', handler)`. To block an asset, use `route.abort()`. To mock an API, use `route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({...}) })`. Make sure to call `page.route` *before* the action that triggers the network request (like `page.goto`).
- **How to verify:** Run the test using `npx playwright test e2e/tests/network-mocking.spec.ts`. You can verify by asserting the UI reflects the mocked state (e.g., checking that alternate text is displayed for a blocked image, or a specific mocked title appears on the screen).

### 4. Responsive / Viewport Testing
**File:** `e2e/tests/responsive.spec.ts`
- **Concept:** Setting specific viewports (e.g., simulating a mobile device width/height) to verify layout and functionality on smaller screens.
- **Why it is important:** Mobile users make up a significant portion of web traffic. By explicitly defining viewports, we ensure core visual elements don't overlap, disappear, or break functionally when constrained to narrow screen real estate.
- **How to write:** Within your test suite (`test.describe`), configure the viewport size using `test.use({ viewport: { width: 375, height: 667 } })`. Then write assertions as usual, verifying that elements are visible or functional constrained layouts.
- **How to verify:** Run the test using `npx playwright test e2e/tests/responsive.spec.ts`. To truly verify the visual aspect, Playwright's UI mode (`npx playwright test --ui`) or HTML report will show screenshots or traces taken at the specified constrained viewport dimensions.

### 5. Data-Driven Testing
**File:** `e2e/tests/data-driven.spec.ts`
- **Concept:** Generating multiple tests programmatically from an array of data objects.
- **Why it is important:** Rather than copying and pasting the same test structure four times for four different colors, we define the logic once and iterate over a dataset (`testData`). This makes expanding test coverage trivial (just add a new object to the array) and keeps the test suite concise and DRY (Don't Repeat Yourself).
- **How to write:** Define a JavaScript/TypeScript array containing objects with your test inputs and expected outputs. Create a `for...of` loop over this array. Inside the loop, call `test(...)` to dynamically generate a test case for each dataset, using string interpolation for the test name.
- **How to verify:** Run the test using `npx playwright test e2e/tests/data-driven.spec.ts`. The output will list multiple distinct test names (one for each item in the data array), confirming that the single test block generated multiple independent test executions.
