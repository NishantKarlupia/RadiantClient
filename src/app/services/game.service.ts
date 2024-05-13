import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './globalConfig';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private _http:HttpClient) { }

  public getGameById(gid:any){
    return this._http.get(`${baseUrl}/games/${gid}`)
  }

}
