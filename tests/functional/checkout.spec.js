const { test, expect } = require('../../fixtures/app.fixture');
const { users, customer } = require('../../fixtures/test-data');

test.beforeEach(async ({ loginPage, inventoryPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
  await inventoryPage.addProduct('Sauce Labs Backpack');
  await inventoryPage.openCart();
});

test.describe('Checkout', () => {
  test('TC-CHK-001 @smoke @critical customer completes a purchase', async ({ checkoutPage, page }) => {
    await checkoutPage.checkout.click();
    await checkoutPage.enterCustomer(customer);

    await expect(page.getByTestId('subtotal-label')).toContainText('$29.99');
    await checkoutPage.finish.click();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(page).toHaveURL(/checkout-complete\.html/);
  });

  for (const scenario of [
    { id: 'TC-CHK-002', field: 'First Name', data: { firstName: '', lastName: 'Khan', postalCode: '44000' } },
    { id: 'TC-CHK-003', field: 'Last Name', data: { firstName: 'Ayesha', lastName: '', postalCode: '44000' } },
    { id: 'TC-CHK-004', field: 'Postal Code', data: { firstName: 'Ayesha', lastName: 'Khan', postalCode: '' } },
  ]) {
    test(`${scenario.id} ${scenario.field} is required`, async ({ checkoutPage }) => {
      await checkoutPage.checkout.click();
      await checkoutPage.enterCustomer(scenario.data);
      await expect(checkoutPage.error).toContainText(`${scenario.field} is required`);
    });
  }
});
