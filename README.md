# Cross-Browser and Responsive Web Testing Portfolio

An end-to-end SQA portfolio project for the Sauce Labs Swag Labs commerce application. It combines exploratory testing artifacts with Playwright automation across Chrome/Chromium, Firefox, Microsoft Edge, tablet, and mobile layouts.

## Quality objectives

- Protect the login-to-checkout critical path.
- Detect browser-specific and viewport-specific regressions.
- Validate form errors, navigation, cart state, and price sorting.
- Detect serious WCAG A/AA accessibility issues.
- Capture screenshots, video, and Playwright traces for reproducible failures.
- Exercise slow resources, internal links, and uncaught browser errors.
- Turn coverage and unresolved risk into a defensible release recommendation.

## Repository structure

```text
application-under-test/  Cloned Sauce Labs application
docs/                    Strategy, matrix, defects, and release report
fixtures/                Test data and Playwright fixtures
pages/                   Page objects
tests/                    Functional, responsive, accessibility, resilience, visual
.github/workflows/        Cross-browser CI
```

## Prerequisites

- Node.js 24.9 or newer is required by the cloned application.
- Chrome and Edge should be installed for branded-browser execution.

## Setup

```powershell
npm.cmd ci --include=dev
npm.cmd --prefix application-under-test ci
npx.cmd playwright install chromium firefox webkit
```

Run all configured projects:

```powershell
npm.cmd test
```

Useful focused commands:

```powershell
npm.cmd run test:smoke
npm.cmd run test:responsive
npm.cmd run test:a11y
npm.cmd run test:edge
npm.cmd run test:known-defects
npm.cmd run test:performance
npm.cmd run test:session
npm.cmd run test:flaky
npm.cmd run report
```

The local application starts automatically. To test the hosted deployment instead:

```powershell
$env:BASE_URL='https://www.saucedemo.com'
npm.cmd test
```

## Evidence

Each failure retains a screenshot, video, and trace under `test-results`. The HTML report provides browser, viewport, duration, retry history, and attachments. CI publishes these artifacts even when tests fail.

Test IDs map automation to the [compatibility matrix](docs/compatibility-matrix.md). Findings use the [defect template](docs/defects/DEFECT-TEMPLATE.md), and the final decision is recorded in the [release-readiness report](docs/release-readiness.md).

## Portfolio evidence

- [Architecture](docs/architecture.md)
- [Requirements traceability](docs/requirements-traceability.md)
- [Development plan](docs/development-plan.md)
- [Exploratory charters](docs/exploratory-charters.md)
- [Manual accessibility checklist](docs/accessibility-manual-checklist.md)
- [Browser support policy](docs/browser-support-policy.md)
- [Root-cause analysis](docs/root-cause-analysis.md)
- [Release-readiness report](docs/release-readiness.md)
- [Generated execution dashboard](docs/execution-dashboard.md)
- [Seeded defect reports](docs/defects)

Known seeded application defects use Playwright's expected-failure mechanism. A known bug is reported as expected rather than making the pipeline red; if the product is fixed, its unexpected pass fails the run and prompts removal of the stale defect record.

## Docker

Run the reproducible Chromium and Firefox suite with:

```powershell
docker compose up --build --abort-on-container-exit
```

Reports and failure evidence are written back to `playwright-report` and `test-results`.

## CI strategy

- Pull requests run a fast Chromium smoke gate.
- Main and scheduled workflows execute the full committed browser matrix.
- A weekly job repeats Critical tests ten times to expose flaky behavior.
- A Pages workflow publishes the Chromium HTML report after main-branch execution.

## Scope note

Playwright Chromium and WebKit are useful rendering engines, but they are not evidence of branded Edge or Safari coverage. This project runs installed Microsoft Edge explicitly. Real Safari requires a macOS runner and is listed as a remaining coverage opportunity.
