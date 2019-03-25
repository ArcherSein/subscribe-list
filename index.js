const puppeteer = require('puppeteer');
const fs = require('fs');
puppeteer.launch({
    headless: true
}).then(async (browser) => {
    try {
        const page = await browser.newPage();
        await page.goto('https://d.ishadowx.com/', {
            waitUntil: 'networkidle0'
        });
        await page.click('#header .page-scroll');
        await page.waitForSelector('.v2', {
            visible: true
        });
        const url = await page.$eval('.portfolio-items', (ele) => {
            const btns = ele.querySelectorAll('.v2 .copybtn');
            const urlsv2 = Array.from(btns).map((btn) => {
                return btn.dataset.clipboardText;
            });
            return btoa(urlsv2.join('\n'));
        });
        fs.writeFileSync('dist/urllist.txt', url);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}, (e) => {
    console.error(e);
    process.exit(1);
});