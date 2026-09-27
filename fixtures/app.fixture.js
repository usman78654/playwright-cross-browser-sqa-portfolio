const base = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { InventoryPage } = require('../pages/inventory.page');
const { CheckoutPage } = require('../pages/checkout.page');

const test = base.test.extend({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
});

module.exports = { test, expect: base.expect };
