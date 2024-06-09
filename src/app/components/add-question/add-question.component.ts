import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from '../../services/question.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent {

  constructor(private _toast:ToastrService,private _login:LoginService,private _router:Router,private _snack:MatSnackBar,private _question:QuestionService){}

  public Editor = ClassicEditor;

  images!:File[];

  user:any;




  question:any={
    user:{
    },
    title:"",
    description:""
  }





  ngOnInit(){

    this.user=this._login.getUser()
    // console.log(this.user)
    if(this.user==undefined || this.user==null){
      this._router.navigate(['/login'])
      return
    }

  }


  submitQuestion(){
    // console.log("question submitted")
    // console.log(this.images)

    if(this.question.title.trim()==""){

      this._snack.open("title is required...","",{duration:2000})
      return

    }
    if(this.question.description.trim()==""){
      this._snack.open("description is required...","",{duration:2000})
      return
    } 


    this.question.user=this.user

    // console.log(this.question)

    let formData=new FormData()

    formData.append("question",JSON.stringify(this.question))
    if(this.images!=undefined){
      for(const image of this.images)
      formData.append("images",image)
    }


    this._question.addQuestion(formData).subscribe(
      (data:any)=>{
        // console.log(data)
        this._toast.info("question added successfully","",{
          progressBar:true,
          closeButton:true,
          timeOut:2000
        })
      },
      (error)=>{
        this._snack.open("Internal Server Error","",{duration:2000})
      }
    )

  }

  onImagesChange(event:any){

    this.images=event.target.files;

  }


}
