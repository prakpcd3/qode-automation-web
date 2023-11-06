
const { expect } = require('@playwright/test');
require('dotenv').config(); // Env variables loaded

class GmailPage {
  constructor(page) {
      this.page = page;
  }

  async gmailInput(){
    await this.page.fill('input[type="email"]', process.env.USERNAME);
    await this.page.click('text="Next"');
    await this.page.fill('input[type="password"]', process.env.PASSWORD);
    await this.page.click('text="Next"');
    await this.page.waitForTimeout(7000);
    
    // await expect(this.page).toHaveURL(/mail/);
  }
  
  async verifyLinkQode(){
    // await this.page.waitForTimeout(10000);
    // Wait for the list of emails to be visible
    await this.page.waitForSelector('table[role="grid"]', { timeout: 10000 });

    // Click on the first email in the inbox list
    // The selector might change based on Gmail's current design
    // Make sure the selector is for the first email in the list
    await this.page.click('table[role="grid"] tr:nth-of-type(1)');

    
    await this.page.waitForTimeout(10000);
    
    console.log('First email should be open now.');
    
    await this.page.waitForTimeout(15000);
    await this.page.getByRole('link', { name: 'Show' }).click();
    await this.page.mouse.down();

    // await this.page.click('[name="qode (Do Not Reply)"]').last();
    const elements = await this.page.$$('[data-tooltip="Show trimmed content"]');

    // Click the last element in the array
    if (elements.length > 0) {
      await elements[elements.length - 1].click();
    }
    // await this.page.click('[data-tooltip="Show trimmed content"]');
    await this.page.waitForSelector('a:text("Click here to verify")');

    // To make sure the latest links will be interacted
    const links = await this.page.$$('a:text("Click here to verify")');
    if (links.length > 0) {
        await links[links.length - 1].click();
    } else {
        console.log('No links with the specified text found.');
    }

  }
}
  
module.exports = { GmailPage };