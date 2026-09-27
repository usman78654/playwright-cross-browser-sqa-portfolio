# Browser Support Policy

## Committed support

- Latest stable Google Chrome or equivalent Playwright Chromium
- Latest stable Mozilla Firefox
- Latest stable Microsoft Edge through the installed `msedge` channel
- Representative tablet Chromium profile
- Representative mobile Chromium and Firefox profiles

Every release candidate must pass the Critical suite in all desktop browsers. The complete matrix runs on the main branch and schedule. A browser-specific Critical failure blocks release unless a documented exception has an owner and expiry date.

## Extended coverage

Real Safari and iOS Safari require macOS or a cloud device provider. Playwright WebKit can provide early engine feedback but must not be reported as real Safari evidence. Older browser versions and physical devices are added when analytics or contractual requirements justify them.

Exact OS, browser version, build, viewport, and test date must be recorded for formal execution.
