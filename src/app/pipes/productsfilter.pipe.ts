import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
  transform(
    products: { amount: number }[],
    searchStr: string
  ): any[] {
    if (searchStr != "" && searchStr != null)
      return products.filter(
        (product) =>
          product.amount == +searchStr
      );
    return products;
  }
}

