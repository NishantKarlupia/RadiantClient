import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ExperienceService } from '../../services/experience.service';

@Component({
  selector: 'app-all-experiences',
  templateUrl: './all-experiences.component.html',
  styleUrl: './all-experiences.component.css'
})
export class AllExperiencesComponent {

  constructor(private _toast:ToastrService,private _login:LoginService, private _router:Router, private _expService:ExperienceService){}

  experiences:any=null;


  ngOnInit(){
    this._expService.getAllExperiences().subscribe(
      (data:any)=>{
        this.experiences=data
        console.log(this.experiences)
      },
      (error)=>{
        console.log(error)
      }
    )
  }



  addExperience()
  {
    console.log("hello world")

    if(this._login.getUser()==null){
      this._toast.info("login required","",{
        progressBar:true,
        closeButton:true,
        timeOut:2000
      })
      return
    }

    this._router.navigate(['/experience/add'])


  }



}
