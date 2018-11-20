import { InvestirService } from './investir.service';
import { Controller, Get } from '@nestjs/common';

@Controller('investir')
export class InvestirController {

    constructor(private investirService: InvestirService) {}

    @Get('')
    async findAll() {
        return this.investirService.stockSheets;
    }

}
