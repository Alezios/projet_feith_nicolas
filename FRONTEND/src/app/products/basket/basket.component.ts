import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ProductState } from 'src/app/productState';
import { Observable } from 'rxjs';
import { Product } from '../../product'
import { DelProduct } from '../../productAction';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  @Select(ProductState.getListProducts)
  products$!: Observable<Array<Product>>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  delProduct(product: Product) {
    this.store.dispatch(new DelProduct(product));
  }

  @Select(ProductState.getNbProducts) nbBasket$! : Observable<number>;

}