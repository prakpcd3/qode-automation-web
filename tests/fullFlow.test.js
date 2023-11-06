import { test, expect } from '@playwright/test';
import { GmailPage } from '../pages/GmailPage';
const { LoginPage } = require('../pages/LoginPage');

test.describe('Users Go to career page', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    
    loginPage =  new LoginPage(page);
    const gmailVerify = new GmailPage(page);
    await loginPage.navigate();

    // Sign In process
    await loginPage.signIn(process.env.USERNAME);
    await loginPage.gotoGmail();

    // Verification process in GMail
    await gmailVerify.gmailInput();
    await gmailVerify.verifyLinkQode();

  });
  
  test('On job listing page', async ({ page }) => {
    // Check the career page.
    await expect(page).toHaveTitle(/qode | qode/);
  });
  
  test('Choose the job', async ({ page }) => {
    await page.click('.css-18y7tct');
    
    await page.isVisible('.chakra-text css-7v9435');
  });

});