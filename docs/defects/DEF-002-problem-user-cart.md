# DEF-002: Problem user cannot add every listed product to the cart

**Status:** Open, seeded demonstration defect  
**Severity:** High  
**Priority:** P1  
**Related test:** `DEF-002` in `special-users.spec.js`

## Steps to reproduce

1. Sign in as `problem_user`.
2. Select **Add to cart** for Sauce Labs Bolt T-Shirt.
3. Observe the cart badge and button state.

## Expected result

The selected product is added and the badge increases by one.

## Actual result

Odd-numbered products are silently ignored.

## Impact and recommendation

A customer can be prevented from purchasing available products without an error or recovery path. Block release for affected production accounts and remove the account-specific branch.
