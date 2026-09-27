const { test, expect } = require('../../fixtures/app.fixture');
const { users } = require('../../fixtures/test-data');

test('TC-SES-001 @critical protected routes redirect anonymous users', async ({ page }) => {
  await page.goto('/cart.html');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByTestId('error')).toContainText('only access');
});

test('TC-SES-002 cart state survives refresh', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
  await inventoryPage.addProduct('Sauce Labs Backpack');
  await page.reload();
  await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('TC-SES-003 @critical logout prevents protected-page access', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
  await inventoryPage.menuButton.click();
  await page.getByTestId('logout-sidebar-link').click();
  await expect(page).toHaveURL(/\/$/);
  await page.goto('/inventory.html');
  await expect(page).toHaveURL(/\/$/);
});

test('TC-SES-004 session and cart state are consistent across tabs', async ({ loginPage, inventoryPage, context }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
  await inventoryPage.addProduct('Sauce Labs Backpack');
  const secondTab = await context.newPage();
  await secondTab.goto('/inventory.html');
  await expect(secondTab.getByTestId('inventory-list')).toBeVisible();
  await expect(secondTab.getByTestId('shopping-cart-badge')).toHaveText('1');
});

test('TC-SES-005 reset application state clears the cart', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
  await inventoryPage.addProduct('Sauce Labs Backpack');
  await inventoryPage.menuButton.click();
  await page.getByTestId('reset-sidebar-link').click();
  await expect(inventoryPage.cartBadge).toBeHidden();
});
