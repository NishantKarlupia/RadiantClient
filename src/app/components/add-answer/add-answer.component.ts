import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoginService } from '../../services/login.service';
import { QuestionService } from '../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrl: './add-answer.component.css'
})
export class AddAnswerComponent {

  constructor(private _route:ActivatedRoute,private _router:Router,private _login:LoginService,private _question:QuestionService,private _snack:MatSnackBar){}

  public Editor = ClassicEditor;


  answerData:any={
    user:{},
    question:{
      quesId:""
    },
    answer:""
  }

  loggedUser:any;



  ngOnInit(){

    let quesId=this._route.snapshot.params["quesId"]
    // console.log(quesId)

    this.loggedUser=this._login.getUser()
    if(this.loggedUser==null){
      this._router.navigate(["/login"])
      return
    }

    this.answerData.user=this.loggedUser
    this.answerData.question.quesId=quesId

  }


  submitAnswer(){
    // console.log(this.answerData)

    if(this.answerData.answer.trim()==""){

      this._snack.open("answer can't be empty!!!","",{duration:2000})
      return

    }

    this._question.addAnswer(this.answerData).subscribe(
      (data)=>{
        console.log(data)
      },
      (error)=>{
        console.log(error)
      }
    )

  }



}
