# DEF-005: Performance user blocks the browser main thread for five seconds

**Status:** Open, seeded demonstration defect  
**Severity:** High  
**Priority:** P1  
**Related test:** `DEF-005` in `performance.spec.js`

## Steps to reproduce

1. Sign in as `performance_glitch_user`.
2. Measure time until the catalog becomes visible and interactive.

## Expected result

The catalog becomes interactive within the four-second test budget.

## Actual result

The inventory render path executes a synchronous busy loop for approximately five seconds.

## Impact and recommendation

The interface freezes, which can cause abandonment and repeated input. Remove synchronous work from the render path. See the linked root-cause analysis.
