import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/models/produit.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ProductState } from 'src/app/shared/states/product-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @Select(ProductState.getNbProducts) nbProduit: Observable<Produit[]> | undefined;

  ngOnInit(): void {
  }

  get authStatus() {
    return this.authService.isAuth;
  }

  signOut() {
    this.authService.signOut();
  }
}
