import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AddAdresse } from 'src/app/shared/actions/addadresse.actions';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  authInForm: FormGroup = new FormGroup({});

  constructor(private store: Store, private formBuilder: FormBuilder, private authService: AuthService, private route: Router) {  }

  ngOnInit(): void {
    this.authInForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]{1,}/)]],
      forName: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]{1,}/)]],
      civility: ['', [Validators.required]],
      adresse: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9 ]{1,}/)]],
      cityCode: ['', [Validators.required, Validators.pattern(/[0-9]{5}/)]],
      country: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9 ]{1,}/)]],
      city: ['', [Validators.required, Validators.pattern(/[a-zA-Z]{1,}/)]],
      mail: ['', [Validators.required, Validators.pattern(/[a-zA-Z\.0-9]+@+[a-z]+.+[a-z]/)]],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]{10}/)]],
      username: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{1,}/)]],
      password: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,}/)]],
      password2: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]{6,}/)]]
    }, {
      validator: this.checkIfPasswordIsGood('password', 'password2')
    });
  }

  get AuthStatus(){
    return this.authService.isAuth;
  }

  onSubmit() {
    const lastName = this.authInForm.get('lastName')?.value;
    const forName = this.authInForm.get('forName')?.value;
    const civility = this.authInForm.get('civility')?.value == 1 ? "Mr" : "Mme";
    const adresse = this.authInForm.get('adresse')?.value;
    const cityCode = this.authInForm.get('cityCode')?.value;
    const country = this.authInForm.get('country')?.value;
    const city = this.authInForm.get('city')?.value;
    const mail = this.authInForm.get('mail')?.value;
    const phone = this.authInForm.get('phone')?.value;
    const username = this.authInForm.get('username')?.value;
    const password = this.authInForm.get('password')?.value;
    this.store.dispatch(new AddAdresse(adresse));
    this.authService.signIn(lastName, forName, civility, adresse, cityCode, city, country, mail, phone, username, password)
    this.route.navigate(["/page/Information"]);
  }

  checkIfPasswordIsGood(pass: string, confirm: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[pass];
      const machingControl = formGroup.controls[confirm];

      if(machingControl.errors && !machingControl.errors.checkIfPasswordIsGood) {
        return;
      }

      if(control.value != machingControl.value) {
        machingControl.setErrors({ checkIfPasswordIsGood: true});
      } else {
        machingControl.setErrors(null);
      }
    }
  }
}
