const puppeteer = require('puppeteer');
const fs = require('fs');
puppeteer.launch({
    headless: false
}).then(async (browser) => {
    const page = await browser.newPage();
    await page.goto('https://d.ishadowx.com/', {
        waitUntil: 'networkidle0'
    });
    const url = await page.$eval('#portfolio > div.container > div:nth-child(2)', (ele) => {
        const btns = ele.querySelectorAll('.v2 .copybtn');
        const urlsv2 = Array.from(btns).map((btn) => {
            return btn.dataset.clipboardText;
        });
        return btoa(urlsv2.join('\n'));
    });
    fs.writeFileSync('dist/urllist.txt', url);
});