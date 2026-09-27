const { test, expect } = require('../../fixtures/app.fixture');
const { users } = require('../../fixtures/test-data');

async function expectNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.documentWidth, `document width ${dimensions.documentWidth}px`).toBeLessThanOrEqual(
    dimensions.viewportWidth + 1,
  );
}

test.beforeEach(async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
});

test('TC-RWD-001 catalog fits viewport and primary controls remain usable', async ({ inventoryPage, page }) => {
  await expect(inventoryPage.list).toBeVisible();
  await expect(inventoryPage.sort).toBeVisible();
  await expect(inventoryPage.menuButton).toBeVisible();
  await expect(inventoryPage.cartLink).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test('TC-RWD-002 cart and checkout remain usable at the active viewport', async ({ inventoryPage, checkoutPage, page }) => {
  await inventoryPage.addProduct('Sauce Labs Backpack');
  await inventoryPage.openCart();
  await expect(checkoutPage.checkout).toBeInViewport();
  await checkoutPage.checkout.click();
  await expect(checkoutPage.firstName).toBeInViewport();
  await expectNoHorizontalOverflow(page);
});

test('TC-RWD-003 navigation drawer opens without covering its close control', async ({ inventoryPage, page }) => {
  await inventoryPage.menuButton.click();
  const close = page.getByRole('button', { name: 'Close Menu' });
  await expect(close).toBeVisible();
  await expect(close).toBeInViewport();
  await close.click();
  await expect(close).toBeHidden();
});
