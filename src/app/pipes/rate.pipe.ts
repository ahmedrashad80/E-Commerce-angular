import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rate',
})
export class RatePipe implements PipeTransform {
  transform(value: number, rating: number): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.4;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('full');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }

    return stars;
  }
}
