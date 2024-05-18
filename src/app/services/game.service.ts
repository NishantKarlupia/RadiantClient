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

  public getGameByName(gname:any){
    return this._http.get(`${baseUrl}/games/game/${gname}`)
  }

  public getRandomGames(){
    return this._http.get(`${baseUrl}/games/random`)
  }

  public getRandomGamesWithDiscount(){
    return this._http.get(`${baseUrl}/games/random/discount`)
  }

}
