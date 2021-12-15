import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductInfoComponent } from './product-info/product-info.component';
import { AuthGuard } from '../guard/auth.guard';
import { AuthentificationComponent } from './authentification/authentification.component';
import { CartComponent } from './cart/cart/cart.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ProductState } from '../shared/states/product-state';
import { FilterTypePipe } from '../pipe/filter-type.pipe';
import { FilterPipe } from '../pipe/filter.pipe';
import { PhonePipe } from '../pipe/phone.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProduitCartComponent } from './produit-cart/produit-cart.component';
import { ConnexionComponent } from './authentification/connexion/connexion/connexion.component';
import { ProfilComponent } from './authentification/profil/profil.component';

const appChild: Routes = [
  {
    path: "Information",
    canActivate: [AuthGuard],
    component: UserProfilComponent
  },
  {
    path: "Authentification",
    component: AuthentificationComponent
  },
  {
    path: "Product/:ref",
    component: ProductInfoComponent
  },
  {
    path: "Panier",
    component: CartComponent
  },
  {
    path: "Connexion",
    component: ConnexionComponent
  },
  {
    path: "Profil",
    component: ProfilComponent
  }
]

@NgModule({
  declarations: [
    AuthentificationComponent,
    UserProfilComponent,
    ProductInfoComponent,
    PhonePipe,
    CartComponent,
    ProduitCartComponent,
    ConnexionComponent,
    ProfilComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appChild),
    ReactiveFormsModule,
    NgxsModule.forFeature([ProductState])
  ]
})
export class PageModule { }
