const puppeteer = require('puppeteer')
const PUPPETEER_CONFIG = require('./puppeteer')


async function createBrowser() {
  const browser = await puppeteer.launch(PUPPETEER_CONFIG.launch);
  const pages = await browser.pages();
  const page = pages[0];
  await page.setViewport(PUPPETEER_CONFIG.viewport);
  page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
  return {
    page,
    browser,
  };
}

async function start() {
  const {browser, page} = await createBrowser()
  
  await browser.close()
}


start()
