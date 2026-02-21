# Use [Istanbul](https://istanbul.js.org) coverage collection with [Playwright Test](https://playwright.dev/docs/test-intro)

[![Coverage Status](https://coveralls.io/repos/github/jpourdanis/playwright-test-coverage/badge.svg?branch=main)](https://coveralls.io/github/jpourdanis/playwright-test-coverage?branch=main)
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
