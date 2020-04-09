const puppeteer = require('puppeteer'); 
let page, browser;

beforeEach( async ()=> {
    browser = await puppeteer.launch({
        headless: false, 
    });
    page = await browser.newPage();
    await page.goto('localhost:3000');
},10000);

afterEach( async () => {
    await browser.close() 
});

test('the header has the correct text', async () => {
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    
    expect(text).toEqual('Blogster');
});   

test('clicking login link kicks off OAuth flow', async () => {
    await page.click('.right a');
    const url = await page.url()
    
    expect(url).toMatch(/accounts\.google\.com/);
});   

test('confirm ', async () => {
    // await page.click('.right a');
    // const url = await page.url()
    
    // expect(url).toMatch(/accounts\.google\.com/);
});   
 