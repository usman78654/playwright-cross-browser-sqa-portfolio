# Requirements Traceability Matrix

| Requirement | Acceptance criterion | Automated evidence | Manual evidence | Priority |
|---|---|---|---|---|
| R-AUTH-01 Authentication | Valid user reaches catalog; invalid and locked users receive errors | TC-AUTH-001–005 | Exploratory charter 1 | Critical |
| R-CAT-01 Catalog | Six products render and price sorting is correct | TC-CAT-001 | Charter 2 | High |
| R-CART-01 Cart | Add, remove, refresh, reset and cross-tab state are consistent | TC-CART-001, TC-SES-002, 004, 005 | Charter 2 | Critical |
| R-CHK-01 Checkout | Required fields are enforced and order completes | TC-CHK-001–004 | Charter 3 | Critical |
| R-SEC-01 Route protection | Anonymous and logged-out users cannot access protected pages | TC-SES-001, 003 | Charter 1 | Critical |
| R-RWD-01 Responsive layout | Controls remain visible with no horizontal overflow | TC-RWD-001–003, TC-A11Y-005 | Charter 4 | High |
| R-A11Y-01 Accessibility | No serious Axe violations; keyboard and focus are usable | TC-A11Y-001–006 | Accessibility checklist | High |
| R-NET-01 Resilience | Core flow tolerates slow/failed resources and recovers after offline state | TC-NET-001–004 | Charter 5 | Medium |
| R-PERF-01 Performance | Standard login-to-catalog under 4s; login resources within budgets | TC-PERF-001–002 | DevTools profile | High |
| R-VIS-01 Visual stability | Reference catalog layout remains within approved pixel tolerance | TC-VIS-001 | Screenshot review | Medium |
