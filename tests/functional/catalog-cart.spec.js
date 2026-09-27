const { test, expect } = require('../../fixtures/app.fixture');
const { users } = require('../../fixtures/test-data');

test.beforeEach(async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
});

test.describe('Catalog and cart', () => {
  test('TC-CAT-001 product sorting works by price', async ({ inventoryPage }) => {
    await inventoryPage.sort.selectOption('lohi');
    const prices = (await inventoryPage.prices.allTextContents()).map((value) => Number(value.replace('$', '')));
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('TC-CART-001 @smoke @critical item can be added and removed', async ({ inventoryPage, page }) => {
    await inventoryPage.addProduct('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.openCart();
    await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');

    await page.getByTestId('remove-sauce-labs-backpack').click();
    await expect(page.getByTestId('inventory-item')).toHaveCount(0);
  });

  test('TC-NAV-001 product details and back navigation preserve state', async ({ inventoryPage, page }) => {
    await page.getByTestId('item-4-title-link').click();
    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
    await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
    await page.getByTestId('back-to-products').click();
    await expect(inventoryPage.list).toBeVisible();
  });
});
