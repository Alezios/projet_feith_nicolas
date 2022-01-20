import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MonservService {
    products!: Observable<Array<Product>>;
    productsNotObs!: Array<Product>;

    constructor(private httpClient: HttpClient) {}

    public getCatalogue(): Observable<Array<Product>> {
        this.products = this.httpClient.get<Array<Product>>(environment.apiUrl + 'products/');

        return this.products;
    }

    public getProductDetail(id: string): Observable<Product> {
        return this.httpClient.get<Product>(environment.apiUrl + 'products/'+ id);
    }
}
