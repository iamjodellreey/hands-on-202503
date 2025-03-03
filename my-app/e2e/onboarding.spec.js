import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows welcome screen as first step', async ({ page }) => {
    await expect(page.locator('.welcome-step h1')).toHaveText('Welcome');
    await expect(page.locator('.welcome-step .features')).toBeVisible();
    await expect(page.locator('.features .feature')).toHaveCount(3);
  });

  test('completes full onboarding flow', async ({ page }) => {
    // Check initial state
    await expect(page.locator('.progress')).toHaveAttribute('style', /width: 0%/);
    
    // Click "Get Started" button
    await page.click('button.next-btn');
    
    // Fill in the user creation form
    await page.fill('#username', 'testuser');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    // Verify success screen
    await expect(page.locator('.success-step h1')).toHaveText('Success');
    await expect(page.locator('.user-info')).toContainText('Welcome, testuser!');
    await expect(page.locator('.user-info')).toContainText('test@example.com');
  });

  test('allows navigation between steps', async ({ page }) => {
    // Go to create account step
    await page.click('button.next-btn');
    await expect(page.locator('h1')).toHaveText('Create Account');

    // Go back to welcome step
    await page.click('button.back-btn');
    await expect(page.locator('.welcome-step h1')).toHaveText('Welcome');
  });

  test('form validation works', async ({ page }) => {
    // Go to create account step
    await page.click('button.next-btn');

    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check that we're still on the same page (form didn't submit)
    await expect(page.locator('h1')).toHaveText('Create Account');

    // Check HTML5 validation by verifying required fields
    await expect(page.locator('#username')).toHaveAttribute('required', '');
    await expect(page.locator('#email')).toHaveAttribute('required', '');
    await expect(page.locator('#password')).toHaveAttribute('required', '');
  });

  test('progress bar updates correctly', async ({ page }) => {
    // Check initial state
    await expect(page.locator('.progress')).toHaveAttribute('style', /width: 0%/);
    
    // Move to second step
    await page.click('button.next-btn');
    await expect(page.locator('.progress')).toHaveAttribute('style', /width: 50%/);
    
    // Move to final step
    await page.fill('#username', 'testuser');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await expect(page.locator('.progress')).toHaveAttribute('style', /width: 100%/);
  });

  test('email validation requires proper format', async ({ page }) => {
    await page.click('button.next-btn');
    
    // Fill in invalid email
    await page.fill('#username', 'testuser');
    await page.fill('#email', 'invalid-email');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    // Should stay on the same page due to HTML5 validation
    await expect(page.locator('h1')).toHaveText('Create Account');
    
    // Fix the email and submit
    await page.fill('#email', 'valid@email.com');
    await page.click('button[type="submit"]');
    
    // Should proceed to success screen
    await expect(page.locator('.success-step h1')).toHaveText('Success');
  });

  test('allows restart from success screen', async ({ page }) => {
    // Complete the flow first
    await page.click('button.next-btn');
    await page.fill('#username', 'testuser');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    
    // Click restart button
    await page.click('button.restart-btn');
    
    // Should be back at welcome screen
    await expect(page.locator('.welcome-step h1')).toHaveText('Welcome');
    await expect(page.locator('.progress')).toHaveAttribute('style', /width: 0%/);
  });

  test('form fields maintain floating label style when filled', async ({ page }) => {
    await page.click('button.next-btn');
    
    // Fill in a field and check if label stays floating
    await page.fill('#username', 'testuser');
    await expect(page.locator('label[for="username"]')).toHaveCSS('top', '-10px');
    
    // Clear the field and check if label returns to original position
    await page.fill('#username', '');
    await expect(page.locator('label[for="username"]')).not.toHaveCSS('top', '-10px');
  });
});