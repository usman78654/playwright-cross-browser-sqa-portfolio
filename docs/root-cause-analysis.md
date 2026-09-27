# Root-Cause Analysis: Performance Glitch User

## Problem

The inventory page for `performance_glitch_user` becomes unresponsive for about five seconds after login, violating the four-second interaction budget in `DEF-005`.

## Evidence

Source inspection identifies a synchronous busy loop in the inventory render path. `TC-PERF-001` establishes the standard-user baseline, while the expected-failure performance test records the affected user's duration.

## Root cause

The page deliberately executes repeated date checks on the browser main thread. Rendering, input, and accessibility events share that thread, so the loop blocks all interaction until it finishes.

## Corrective action

Remove the artificial loop. For legitimate expensive work, split tasks into small asynchronous units, move CPU-heavy work to a Web Worker, or perform it before delivery. Add the performance budget to the required quality gate.

## Prevention

- Track interaction latency in CI.
- Review code for synchronous loops in render paths.
- Profile release candidates under representative hardware throttling.
- Treat a budget regression as a release risk rather than hiding it with a longer test timeout.
