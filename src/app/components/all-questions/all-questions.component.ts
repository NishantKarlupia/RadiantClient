import { Component } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrl: './all-questions.component.css'
})
export class AllQuestionsComponent {

  constructor(private _questionService:QuestionService, private _router:Router, private _toast:ToastrService,private _login:LoginService){}

  questionsData:any;


  ngOnInit(){

    this._questionService.getAllQuestions().subscribe(
      (data:any)=>{
        this.questionsData=data;
        // console.log(this.questionsData)
      },
      (error)=>{}
    )
  }

  askQuestion(){

    if(this._login.getUser()==null){
      this._toast.info("login required","",{
        progressBar:true,
        closeButton:true,
        timeOut:2000
      })
      return
    }
    this._router.navigate(["/askquestion"])

  }


}
