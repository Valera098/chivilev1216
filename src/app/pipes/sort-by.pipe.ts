import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(products: { id: number; amount: number, price: number }[], sortType: string): any[] {
    let product = products;
    switch (sortType) {
      case 'higherPrice':
        product = product.sort((a, b) => (a.price > b.price ? 1 : -1));
        break;
      case 'lowerPrice':
        product = product.sort((a, b) => (a.price < b.price ? 1 : -1));
        break;
      case 'higherAmount':
        product = product.sort((a, b) =>
          a.amount > b.amount ? 1 : -1
        );
        break;
      case 'lowerAmount':
        product = product.sort((a, b) =>
          a.amount < b.amount ? 1 : -1
        );
        break;
    }
    return product;
  }

}
