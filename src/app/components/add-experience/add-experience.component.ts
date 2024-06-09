import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ExperienceService } from '../../services/experience.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.css'
})
export class AddExperienceComponent {
  

  constructor(private _toast:ToastrService,private _snack:MatSnackBar,private _expService:ExperienceService, private _login:LoginService, private _router:Router){}

  public Editor=ClassicEditor;

  images!:File[];



  experienceData={
    user:{},
    title:"",
    description:"",
    tags:""
  }


  ngOnInit(){
    if(this._login.getUser()==null){
      this._router.navigate(['/login'])
      return
    }
    this.experienceData.user=this._login.getUser()
  }

  submitForm(){

    let formData=new FormData()

    formData.append("experience",JSON.stringify(this.experienceData))
    if(this.images!=undefined){
      for(const image of this.images)
      formData.append("images",image)
    }


    this._expService.addExperience(formData).subscribe(
      (data)=>{
          this._toast.info("achievement added!!!","",{
          progressBar:true,
          closeButton:true,
          timeOut:2000
        })
      },
      (error)=>{
        // console.log(error)
        this._snack.open("Internal Server Error","",{duration:2000})
      }
    )


  }

  onImagesChange(event:any){
    this.images=event.target.files;
  }

}
