import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './globalConfig';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }

  public getAllGame(){
    return this._http.get(`${baseUrl}/games/`);
  }

  
  public getGameById(gid: any){
    return this._http.get(`${baseUrl}/games/${gid}`)
  }
  
  public addGame(gameData:any){
    return this._http.post(`${baseUrl}/games/add`,gameData)
  }

  public updateGame(gameData:any){
    return this._http.put(`${baseUrl}/games/update`,gameData)
  }

  public getAdminData(){
    return this._http.get(`${baseUrl}/users/admin-data`)
  }


}
