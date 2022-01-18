import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MonservService } from 'src/app/monserv.service';
import { Product } from 'src/app/product';
import { AddProduct } from 'src/app/productAction';
import { ProductState } from 'src/app/productState';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  id : number;

  constructor(private monservService: MonservService, private store: Store, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.product = this.monservService.getCatalogueNotObs().filter(product => product.id == this.id)[0];
  }

  ngOnInit() {

  }

  addProduct(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }
  
  @Select(ProductState.getNbProducts) nbBasket$! : Observable<number>;
}
