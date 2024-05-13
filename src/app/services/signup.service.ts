import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './globalConfig';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private _http:HttpClient) { }

  public isUserExistsWithUsername(username:String){
    // console.log(username)
    return this._http.get(`${baseUrl}/users/exists/username/${username}`)
  }

  public isUserExistsWithEmail(email:String){
    return this._http.get(`${baseUrl}/users/exists/email/${email}`)
  }

  public createUser(user:any)
  {
    return this._http.post(`${baseUrl}/users/createUser`,user);
  }

  public createUserWithCode(user:any,code:String){
    return this._http.post(`${baseUrl}/users/createUser/${code}`,user);
  }

}
