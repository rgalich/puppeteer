import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersGateway } from './users.gateway';
import { PuppeteerModule } from './puppeteer/puppeteer.module';
import { InvestirModule } from './investir/investir.module';

@Module({
  imports: [PuppeteerModule, InvestirModule],
  controllers: [AppController],
  providers: [AppService, UsersGateway],
})
export class AppModule {}
