# DEF-004: Visual user receives an intentionally broken catalog image

**Status:** Open, seeded demonstration defect  
**Severity:** Medium  
**Priority:** P2  
**Related test:** `DEF-004` in `special-users.spec.js`

## Steps to reproduce

1. Sign in as `visual_user`.
2. Inspect the first catalog product image.

## Expected result

Every product displays the image associated with its name.

## Actual result

The first product uses the `sl-404` placeholder asset.

## Impact and recommendation

Incorrect merchandising content reduces trust and may cause the wrong purchase. Validate asset mappings and keep the visual baseline in the release gate.
