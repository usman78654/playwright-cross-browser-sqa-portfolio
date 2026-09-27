const { defineConfig, devices } = require('@playwright/test');

const externalBaseUrl = process.env.BASE_URL;

module.exports = defineConfig({
  testDir: './tests',
  outputDir: 'test-results/artifacts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: process.env.CI
    ? [
        ['line'],
        ['html', { open: 'never' }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
        ['json', { outputFile: 'test-results/results.json' }],
      ]
    : [
        ['list'],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }],
      ],
  use: {
    baseURL: externalBaseUrl || 'http://127.0.0.1:3000',
    testIdAttribute: 'data-test',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: externalBaseUrl
    ? undefined
    : {
        command: 'npm.cmd run app:start',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox-desktop',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'edge-desktop',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'tablet-chromium',
      testMatch: /responsive\/.*\.spec\.js/,
      use: { ...devices['iPad (gen 7)'], browserName: 'chromium' },
    },
    {
      name: 'mobile-chromium',
      testMatch: /responsive\/.*\.spec\.js/,
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-firefox',
      testMatch: /responsive\/.*\.spec\.js/,
      use: {
        browserName: 'firefox',
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
