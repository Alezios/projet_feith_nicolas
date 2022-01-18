import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MonservService {
    products!: Observable<Array<Product>>;
    productsNotObs!: Array<Product>;

    constructor(private httpClient: HttpClient) {}

    public getCatalogue(): Observable<Array<Product>> {
        this.products = this.httpClient.get<Array<Product>>("assets/products.json");
        this.products.subscribe(
            productsNotObs => this.productsNotObs = productsNotObs
        );

        return this.products;
    }

    public getCatalogueNotObs() : Array<Product> {
        return this.productsNotObs;
      }
}
