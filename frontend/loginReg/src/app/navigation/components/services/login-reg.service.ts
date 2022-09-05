import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {constants} from '../common/constant/const';

@Injectable({
  providedIn: 'root'
})
export class LoginRegService {
  private authToken = new BehaviorSubject<any>(0);
  token = this.authToken.asObservable();
  private Id = new BehaviorSubject<any>(0);
  userId = this.Id.asObservable();
  authtoken: any;
  jk = constants.urls.loginPage ;

  constructor(private http: HttpClient) {
    this.token.subscribe(res => {
      this.authtoken = res;
      if (res === 1) {
        this.authtoken = localStorage.getItem('token');
      }
    });
  }

  Login(data: any): Observable<any> {
    return this.http.post(constants.urls.loginPage, data);
  }
  Register(data: any): Observable<any> {
    return this.http.post(constants.urls.register, data);
  }

  Token(data: any) {
    this.authToken.next(data);
  }
  UpdateId(data: any) {
    this.Id.next(data);
  }
}
