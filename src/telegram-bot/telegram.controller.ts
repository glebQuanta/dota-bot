import { Controller, Post, Body } from '@nestjs/common';
import { CalculatorService } from './calc.service';

@Controller('bot')
export class BotController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post('calculate')
  calculate(@Body('startMMR') startMMR: number, @Body('endMMR') endMMR: number): number {
    return this.calculatorService.calculatePrice(startMMR, endMMR);
  }
}
