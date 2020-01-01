const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height:720 });
  await page.goto('https://www.opendota.com/records?fbclid=IwAR2iUap3TRP9O8KPb-deLArhU4-QplY-xojBFtW3inEfR_Yd_qInhZDv6EE', { waitUntil: 'networkidle2' });
  await page.screenshot({path: 'dota2.png'});

  const articles = await page.evaluate(() => {
    let titleLinks = document.querySelectorAll('tr td a');
    titleLinks = [...titleLinks];
    let articles = titleLinks.map(link => ({
        match: link.getAttribute('href').replace('/matches/', '')
    }));
    return articles;
});

console.log(articles);

  await browser.close();
})();