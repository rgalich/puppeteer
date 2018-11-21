import { PuppeteerService } from './../puppeteer/puppeteer.service';
import { Injectable } from '@nestjs/common';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InvestirService {

    constructor(private puppeteerService: PuppeteerService) {}

    async onModuleInit() {
        const browser =  await this.puppeteerService.launchBrowser();
        await this.puppeteerService.createPage(browser, 'https://investir.lesechos.fr/cours/action-pixium-vision,xpar,pix,fr0011950641,isin.html');

        timer(0, 10000).pipe(
            tap(_ => this.initStockSheet()),
        ).toPromise();
    }

    stockSheets = [];

    async getTitle(page) {
        const result = await page.evaluate(() => {
            const title = (document.getElementsByClassName('h1-like')[0] as HTMLElement).innerText;
            return title ;
        });

        return result;
    }

    async getPrice(page) {
        const result = await page.evaluate(() => {
            const price = (document.querySelector('[data-field="valorisationHeaderFiche"]') as HTMLElement).innerText;
            return price;
        });

        return  result;
    }

    async getPriceVariation(page) {
        const result = await page.evaluate(() => {
            const price = (document.querySelector('[data-field="variationHeaderFiche"]') as HTMLElement).innerText;
            return price;
        });

        return result;
    }

    async initStockSheet() {
        this.puppeteerService.pages.forEach(async page => {
            const title = await this.getTitle(page);
            const price =  await this.getPrice(page);
            const priceVariation = await this.getPriceVariation(page);

            const json = { title, price, priceVariation };
            const index = this.stockSheets.findIndex(e => e.title === title);
            if (index !== -1) {
                this.stockSheets.splice(index, 1, json);
            } else {
                this.stockSheets.push(json);
            }
        });
    }
}
