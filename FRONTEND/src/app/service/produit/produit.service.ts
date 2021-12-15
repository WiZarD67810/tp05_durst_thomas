import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Produit } from 'src/app/models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private Products: Produit[] = [];

  private Product: Produit = new Produit("", "", 0);

  public Subject_Products = new Subject<Produit[]>();

  public Subject_Product = new Subject<Produit>();
  
  constructor(private http: HttpClient) { }

  emitProduct(): void {
    this.Subject_Products.next(this.Products.slice());
    this.Subject_Product.next(this.Product);
  }

  getProduct(): void {
    this.http.get<Produit[]>("../../assets/products.json").subscribe(
      (data: Produit[]) => {
        if(data) {
          this.Products = data;
          this.emitProduct();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSingleProduct(ref: string) {
    this.http.get<Produit[]>("../../assets/products.json").subscribe(
      (data: Produit[]) => {
        if(data) {
          data.find(
            (p) => {
              if(p.Reference === ref){
                this.Product = p;
              }
            }
          )
          this.emitProduct();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
