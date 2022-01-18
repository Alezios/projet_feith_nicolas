import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MonservService} from "../../monserv.service";
import {Observable} from "rxjs";
import {Product} from "../../product";
import { Select, Store } from '@ngxs/store';
import { AddProduct } from 'src/app/productAction';
import { ProductState } from 'src/app/productState';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
    constructor(private monservService: MonservService, private store: Store) {}

    public filter_arg: Product | undefined

    catalogue$: Observable<Array<Product>> | undefined;

    ngOnInit() {
        this.catalogue$ = this.monservService.getCatalogue();
        this.filter_arg = new Product()
    }

    addProduct(product: Product) {
      this.store.dispatch(new AddProduct(product));
    }
    
    @Select(ProductState.getNbProducts) nbBasket$! : Observable<number>;

}
