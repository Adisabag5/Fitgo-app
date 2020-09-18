import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = 'http://localhost:3000/api/fitgo';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(
    private http: HttpClient
    ) { }

  RegisretUser(username, email,password): Observable<any>{
    return this.http.post(`${BASEURL}/register`, {
      username, email, password
    });
  }
}
