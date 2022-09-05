import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {constants} from '../common/constant/const';
import {LoginRegService} from '../services/login-reg.service';

@Injectable({
  providedIn: 'root'
})
export class WhiteboardService {

  apiURL: string;
  id: any;
  token: any;

  constructor(private http: HttpClient, private tokenService: LoginRegService) {
    tokenService.token.subscribe(res => {
      this.token = res;
      if (res === 0) {
        this.token = localStorage.getItem('token');
      }
    }, (error) => {
      console.log(error);
    });
    this.tokenService.userId.subscribe(res => {
      this.id = res;
      if (res === 0) {
        this.id = localStorage.getItem('id');
      }
    });
  }

  saveWhiteBoard(data): Observable<any> {
    this.apiURL = constants.urls.whiteBoard + this.id + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'token ' + this.token
      })
    };
    return this.http.post(this.apiURL, data, httpOptions);
  }

  getWhiteBoard(): Observable<any> {
    this.apiURL = constants.urls.whiteBoard + this.id + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'token ' + this.token
      })
    };
    return this.http.get(this.apiURL, httpOptions);
  }
}
