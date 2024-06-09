import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './globalConfig';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  public updatePoints(userId:any,xpoints:any){
    return this._http.put(`${baseUrl}/users/xpoints/${userId}`,xpoints);
  }

  public getUserCartItems(userId:any){
    return this._http.get(`${baseUrl}/users/getcart/${userId}`)
  }

}
