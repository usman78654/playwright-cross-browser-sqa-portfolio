# Compatibility and Traceability Matrix

## Environments

| ID | Browser / engine | Viewport | Input | Purpose |
|---|---|---:|---|---|
| D-CHR | Chromium desktop | 1280×720 default device profile | Mouse/keyboard | Primary functional regression |
| D-FF | Firefox desktop | 1280×720 default device profile | Mouse/keyboard | Browser compatibility |
| D-EDGE | Microsoft Edge stable | 1280×720 default device profile | Mouse/keyboard | Branded Edge validation |
| T-CHR | Chromium, iPad profile | 810×1080 | Touch | Tablet layout |
| M-CHR | Chromium, Pixel 7 profile | 412×915 | Touch | Mobile layout |
| M-FF | Firefox | 390×844 | Touch enabled | Mobile cross-engine layout |

Record the exact OS and browser versions in the release report for every formal run.

## Functional coverage

| Area | Test IDs | Desktop browsers | Responsive projects | Risk |
|---|---|---|---|---|
| Successful login | TC-AUTH-001 | Chrome, Firefox, Edge | Indirect setup | Critical |
| Login validation | TC-AUTH-002–005 | Chrome, Firefox, Edge | — | High |
| Product sorting | TC-CAT-001 | Chrome, Firefox, Edge | — | Medium |
| Cart state | TC-CART-001 | Chrome, Firefox, Edge | TC-RWD-002 | Critical |
| Product navigation | TC-NAV-001 | Chrome, Firefox, Edge | — | Medium |
| Checkout | TC-CHK-001–004 | Chrome, Firefox, Edge | TC-RWD-002 | Critical |
| Responsive layout | TC-RWD-001–003 | Desktop baseline | Tablet, mobile | High |
| Accessibility | TC-A11Y-001–003 | Chrome, Firefox, Edge | — | High |
| Browser health | TC-OBS-001 | Chrome, Firefox, Edge | — | Medium |
| Slow resources | TC-NET-001 | Chrome, Firefox, Edge | — | Medium |
| Link semantics and destinations | TC-LINK-001 | Chrome, Firefox, Edge | — | Medium |
| Visual baseline | TC-VIS-001 | Chromium owner | — | Medium |
| Protected routes and session | TC-SES-001–005 | Chrome, Firefox, Edge | — | Critical |
| Performance budgets | TC-PERF-001–002 | Chrome, Firefox, Edge | — | High |
| Failed-resource and offline recovery | TC-NET-002–004 | Chrome, Firefox, Edge | — | Medium |
| Advanced accessibility | TC-A11Y-004–006 | Chrome, Firefox, Edge | Zoom-equivalent reflow | High |
| Seeded defect discovery | DEF-002–005 | Chrome, Firefox, Edge | — | Demonstration |

## Manual exploratory charters

1. Zoom from 100% to 400% and check reflow, focus visibility, and loss of content.
2. Use Windows High Contrast and browser forced-colors modes.
3. Inspect orientation changes and browser back/forward behavior during checkout.
4. Verify external social links, new-tab behavior, and accessible link names.
5. Test refresh, expired session, duplicate submission, and interrupted checkout recovery.
6. Inspect DevTools Console and Network panels under offline and Fast 3G profiles.
