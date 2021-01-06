import { Injectable } from '@angular/core';
import {API} from './constant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public updateIsUserLogged = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  login(data: any){
    return this.http.post(API.LOGIN, data);
  }

  profileView(){
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json; charset=utf-8");
    let token = localStorage.getItem('accessToken');
    headers = headers.append('Authorization', token);
    return this.http.get(API.PROFILE_VIEW);
  }
}
