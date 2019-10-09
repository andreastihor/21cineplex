const puppeteer = require('puppeteer')
const PUPPETEER_CONFIG = require('./puppeteer')

//create browser and page
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

//get cinema list on jakarta and the links
async function getAllJakartaTheater(page) {
  await page.goto('https://21cineplex.com/theaters/daftar-bioskop-21-di-jakarta,3.htm')
  await page.waitFor('.tg-c3ow a')
  return await page.evaluate(() => {
    const $cinemas = document.querySelectorAll('.tg-c3ow a')
    const cinemas = {}
    for(let i = 0, j = $cinemas.length; i<j; i++) {
      cinemas[$cinemas[i].text] = $cinemas[i].href
    }
    return cinemas
  })
}

async function start() {
  const {browser, page} = await createBrowser()
  const cinemaList = await getAllJakartaTheater(page);
  await browser.close()
  return cinemaList

}


module.export = start
