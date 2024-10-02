import { Injectable } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import { CalculatorService } from './calc.service';

@Injectable()
export class BotService {
  private bot: Telegraf<Context>;

  constructor(private readonly calculatorService: CalculatorService) {
    this.bot = new Telegraf<Context>('7687046219:AAGphZSxlGsFbQ4xWOy0Ty75uI9ELGOxF28');

    this.bot.start((ctx) => ctx.reply('Добро пожаловать! Введите начальный и конечный MMR в формате: /calc стартовыйММР-конечныйММР'));

    this.bot.command('calc', async (ctx) => {
      const message = ctx.message.text;
      const args = message.split(' ');

      if (args.length !== 2) {
        return ctx.reply('Введите начальный и конечный MMR в формате: /calc стартовыйММР-конечныйММР');
      }

      const mmrRange = args[1].split('-');
      if (mmrRange.length !== 2) {
        return ctx.reply('Пожалуйста, укажите начальный и конечный MMR в формате: стартовыйММР-конечныйММР');
      }

      const startMMR = parseInt(mmrRange[0]);
      const endMMR = parseInt(mmrRange[1]);

      if (isNaN(startMMR) || isNaN(endMMR)) {
        return ctx.reply('Пожалуйста, укажите корректные значения для MMR.');
      }

      try {
        const price = this.calculatorService.calculatePrice(startMMR, endMMR);
        ctx.reply(`Стоимость повышения с ${startMMR} до ${endMMR} MMR составит ${price} рублей.`);
      } catch (error) {
        ctx.reply('Ошибка: ' + error.message);
      }
    });

    this.bot.launch(); 
  }
}
