const { test, expect } = require('../../fixtures/app.fixture');
const { users } = require('../../fixtures/test-data');

const transferBudgetBytes = process.env.BASE_URL ? 5_000_000 : 12_000_000;
const domContentLoadedBudgetMs = process.env.BASE_URL ? 15_000 : 5_000;

async function loginDuration(loginPage, page, user) {
  await loginPage.open();
  const started = Date.now();
  await loginPage.login(user);
  await page.getByTestId('inventory-list').waitFor();
  return Date.now() - started;
}

test('TC-PERF-001 @performance standard login-to-catalog meets the 4s interaction budget', async ({ loginPage, page }) => {
  const durationMs = await loginDuration(loginPage, page, users.standard);
  test.info().annotations.push({ type: 'metric', description: `login-to-catalog=${durationMs}ms` });
  expect(durationMs).toBeLessThan(4_000);
});

test('DEF-005 @performance performance user meets the 4s interaction budget', async ({ loginPage, page }) => {
  test.fail(true, 'Known synchronous five-second main-thread block.');
  const durationMs = await loginDuration(loginPage, page, users.performance);
  test.info().annotations.push({ type: 'metric', description: `login-to-catalog=${durationMs}ms` });
  expect(durationMs).toBeLessThan(4_000);
});

test('TC-PERF-002 @performance login page stays within resource budgets', async ({ loginPage, page }) => {
  await loginPage.open();
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    return {
      domContentLoadedMs: navigation.domContentLoadedEventEnd,
      transferBytes: resources.reduce((total, resource) => total + (resource.transferSize || 0), 0),
      requestCount: resources.length,
    };
  });
  await test.info().attach('performance-metrics', {
    body: Buffer.from(JSON.stringify(metrics, null, 2)),
    contentType: 'application/json',
  });
  expect(metrics.domContentLoadedMs).toBeLessThan(domContentLoadedBudgetMs);
  expect(metrics.transferBytes).toBeLessThan(transferBudgetBytes);
  expect(metrics.requestCount).toBeLessThan(100);
});
