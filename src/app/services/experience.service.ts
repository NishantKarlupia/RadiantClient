import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './globalConfig';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private _http:HttpClient) { }


  public addExperience(data:any){
    return this._http.post(`${baseUrl}/experience/`,data);
  }

  public getAllExperiences(){
    return this._http.get(`${baseUrl}/experience/`)
  }


}
