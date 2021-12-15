import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Produit } from 'src/app/models/produit.model';
import { DeleteProduct } from 'src/app/shared/actions/deleteproduct.actions';

@Component({
  selector: 'app-produit-cart',
  templateUrl: './produit-cart.component.html',
  styleUrls: ['./produit-cart.component.css']
})
export class ProduitCartComponent implements OnInit {

  @Input()
  Produit: Produit = new Produit("", "", 0);
  
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  deleteProduct() {
    this.store.dispatch(new DeleteProduct(this.Produit));
  }

}
