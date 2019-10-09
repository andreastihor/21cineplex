module.exports = {
  launch: {
    headless: false,
    slowMo: 50,
    args: [
      '--no-sandbox',
      '--disable-web-security',
      '--disable-features=site-per-process',
      '--ignore-certificate-errors',
      '--incognito',
    ]
  },
  viewport: {
    width: 1400,
    height: 750,
  }
};
