import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class APILoginService {

  URL_API_LOGIN: string = "/api/login" as const;
  URL_API_AUTH: string = "/api/auth" as const;

  constructor(private http: HttpClient) { }

  getLogin(login: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.URL_API_AUTH + "/" + login);
  }

  postLogin(login: string, password: string): Observable<Utilisateur> {
    
    let data: String = "login=" + login + "&pass=" + password;
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return this.http.post<Utilisateur>(this.URL_API_LOGIN, data, httpOption);
  }
}
