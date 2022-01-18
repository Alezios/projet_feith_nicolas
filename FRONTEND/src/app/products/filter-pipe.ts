import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../product";

@Pipe({
    name: 'myfilter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: Product[], filter: Product): any {
        if (!items || !filter) {
            return items;
        }
        // @ts-ignore
        return items.filter((item): item is Produit => item !== undefined && item?.name.indexOf(filter?.name) !== -1);
    }
}
