const { test, expect } = require('../../fixtures/app.fixture');
const { users } = require('../../fixtures/test-data');

test('TC-VIS-001 catalog visual baseline @visual', async ({ loginPage, page }) => {
  test.skip(test.info().project.name !== 'chromium-desktop', 'One stable reference renderer owns the baseline.');
  test.skip(Boolean(process.env.CI) && process.platform !== 'win32', 'The committed baseline is owned by Windows Chromium CI.');
  await loginPage.open();
  await loginPage.login(users.standard);
  await expect(page).toHaveScreenshot('catalog-desktop.png', {
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.01,
  });
});
