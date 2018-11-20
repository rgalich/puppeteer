import { Module } from '@nestjs/common';
import { InvestirService } from './investir.service';
import { PuppeteerModule } from 'src/puppeteer/puppeteer.module';
import { InvestirController } from './investir.controller';

@Module({
  imports: [PuppeteerModule],
  providers: [InvestirService],
  controllers: [InvestirController],
})
export class InvestirModule {}
