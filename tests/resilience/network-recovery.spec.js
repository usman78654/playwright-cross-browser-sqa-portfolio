const { test, expect } = require('../../fixtures/app.fixture');
const { users } = require('../../fixtures/test-data');

test('TC-NET-002 @network catalog remains usable when product images fail', async ({ loginPage, inventoryPage, page }) => {
  await page.route(/\.(png|jpe?g|svg)(\?.*)?$/i, (route) => route.abort('failed'));
  await loginPage.open();
  await loginPage.login(users.standard);
  await expect(inventoryPage.items).toHaveCount(6);
  await inventoryPage.addProduct('Sauce Labs Backpack');
  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('TC-NET-003 @network application recovers after an offline transition', async ({ loginPage, inventoryPage, context, page }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
  await context.setOffline(true);
  await expect(page.reload()).rejects.toThrow();
  await context.setOffline(false);
  await page.reload();
  await expect(inventoryPage.list).toBeVisible();
});

test('TC-NET-004 @network failed requests are captured as diagnostic evidence', async ({ loginPage, page }) => {
  const failures = [];
  page.on('requestfailed', (request) => failures.push({ url: request.url(), error: request.failure()?.errorText }));
  await page.route(/sauce-backpack.*\.(png|jpe?g)/i, (route) => route.abort('timedout'));
  await loginPage.open();
  await loginPage.login(users.standard);
  await page.waitForLoadState('networkidle');
  await test.info().attach('request-failures', {
    body: Buffer.from(JSON.stringify(failures, null, 2)),
    contentType: 'application/json',
  });
  expect(failures.length).toBeGreaterThan(0);
});
