import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  calculatePrice(startMMR: number, endMMR: number): number {
    let totalPrice = 0;

    const priceRanges = [
      { min: 2000, max: 3000, pricePer100: 135 },
      { min: 3000, max: 3500, pricePer100: 165 },
      { min: 3500, max: 4000, pricePer100: 220 },
      { min: 4000, max: 4500, pricePer100: 275 },
      { min: 4500, max: 5000, pricePer100: 300 },
      { min: 5000, max: 5500, pricePer100: 385 },
      { min: 5500, max: 6000, pricePer100: 500 },
      { min: 6000, max: 6500, pricePer100: 550 },
      { min: 6500, max: 7000, pricePer100: 600 },
      { min: 7000, max: 7500, pricePer100: 700 },
      { min: 7500, max: 8000, pricePer100: 800 },
      { min: 8000, max: 8500, pricePer100: 900 },
      { min: 8500, max: 9000, pricePer100: 1000 },
    ];

    let currentMMR = startMMR;

    while (currentMMR < endMMR) {
      const range = priceRanges.find(
        (range) => currentMMR >= range.min && currentMMR < range.max,
      );

      if (!range) {
        throw new Error('MMR out of range');
      }

      const nextMMR = Math.min(endMMR, range.max);
      const difference = nextMMR - currentMMR;
      const price = (difference / 100) * range.pricePer100;

      totalPrice += price;
      currentMMR = nextMMR;
    }

    return totalPrice;
  }
}
