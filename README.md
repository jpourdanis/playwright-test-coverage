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

## Visual regression testing in Docker

This repository can run Playwright visual-regression tests both locally and inside Docker. Running tests in Docker ensures a stable, hermetic environment for screenshots and makes CI runs reproducible.

Why run visual tests in Docker?

- Reproducible browser binaries and system libraries
- Consistent rendering across developer machines and CI
- Easier CI integration: the same container that runs locally runs in CI

Quick start (local Docker via Colima / Docker Desktop):

1. Start a docker daemon (Colima or Docker Desktop). Example with Colima:

```bash
brew install colima docker-compose
colima start
```

2. (Optional) Create a local Docker config to avoid desktop credential helpers: `.docker-local/config.json`.
3. Run the app in a container and the Playwright runner via Compose (this repo provides `docker-compose.yml`):

```bash
# run tests in the Playwright service
DOCKER_CONFIG=$(pwd)/.docker-local DOCKER_HOST=unix:///Users/$USER/.colima/default/docker.sock \
	docker-compose run --rm playwright
```

4. Update snapshots (create a new baseline) from the container:

```bash
DOCKER_CONFIG=$(pwd)/.docker-local DOCKER_HOST=unix:///Users/$USER/.colima/default/docker.sock \
	docker-compose run --rm playwright --update-snapshots
```

Running tests locally without Docker:

```bash
npm test
# or run a single test file
npm run test -- e2e/App.test.ts
```

CI integration

- The GitHub Actions workflow (`.github/workflows/nodejs.yml`) runs `npm test` then runs the Playwright service in Docker Compose so the same Docker-based checks run in CI.

Notes

- Host snapshot files are stored in `e2e/snapshots` and are mounted into the container so updates persist to the host when running `--update-snapshots`.
- Local Docker config `.docker-local` is ignored by git (see `.gitignore`).

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
