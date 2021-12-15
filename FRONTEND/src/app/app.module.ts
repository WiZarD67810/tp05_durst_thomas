import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './page/common/header/header.component';
import { FooterComponent } from './page/common/footer/footer.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProduitsComponent } from './page/produits/produits.component';
import { ProduitComponent } from './page/produit/produit.component';
import { FilterPipe } from './pipe/filter.pipe';
import { FilterTypePipe } from './pipe/filter-type.pipe';
import { NgxsModule } from '@ngxs/store';
import { ProductState } from './shared/states/product-state';
import { environment } from 'src/environments/environment';
import { AdresseState } from './shared/states/adresse-state';
import { ApiHttpInterceptor } from './api/api-http-interceptor';

const appRoutes: Routes = [
  {
    path: "page",
    loadChildren: () => import('./page/page.module').then((m) => m.PageModule),
  },
  {
    path: "",
    component: ProduitsComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    ProduitsComponent,
    ProduitComponent,
    FilterPipe,
    FilterTypePipe,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([ProductState], { developmentMode: !environment.production }),
    NgxsModule.forRoot([AdresseState], { developmentMode: !environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
