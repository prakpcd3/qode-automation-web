const { expect } = require('@playwright/test');
require('dotenv').config(); // Env variables loaded

class LoginPage {
  constructor(page) {
      this.page = page;
  }

  async navigate() {
      await this.page.goto(process.env.BASE_URL);

      // assert the right url
      await expect(this.page).toHaveURL(/.*job-listing/);
      await this.page.click('.chakra-button:first-child');
      // await this.page.click('.chakra-text.css-1vh83go');
  }

  async signIn(username) {
      await this.page.fill('input[type="email"]', username);
      await this.page.click('.chakra-button:text("Send Verification Link")');
      return await this.page.isVisible('.chakra-image.css-n05ip5');
      // await expect(this.page).toHaveURL('/mail/u/0/#inbox');
  }
  
  async gotoGmail(){
    await this.page.goto('https://mail.google.com/');
  }
}

module.exports = { LoginPage };
