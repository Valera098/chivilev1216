import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(products: { category: number }[], category: number): any[] {
    return products.filter((product) => product.category == category);
  }
}