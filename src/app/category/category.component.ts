import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/category.model';
import { ProductsDatabase } from '../services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  category: number = 1;
  products: Product[] = [];
  sortType = 'higherPrice';
  instruments: boolean = false;
  searchStr: string = '';
  constructor(
    private activatedRouter: ActivatedRoute,
    private productsDatabase: ProductsDatabase
  ) {
    this.activatedRouter.params.subscribe((param) => {
      this.category = param.category;
    });
  }
  ngOnInit(): void {
    this.getData();
  }

  sortForm: FormGroup = new FormGroup({
    sortType: new FormControl(1),
  });
  currentInstrument() {
    let sortFor ;
    this.sortType = this.sortForm.value.sortType
    switch (this.sortType) {
      case 'higherPrice':
        sortFor = 'по возрастанию цены';
        break;
      case 'lowerPrice':
        sortFor = 'по убыванию цены';
        break;
      case 'higherAmount':
        sortFor = 'по возрастанию кол-ва';
        break;
      case 'lowerAmount':
        sortFor = 'по убыванию кол-ва';
        break;
    }
    return sortFor;
  }

  async deleteThisProduct(id: number) {
    await this.deleteProduct(id);
    await this.getData();
  }
  async editThisProduct(product: Product) {
    if (product.edit) {
      product.edit = false;
      await this.editProduct(product.id, product);
      await this.getData();
    } else {
      product.edit = true;
    }
  }
  async getData() {
    this.products = await this.productsDatabase.getAll();
  }
  async deleteProduct(id: number) {
    try {
      await this.productsDatabase.deleteOneById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async editProduct(id: number, product: Product) {
    try {
      await this.productsDatabase.putOneById(id, product);
    } catch (err) {
      console.log(err);
    }
  }

  increaseProductAmount(product: Product): void {
      product.amount++;
      this.editProduct(product.id, product);
  }
  decreaseProductAmount(product: Product): void {
    if (product.amount > 0){
      product.amount--;
      this.editProduct(product.id, product);
    }
  }

}
