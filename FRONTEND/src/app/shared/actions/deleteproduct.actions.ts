import { Produit } from "src/app/models/produit.model";

export class DeleteProduct {
    static readonly type = "[Cart] Delete Product";

    constructor(public product: Produit) { }
}