import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddProduct } from "../actions/addproduct.actions";
import { DeleteProduct } from "../actions/deleteproduct.actions";
import { ProductStateModel } from "./product-state-models";

@State<ProductStateModel>({
    name: "product",
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
    static getProductList(state: ProductStateModel) {
        return state.products;
    }

    @Action(AddProduct)
    add({ getState, patchState }: StateContext<ProductStateModel>, { product }: AddProduct){
        const state = getState();
        patchState({
            products: [...state.products, product],
        });
    }

    @Action(DeleteProduct)
    remove({ getState, patchState }: StateContext<ProductStateModel>, { product }: DeleteProduct){
        const state = getState();
        patchState({
            products: state.products.filter(
                item => item.Reference !== product.Reference
            )
        });      
    }
}