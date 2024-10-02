import { Module } from '@nestjs/common';
import { BotController } from './telegram.controller';
import { CalculatorService } from './calc.service';
import { BotService } from './telegram.service';

@Module({
  providers: [BotService, CalculatorService],
  controllers: [BotController],
})
export class BotModule {}
