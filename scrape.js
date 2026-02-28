const { chromium } = require('playwright');

async function scrape(url) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const numbers = await page.$$eval("td", cells =>
        cells.map(c => parseFloat(c.innerText)).filter(n => !isNaN(n))
    );

    await browser.close();
    return numbers.reduce((a, b) => a + b, 0);
}

(async () => {
    const seeds = [78,79,80,81,82,83,84,85,86,87];
    let total = 0;

    for (const s of seeds) {
        const url = `https://sanand0.github.io/tdsdata/qa_table_seed_${s}.html`;
        const sum = await scrape(url);
        console.log(`Seed ${s} sum = ${sum}`);
        total += sum;
    }

    console.log("FINAL TOTAL =", total);
})();
