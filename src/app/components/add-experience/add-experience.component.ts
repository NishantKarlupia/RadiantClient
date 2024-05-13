import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ExperienceService } from '../../services/experience.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.css'
})
export class AddExperienceComponent {
  

  constructor(private _expService:ExperienceService, private _login:LoginService, private _router:Router){}

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
        console.log(data)
      },
      (error)=>{
        console.log(error)
      }
    )


  }

  onImagesChange(event:any){
    this.images=event.target.files;
  }

}
