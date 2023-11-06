import { test, expect } from '@playwright/test';

test.describe('Users Go to career page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qode.world/career/job-listing');
    
    // Make sure the page is true
    await expect(page).toHaveURL(/.*job-listing/);

  });
  
  test('has title', async ({ page }) => {
    // Check the career page.
    await expect(page).toHaveTitle(/qode | qode/);
  });
  
  test('Choose the job', async ({ page }) => {
    await page.click('.css-18y7tct');
    
    await page.isVisible('.chakra-text css-7v9435');
  });

});