import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './globalConfig';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public addQuestion(data:any){

    return this._http.post(`${baseUrl}/question/`,data)

  }

  public getQuestionById(quesId:any){
    return this._http.get(`${baseUrl}/question/${quesId}`)
  }

  public deleteQuestion(quesId:any){
    return this._http.delete(`${baseUrl}/question/${quesId}`)
  }

  public getAllQuestions(){
    return this._http.get(`${baseUrl}/question/`)
  }

  public addAnswer(data:any){
    return this._http.post(`${baseUrl}/answer/`,data);
  }

  public getAnswersOfQuestion(quesId:any){
    return this._http.get(`${baseUrl}/answer/question/${quesId}`)
  }


}
