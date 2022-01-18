import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ProductStateModel } from "./productStateModel";
import { AddProduct, DelProduct } from "./productAction";

@State<ProductStateModel>({
    name: 'products',
    defaults: {
      products: [],
    },
  })
  @Injectable()
  export class ProductState {
    @Selector()
    static getNbProducts(state: ProductStateModel) {
      return state.products.length;
    }
    @Selector()
    static getListProducts(state: ProductStateModel) {
      return state.products;
    }
  
    @Action(AddProduct)
    add(
      { getState, patchState }: StateContext<ProductStateModel>,
      { payload }: AddProduct
    ) {
      const state = getState();
      patchState({
        products: [...state.products, payload],
      });
    }
    
    @Action(DelProduct)
    del(
      { getState, patchState }: StateContext<ProductStateModel>,
      { payload }: DelProduct
    ) {
      const state = getState();
      patchState({
        products: state.products.filter((product)=>{product.id != payload.id}),
      });
    }
  }