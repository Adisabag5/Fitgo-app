import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from './user.model';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';





export interface AuthResponseData {
  idToken: string;
  email: string;
  refresgToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
 

  get userIsAuthenticated(){
    console.log('userIsAuthenticated')
    return this._user.asObservable().pipe(
      map(user => {
        if(user){
          return !!user.token;
        }
        else {
          return false;
        }
      })
    );
  }

  get userId(){
    console.log('userId')
    return this._user.asObservable().pipe
      (map(user => {
        if(user){
          return user.id;
        }
        else {
          return null;
        }
      })
    );
  }

  constructor(
    private http: HttpClient,
    private router: Router,

    private fireModule: AngularFireModule,
    //private fireAouth: AngularFireAuth,
    private firestore: AngularFirestoreModule,

   

    ) { }

    

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
       {email:email, password:password, returnSecureToken:true}

        );
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
       {email:email, password:password, returnSecureToken:true}
       );
       

  }

  logout(){
    this._user.next(null);
  }
}



/*
signup:

return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
       {email:email, password:password, returnSecureToken:true}
       );



login: 

return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
       {email:email, password:password, returnSecureToken:true}
       );

*/