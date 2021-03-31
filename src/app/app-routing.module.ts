import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { InformationComponent } from './information/information.component';
import { AddProductComponent } from './addproduct/addproduct.component';

const routes: Routes = [
  {
    path: '',
    component: InformationComponent,
  },
  {
    path: 'category/:category',
    component: CategoryComponent,
  },
  {
    path: 'addProduct',
    component: AddProductComponent,
  },
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
