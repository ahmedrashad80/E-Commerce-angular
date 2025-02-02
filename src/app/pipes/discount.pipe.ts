import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(price: number, discountPercentage: number): number {
    if (!price || !discountPercentage) {
      return price;
    }
    const discount = (price * discountPercentage) / 100;
    const finalPrice = (price - discount).toFixed(2);
    return +finalPrice;
  }
}
