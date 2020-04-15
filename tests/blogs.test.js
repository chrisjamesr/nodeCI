const puppeteer = require('puppeteer');
const Page = require('./helpers/page');

let page;


beforeEach( async ()=> {
    page = await Page.build();
    await page.goto('localhost:3000');
});

afterEach( async () => {
    await page.close() 
});

describe('When logged in', async () => {
    beforeEach(async ()=> {
        await page.login();
        await page.click('a.btn-floating');
    });

    test('Can see blog create form', async () => {
        const label = await page.getContentsOf('form label');
        expect(label).toEqual('Blog Title');
    });

    describe('And using valid form inputs', async () => {
        beforeEach(async () => {
            await page.type('div.title input', 'Blog Test Title');
            await page.type('div.content input', 'Blog Test Content');
            await page.click('form button');
        });

        test('Submitting takes user to review screen', async () => {
            const headerText = await page.getContentsOf('form h5');

            expect(headerText).toEqual('Please confirm your entries');
        })
        
        test('Submitting and saving adds blog to index page', async () => {
            await page.click('button.green');
            
        });
    });

    describe('And using invalid inputs', async () => {
        beforeEach(async () => {
            await page.click('form button');
        });

        test('the form shows an error message', async () => {
            const titleError = await page.getContentsOf('.title .red-text');
            const contentError = await page.getContentsOf('.content .red-text');

            expect(titleError).toEqual('You must provide a value');
            expect(contentError).toEqual('You must provide a value');
        });
    });
    
})