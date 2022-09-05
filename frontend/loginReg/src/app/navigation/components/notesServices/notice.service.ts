import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginRegService} from '../services/login-reg.service';
import {Observable} from 'rxjs';
import {constants} from '../common/constant/const';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  token: any;
  id: any;
  apiURL: any;
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

  noteInfo(): Observable<any> {
    this.apiURL = constants.urls.note + this.id + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'token ' + this.token
      })
    };
    return this.http.get(this.apiURL, httpOptions);
  }

  addNote(data): Observable<any> {
    this.apiURL = constants.urls.note + this.id + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'token ' + this.token
      })
    };
    return this.http.post(this.apiURL, data, httpOptions);
  }
  saveNote(data): Observable<any> {
    this.apiURL = constants.urls.note + this.id + '/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'token ' + this.token
      })
    };
    return this.http.patch(this.apiURL, data, httpOptions);
  }
}
