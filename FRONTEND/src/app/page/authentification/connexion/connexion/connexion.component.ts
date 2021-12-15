import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APILoginService } from 'src/app/service/api/APILogin/apilogin.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  authInForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router, private api: APILoginService) { }

  ngOnInit(): void {
    this.authInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]{1,}/)]],
      password: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]{1,}/)]]
    });
  }

  onSubmit() {
    const username = this.authInForm.get('username')?.value;
    const password = this.authInForm.get('password')?.value;

    this.api.postLogin(username, password).subscribe(
      (data) => {
        console.log(data);
        
        this.authService.isAuth = true;

        this.route.navigate(["/page/Profil"]);
      },
      (error) => {
        console.error(error);
        this.authService.isAuth = false;
        this.route.navigate(["/page/Authentification"]);
      }
    );
  }
}
