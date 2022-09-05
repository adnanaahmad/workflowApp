import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { LoginRegService} from '../services/login-reg.service';
import {constants} from '../common/constant/const';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  httpOptions: any;
  apiURL: any;
  token: any;
  userId: any;
  private currentTask = new BehaviorSubject<any>(0);
  clickedTask = this.currentTask.asObservable();
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
      this.userId = res;
      if (res === 0) {
        this.userId = localStorage.getItem('id');
      }
    });
  }

  boardInfo(): Observable<any> {
    this.apiURL = constants.urls.board + this.userId + '/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'token ' + this.token
      })
    };
    return this.http.get(this.apiURL, this.httpOptions);
  }
  saveBoard(data): Observable<any> {
    this.apiURL = constants.urls.board + this.userId + '/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'token ' + this.token
      })
    };
    return this.http.patch(this.apiURL, data, this.httpOptions);
  }
  Logout(): Observable<any> {
    this.apiURL  = constants.urls.logout;
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'token ' + this.token
      })
    };
    return this.http.post(this.apiURL, '', this.httpOptions);
  }
  AddTask(data): Observable<any> {
    this.apiURL = constants.urls.board + this.userId + '/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'token ' + this.token
      })
    };
    return this.http.post(this.apiURL, data, this.httpOptions);
  }
  UpdateCurrentTask(data: any) {
    this.currentTask.next(data);
  }
  EditTask(data): Observable<any> {
    this.apiURL = constants.urls.editTask;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'token ' + this.token
      })
    };
    return this.http.patch(this.apiURL, data, this.httpOptions);
  }
  DeleteTask(data): Observable<any> {
    this.apiURL =  constants.urls.board + this.userId + '/';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'token ' + this.token
      })
    };
    return this.http.put(this.apiURL, data, this.httpOptions);
  }
}
