import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/service/produit/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  Search: string = "";
  Type: string = "";

  ProductList: Produit[] = [];
  Products: Subscription | undefined;

  constructor(private productService: ProduitService) { }

  ngOnInit(): void {
    this.Products = this.productService.Subject_Products.subscribe(
      (products: Produit[]) => {
        this.ProductList = products;
      }
    );
    this.productService.getProduct();
  }

  getWidth() : number {
    return window.innerWidth;
  }
}
