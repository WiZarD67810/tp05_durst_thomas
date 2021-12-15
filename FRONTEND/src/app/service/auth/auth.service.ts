import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import * as shajs from 'sha.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = false;
  user: User = new User("", "", "", "", "", "", "", "", "", "", "");

  constructor() { }

  signIn(lastName: string, forName: string, civility: string, adresse: string, cityCode: string, city: string, country: string, mail: string, phone: string, username: string, password: string) {
    this.user = new User(lastName, forName, adresse, cityCode, city, country, phone, mail, civility, username, shajs('sha256').update(password).digest('hex'));
    this.isAuth = true;
  }

  signOut() {
    this.user = new User("", "", "", "", "", "", "", "", "", "", "");
    this.isAuth = false;
  }
}
