import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoginService } from '../../services/login.service';
import { QuestionService } from '../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrl: './add-answer.component.css'
})
export class AddAnswerComponent {

  constructor(private _route:ActivatedRoute,private _router:Router,private _login:LoginService,private _question:QuestionService,private _snack:MatSnackBar,private _toast:ToastrService){}

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
        this._toast.info("answer added successfully","",{
          progressBar:false,
          closeButton:true,
          timeOut:2000
        })
      },
      (error)=>{
        this._snack.open("Internal Server Error","",{duration:2000})
      }
    )

  }



}
