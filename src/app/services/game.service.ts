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

  public getGamesLessThanPrice(price:any)
  {
    return this._http.get(`${baseUrl}/games/random/price-less-than/${price}`)
  }

  public getGamesOfCategory(category:String){
    return this._http.get(`${baseUrl}/games/category/${category}`)
  }

  public isGameInCart(userId:any,gameId:any){
    return this._http.get(`${baseUrl}/users/game/cart/${userId}/${gameId}`)
  }

  public isGameOwned(userId:any,gameId:any){
    return this._http.get(`${baseUrl}/users/game/owned/${userId}/${gameId}`)
  }

  public addToCart(userId:any,gameId:any){
    return this._http.put(`${baseUrl}/users/addtocart/${userId}/${gameId}`,userId);
  }

  public removeFromCart(userId:any,gameId:any){
    return this._http.delete(`${baseUrl}/users/removefromcart/${userId}/${gameId}`)
  }

  public createTransaction(amount:any){
    return this._http.get(`${baseUrl}/users/createTransaction/${amount}`)
  }

  public purchaseGame(userId:any,gameId:any){
    return this._http.put(`${baseUrl}/users/purchasegame/${userId}/${gameId}`,userId)
  }
  
  public searchGame(gamename:any){
    return this._http.get(`${baseUrl}/games/search/${gamename}`)
  }

  public buyGift(data:any){
    return this._http.post(`${baseUrl}/gift/buy`,data);
  }

  public redeemGift(code:String,userId:String){
    return this._http.get(`${baseUrl}/gift/redeem/${code}/${userId}`);
  }

  public getUserCodes(userId:String){
    return this._http.get(`${baseUrl}/gift/codes/${userId}`);
  }



}
