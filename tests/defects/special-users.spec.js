const { test, expect } = require('../../fixtures/app.fixture');
const { users } = require('../../fixtures/test-data');

test.describe('Seeded defect discovery @known-defect', () => {
  test('DEF-002 problem user can add every listed product to the cart', async ({ loginPage, page }) => {
    test.fail(true, 'Known product-selection defect for problem_user.');
    await loginPage.open();
    await loginPage.login(users.problem);
    await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();
    await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  });

  test('DEF-003 error user actions do not raise uncaught exceptions', async ({ loginPage, page }) => {
    test.fail(true, 'Known client exception for error_user when an odd product is added.');
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    await loginPage.open();
    await loginPage.login(users.error);
    await page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt').click();
    expect(pageErrors).toEqual([]);
  });

  test('DEF-004 visual user receives valid product images', async ({ loginPage, page }) => {
    test.fail(true, 'Known broken image for visual_user.');
    await loginPage.open();
    await loginPage.login(users.visual);
    const firstImage = page.getByTestId('inventory-item').first().locator('img');
    await expect(firstImage).not.toHaveAttribute('src', /sl-404/);
  });
});
