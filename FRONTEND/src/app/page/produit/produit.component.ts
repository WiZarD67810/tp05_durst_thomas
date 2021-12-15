import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Produit } from 'src/app/models/produit.model';
import { AddProduct } from 'src/app/shared/actions/addproduct.actions';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  @Input()
  Produit: Produit = new Produit("", "", 0);

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

  addProduct() {
    this.store.dispatch(new AddProduct(this.Produit));
  }
}
