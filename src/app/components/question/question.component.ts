import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {

  constructor(private _route:ActivatedRoute,private _quesService:QuestionService,private _login:LoginService,private _snack:MatSnackBar,private _router:Router,private _toast:ToastrService){}

  questionData:any={
    title:"",
    description:"",
    images:[],
    user:{}
  }

  answersData:any;

  quesId:any;
  sameUser=false;
  loggedUser:any;

  ngOnInit(){
    this.quesId=this._route.snapshot.params["quesId"]

    this._quesService.getQuestionById(this.quesId).subscribe(
      (data:any)=>{
        this.questionData=data
        // console.log(this.questionData)

        this.loggedUser=this._login.getUser()
        if(this.loggedUser!=null){
          // console.log(loggedUser)
          if(this.loggedUser.uid==this.questionData.user.uid){this.sameUser=true}
        }

      },
      (error)=>{
        console.log(error)
      }
    )

    this._quesService.getAnswersOfQuestion(this.quesId).subscribe(
      (data:any)=>{
        this.answersData=data
        // console.log(this.answersData)
      },
      (error)=>{
        console.log(error)
      }
    )


    // console.log(quesId)
  }

  deleteQuestion(quesId:any){
    // console.log(quesId)
    Swal.fire({
      title:"Delete Question?",
      text:"Are you sure to delete this question?",
      icon:"question",
      showCancelButton:true
    }).then((result)=>{

      if(result.isConfirmed){

        this._quesService.deleteQuestion(quesId).subscribe(
          (data)=>{
            Swal.fire({
              title: "Deleted!",
              text: "Your question has been deleted.",
              icon: "success"
            });
            this._router.navigate(["/questions"])
          },
          (error)=>{
            this._snack.open("Internal Server Error","",{duration:2000})
          }
        )

        
      }
      else{
      }
    })

  }


  likeAnswer(ansId:any){

    
    

    this._quesService.likeAnswer(ansId).subscribe(
      (data)=>{
        this._toast.info("you liked this answer","",{
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

  dislikeAnswer(ansId:any){

    
    this._quesService.dislikeAnswer(ansId).subscribe(
      (data)=>{
        this._toast.info("you disliked this answer","",{
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
