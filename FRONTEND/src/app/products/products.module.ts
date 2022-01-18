import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductState } from '../productState';
import { NgxsModule } from '@ngxs/store';
import {FilterPipe} from "./filter-pipe";
import { BasketComponent } from './basket/basket.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const childRoutes: Routes = [
  {
    path: 'catalogue',
    component: CatalogueComponent
  },
  {
    path: 'basket',
    component: BasketComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  }
];

@NgModule({
  declarations: [
    CatalogueComponent,
    FilterPipe,
    BasketComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes),
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forFeature([ProductState])
  ]
})
export class ProductsModule { }
