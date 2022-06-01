const { expect, test } = require('@playwright/test');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    devtools: true,
    //slowMo: 400
  });

  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');
 
  // Navigate to Espanol and fill in search
  await page.locator('strong:has-text("Español")').click();
  await page.click('#searchInput');
  await page.fill('#searchInput', 'test');
  await page.click('#searchButton');
  // assert text content
  expect(await page.locator('#firstHeading').textContent()).toEqual('Test');

  // assert url
  expect(await page.url()).toMatch('https://es.wikipedia.org/wiki/Test');

  // assert inner text
  expect(await page.locator('#content').innerText()).toContain('hace referencia a varios artículos');

  await page.screenshot({ path: 'testWIki.png', fullPage: true});

  // ---------------------
  await context.close();

  await browser.close();
})();


