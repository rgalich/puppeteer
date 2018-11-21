import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {

    pages = [];

    async launchBrowser() {
        return await puppeteer.launch({ headless: true,
            slowMo: 300,
            args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    }

    async createPage(browser: any, url: string) {
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(url);
        this.pages.push(page);
    }
}
