# DEF-001: Locked-user login triggers an unnecessary external error-report request

**Status:** Candidate—confirm during formal execution  
**Severity:** Low  
**Priority:** P3  
**Environment:** Complete during execution  
**Related test:** TC-AUTH-005

## Preconditions

Use the `locked_out_user` account with password `secret_sauce`.

## Steps to reproduce

1. Open the login page.
2. Enter the locked user credentials.
3. Submit the form while observing the Network and Console panels.

## Expected result

The user receives a clear locked-account message without generating a client-side application error.

## Actual result

Source inspection shows the expected account state is sent to the error-reporting client as an `Error`. Confirm whether this creates failed requests or noisy telemetry in the selected test environment.

## Impact and recommendation

Expected business events can inflate error rates and distract incident triage. Record the event as structured telemetry or an audit event instead of an application exception.
