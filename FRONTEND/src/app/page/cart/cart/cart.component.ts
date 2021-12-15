import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/models/produit.model';
import { ProductState } from 'src/app/shared/states/product-state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Select(ProductState.getProductList) productsList: Observable<Produit[]> | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }
}
