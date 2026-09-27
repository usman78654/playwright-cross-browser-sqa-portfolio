const { test, expect } = require('../../fixtures/app.fixture');
const { users } = require('../../fixtures/test-data');

test('TC-OBS-001 standard purchase path emits no uncaught page errors', async ({ loginPage, inventoryPage, page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  await loginPage.open();
  await loginPage.login(users.standard);
  await inventoryPage.addProduct('Sauce Labs Backpack');
  await inventoryPage.openCart();

  expect(errors).toEqual([]);
});

test('TC-NET-001 UI remains operable when images load slowly', async ({ loginPage, inventoryPage, page }) => {
  await page.route(/\.(png|jpe?g|svg)(\?.*)?$/i, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    await route.continue();
  });

  await loginPage.open();
  await loginPage.login(users.standard);
  await expect(inventoryPage.list).toBeVisible();
  await inventoryPage.addProduct('Sauce Labs Backpack');
  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('TC-LINK-001 links expose valid destinations or accessible SPA actions', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
  await expect(page.getByTestId('inventory-list')).toBeVisible();
  const links = await page.locator('a[href]').evaluateAll((anchors) =>
    anchors.map((anchor) => ({
      href: anchor.getAttribute('href'),
      role: anchor.getAttribute('role'),
      accessibleName: anchor.getAttribute('aria-label') || anchor.textContent.trim(),
    })),
  );

  expect(links.length).toBeGreaterThan(0);
  for (const link of links) {
    if (link.href === '#') {
      expect(link.role, JSON.stringify(link)).toBe('button');
      expect(link.accessibleName, JSON.stringify(link)).not.toBe('');
    } else {
      expect(() => new URL(link.href, page.url()), JSON.stringify(link)).not.toThrow();
    }
  }
});
