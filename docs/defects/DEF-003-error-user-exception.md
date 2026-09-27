# DEF-003: Adding a product produces an uncaught client exception

**Status:** Open, seeded demonstration defect  
**Severity:** High  
**Priority:** P1  
**Related test:** `DEF-003` in `special-users.spec.js`

## Steps to reproduce

1. Sign in as `error_user`.
2. Add Sauce Labs Bolt T-Shirt.
3. Inspect the cart and browser error event.

## Expected result

The product is added without an uncaught browser exception.

## Actual result

The click handler throws `Failed to add item to the cart` and the cart is unchanged.

## Impact and recommendation

The customer action fails and may trigger noisy production alerts. Handle expected failures explicitly and add an error state with a retry path.
