# Development and Test Plan

## Goal

Demonstrate production-minded SQA work through risk-based planning, maintainable automation, cross-browser evidence, defect communication, and a clear release decision.

## Delivery phases

| Phase | Deliverable | Acceptance criteria | Status |
|---|---|---|---|
| 1. Foundation | Target app, Playwright configuration, page objects, test data | Tests can target local or hosted builds; failures retain evidence | Complete |
| 2. Critical flows | Authentication, catalog, cart, checkout | Positive and negative paths have traceable IDs | Complete |
| 3. Compatibility | Chromium, Firefox, Edge, tablet and mobile projects | Real Edge channel is configured; viewport matrix is documented | Complete |
| 4. Non-functional | Accessibility, keyboard, visual, link, console and slow-resource checks | Automated checks have explicit and reviewable assertions | Complete |
| 5. Delivery pipeline | Pull-request and scheduled CI, retained reports | Browser jobs execute independently and publish evidence | Complete |
| 6. Test execution | Execute supported matrix and triage failures | Results and environment versions are recorded | Complete for hosted build |
| 7. Release assessment | Defects, regression results, risk-based decision | Exit criteria and unresolved risks are signed off | Complete for hosted build |
| 8. Portfolio depth | Performance, sessions, recovery, seeded defects, Docker, dashboards | New checks execute; reports and CI assets are reviewable | Complete locally |

## Test approach

Risk priority is based on business impact and likelihood:

| Risk | Priority | Coverage |
|---|---:|---|
| User cannot authenticate or purchase | P0 | Smoke flow on every desktop browser |
| Cart or price state is incorrect | P1 | Cart state, product selection, subtotal assertions |
| Layout blocks an action | P1 | Desktop, tablet, mobile overflow and viewport assertions |
| Invalid data is accepted without feedback | P1 | Required and invalid form scenarios |
| Assistive technology cannot operate a flow | P1 | Axe WCAG rules plus keyboard-only login |
| Browser errors or failed links go unnoticed | P2 | Page-error listener and internal-link checks |
| Degraded network makes the app unusable | P2 | Delayed image route with functional assertions |
| Visual styling regresses | P2 | Stable Chromium screenshot baseline |

## Entry criteria

- Test environment and build are identifiable.
- Supported browsers can launch.
- Test accounts are available and resettable.
- Critical routes respond successfully.

## Exit criteria

- 100% of P0 smoke tests pass in Chrome/Chromium, Firefox, and Edge.
- At least 95% of all planned automated checks pass.
- No open Critical or High defects affect the purchase path.
- Responsive checks pass at all committed viewports.
- No serious or critical automated accessibility violations remain without approval.
- Any accepted risk has an owner, rationale, and target date.

## Planned extensions

- Add a real Safari job on macOS.
- Add API contract tests if a supported backend API becomes available.
- Publish historical pass rate and flaky-test trends.
- Add localization and high-zoom checks when those become product requirements.

## Phase 2 execution

The locally achievable portfolio extensions were validated on hosted Sauce Demo in Chromium, Firefox, and Microsoft Edge. Forty-eight product executions passed and the four seeded defects were reproduced in each browser, creating 12 expected-defect executions. Docker Compose configuration validates locally; image execution, Pages publication, and scheduled workflows require their respective runtime or GitHub repository.
