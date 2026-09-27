const { test, expect } = require('../../fixtures/app.fixture');
const { users } = require('../../fixtures/test-data');

test.describe('Authentication', () => {
  test('TC-AUTH-001 @smoke @critical standard user can sign in', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.standard);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.list).toBeVisible();
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('TC-AUTH-002 required username is validated', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.submit.click();
    await expect(loginPage.error).toContainText('Username is required');
  });

  test('TC-AUTH-003 required password is validated', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.username.fill(users.standard.username);
    await loginPage.submit.click();
    await expect(loginPage.error).toContainText('Password is required');
  });

  test('TC-AUTH-004 invalid credentials are rejected', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.invalid);
    await expect(loginPage.error).toContainText('do not match any user');
  });

  test('TC-AUTH-005 locked user receives a specific error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.locked);
    await expect(loginPage.error).toContainText('locked out');
  });
});
