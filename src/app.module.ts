import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PuppeteerModule } from './puppeteer/puppeteer.module';
import { InvestirModule } from './investir/investir.module';

@Module({
  imports: [PuppeteerModule, InvestirModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
