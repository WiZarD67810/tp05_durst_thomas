import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AddAdresse } from 'src/app/shared/actions/addadresse.actions';
import { DeleteAdresse } from 'src/app/shared/actions/deleteadresse.actions';
import { AdresseState } from 'src/app/shared/states/adresse-state';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  @Select(AdresseState.getAdressesList) AdressesList: Observable<string[]> | undefined;

  authInForm: FormGroup = new FormGroup({});;

  constructor(private store: Store, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.authInForm = this.formBuilder.group({
      adresse: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9 ]{1,}/)]],
    });
  }

  onSubmit() {
    const adresse: string = this.authInForm.get('adresse')?.value;

    this.store.dispatch(new AddAdresse(adresse));
  }

  deleteAdresse(adresse: string){
    this.store.dispatch(new  DeleteAdresse(adresse));
  }

  get User() {
    return this.authService.user;
  }
}
