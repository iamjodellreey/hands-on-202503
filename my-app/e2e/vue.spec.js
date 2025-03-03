import { test, expect } from '@playwright/test';

test.describe('Vue App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has proper viewport and styling', async ({ page }) => {
    // Check if app container exists and is centered
    const appContainer = page.locator('.app-container');
    await expect(appContainer).toBeVisible();
    await expect(appContainer).toHaveCSS('display', 'flex');
    await expect(appContainer).toHaveCSS('align-items', 'center');
    await expect(appContainer).toHaveCSS('justify-content', 'center');
  });

  test('applies base styles correctly', async ({ page }) => {
    // Check if body has gradient background
    const body = page.locator('body');
    await expect(body).toHaveCSS('background', /linear-gradient/);
    await expect(body).toHaveCSS('min-height', '100vh');
  });

  test('renders main content within bounds', async ({ page }) => {
    const main = page.locator('main');
    await expect(main).toBeVisible();
    await expect(main).toHaveCSS('max-width', '1200px');
    await expect(main).toHaveCSS('margin', /0 auto/);
  });

  test('is responsive on different viewports', async ({ page }) => {
    // Test desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page.locator('.features')).toHaveCSS('grid-template-columns', /repeat/);

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.features')).toHaveCSS('grid-template-columns', '1fr');
  });
});
