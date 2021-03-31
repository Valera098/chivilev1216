import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/category.model';
import { ProductsDatabase } from '../services/products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
})
export class AddProductComponent {
  name: string = '';
  vendor: string = '';
  price: number = 0;
  manufacturer: string = '';
  date: any = '';
  category: number = 1;
  products: Product[] = [];
  newProduct: any = {};
  constructor(private productsDatabase: ProductsDatabase, private router: Router) {}

  addForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    vendor: new FormControl('', [Validators.required, Validators.minLength(1)]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    manufacturer: new FormControl('', [Validators.required,Validators.minLength(1)]),
    weight: new FormControl('', [Validators.required, Validators.min(0)]),
    amount: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl(1, [Validators.required]),
  });
  addProduct() {
    let id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 0;
    // console.log(new Date(this.addForm.value.date).toJSON());
    // console.log(this.products);
    this.newProduct = {
      id: id,
      name: this.addForm.value.name,
      vendor: this.addForm.value.vendor,
      price: +this.addForm.value.price,
      manufacturer: this.addForm.value.manufacturer,
      weight: +this.addForm.value.weight,
      amount: +this.addForm.value.amount,
      category: +this.addForm.value.category
    };
    this.products.push(this.newProduct);
    this.postNewProduct(this.newProduct);
    this.addForm.reset();
  }

  async getData() {
    try {
      this.products = await this.productsDatabase.getAll();
    } catch (err) {
      console.log(err);
    }
  }
  async postNewProduct(product: Product) {
    try {
      await this.productsDatabase.postOne(product);
    } catch (err) {
      console.log(err);
    }
  }
}

