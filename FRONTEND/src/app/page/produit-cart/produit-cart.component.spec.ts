import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitCartComponent } from './produit-cart.component';

describe('ProduitCartComponent', () => {
  let component: ProduitCartComponent;
  let fixture: ComponentFixture<ProduitCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
