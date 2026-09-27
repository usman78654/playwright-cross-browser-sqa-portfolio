const AxeBuilder = require('@axe-core/playwright').default;
const { test, expect } = require('../../fixtures/app.fixture');
const { users } = require('../../fixtures/test-data');

test.describe.configure({ timeout: 60_000 });

async function expectNoSeriousViolations(page) {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  const blocking = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
}

test('TC-A11Y-001 login has no serious WCAG A/AA violations', async ({ loginPage, page }) => {
  await loginPage.open();
  await expectNoSeriousViolations(page);
});

test('TC-A11Y-002 catalog has no serious WCAG A/AA violations', async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
  await expectNoSeriousViolations(page);
});

test('TC-A11Y-003 login can be completed with keyboard only', async ({ loginPage, page }) => {
  await loginPage.open();
  await page.keyboard.press('Tab');
  await expect(loginPage.username).toBeFocused();
  await page.keyboard.type(users.standard.username);
  await page.keyboard.press('Tab');
  await expect(loginPage.password).toBeFocused();
  await page.keyboard.type(users.standard.password);
  await page.keyboard.press('Tab');
  await expect(loginPage.submit).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inventory\.html/);
});

test('TC-A11Y-004 focused controls have a visible focus indicator', async ({ loginPage, page }) => {
  await loginPage.open();
  await page.keyboard.press('Tab');
  const focusStyle = await loginPage.username.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: style.outlineWidth, boxShadow: style.boxShadow };
  });
  expect(
    focusStyle.outlineStyle !== 'none' || focusStyle.outlineWidth !== '0px' || focusStyle.boxShadow !== 'none',
    JSON.stringify(focusStyle),
  ).toBeTruthy();
});

test('TC-A11Y-005 catalog reflows at a 200 percent zoom-equivalent viewport', async ({ loginPage, page }) => {
  await page.setViewportSize({ width: 640, height: 720 });
  await loginPage.open();
  await loginPage.login(users.standard);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.getByTestId('open-menu')).toBeVisible();
  await expect(page.getByTestId('shopping-cart-link')).toBeVisible();
});

test('TC-A11Y-006 core content remains visible in forced-colors mode', async ({ loginPage, page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await loginPage.open();
  await expect(loginPage.username).toBeVisible();
  await expect(loginPage.password).toBeVisible();
  await expect(loginPage.submit).toBeVisible();
});
