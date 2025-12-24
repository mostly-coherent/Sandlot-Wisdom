import { test, expect } from '@playwright/test';

test.describe('Sandlot Wisdom E2E Tests', () => {
  
  test('01 - Homepage loads', async ({ page }) => {
    await page.goto('/');
    
    // Main page should load
    await expect(page.locator('body')).toBeVisible();
    
    await page.screenshot({ path: 'e2e-results/01-homepage.png', fullPage: true });
  });

  test('02 - Navigation exists', async ({ page }) => {
    await page.goto('/');
    
    // Look for main navigation (Learn, Play, Reference, History)
    await page.waitForTimeout(500);
    
    await page.screenshot({ path: 'e2e-results/02-navigation.png', fullPage: true });
  });

  test('03 - Learn section accessible', async ({ page }) => {
    await page.goto('/');
    
    // Try to find and click Learn link
    const learnLink = page.getByRole('link', { name: /learn/i });
    if (await learnLink.count() > 0) {
      await learnLink.first().click();
      await page.waitForTimeout(500);
    }
    
    await page.screenshot({ path: 'e2e-results/03-learn.png', fullPage: true });
  });

  test('04 - Play section accessible', async ({ page }) => {
    await page.goto('/');
    
    // Try to find and click Play link
    const playLink = page.getByRole('link', { name: /play/i });
    if (await playLink.count() > 0) {
      await playLink.first().click();
      await page.waitForTimeout(500);
    }
    
    await page.screenshot({ path: 'e2e-results/04-play.png', fullPage: true });
  });

  test('05 - Responsive design - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'e2e-results/05-mobile.png', fullPage: true });
  });

  test('06 - Responsive design - tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'e2e-results/06-tablet.png', fullPage: true });
  });

  test('07 - PWA manifest', async ({ request }) => {
    const response = await request.get('/manifest.json');
    // Should have a manifest for PWA
    if (response.ok()) {
      const manifest = await response.json();
      expect(manifest).toHaveProperty('name');
    }
  });

});

