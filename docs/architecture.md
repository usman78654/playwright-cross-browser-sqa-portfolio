# Test Architecture

```mermaid
flowchart LR
    Dev[Pull request or scheduled run] --> CI[GitHub Actions]
    Local[Local or Docker execution] --> Runner[Playwright runner]
    CI --> Runner
    Runner --> AUT[Local Swag Labs build]
    Runner --> Chrome[Chromium / Chrome]
    Runner --> Firefox[Firefox]
    Runner --> Edge[Microsoft Edge]
    Runner --> Mobile[Tablet and mobile profiles]
    Chrome --> Evidence[HTML, JSON, JUnit, screenshots, video, traces]
    Firefox --> Evidence
    Edge --> Evidence
    Mobile --> Evidence
    Evidence --> Gate[Risk-based quality gate]
    Evidence --> Pages[GitHub Pages report]
    Gate --> Release[Release-readiness decision]
```

Page objects isolate user interactions, fixtures provide consistent test data, and test IDs link automation to requirements and defect reports. Browser projects own environment differences in one configuration file. CI separates browser failures while retaining evidence from every job.
