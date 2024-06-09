import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from '../../services/signup.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private _snack:MatSnackBar, private _signup:SignupService,private _login:LoginService,private _router:Router){}

  userData={
    username:"",
    email:"",
    password:"",
    referal:""
  }

  ngOnInit(){
    let user=this._login.getUser()
    if(user!=null){

      this._router.navigate(['/store'])
      return
    }
  }


  formSubmit(){
    if(this.userData.username.trim()=="" ){
      this._snack.open("Username required","",{duration:3000})
      return
    }
    if(this.userData.email=="" ){
      this._snack.open("Email required","",{duration:3000})
      return
    }
    if(this.userData.password==""){
      this._snack.open("Password required","",{duration:3000})
      return
    }

    this._signup.isUserExistsWithUsername(this.userData.username.trim().toLowerCase()).subscribe(
      (data)=>{
        if(data==true){
          console.log("inside username check")
          this._snack.open("username already taken!!!","",{duration:1000})
          return
        }
        else{
          this._signup.isUserExistsWithEmail(this.userData.email.trim()).subscribe(
            (data)=>{
              // console.log("email",data)
              if(data==true){
                this._snack.open("email already used!!!","",{duration:1000})
                return
              }
              else{
                if(this.userData.referal.trim()!=""){
                  if(this.userData.referal.trim()==this.userData.username){
                    this._snack.open("Referal code can't be your username!!!","",{duration:2000})
                    return
                  }
                }
                if(this.userData.referal.trim()==""){
                  this.userData.username=this.userData.username.trim().toLowerCase()
                  this._signup.createUser(this.userData).subscribe(
                    (data)=>{
                      Swal.fire({
                        title:"Success",
                        text:"User Created Successfully",
                        "icon":"info"
                      })
                      this._router.navigate(['/login'])
                    },
                    (error)=>{
                      this._snack.open("Internal Server Error","",{duration:3000})
                    }
                  )
                }
                else{
                  this.userData.username=this.userData.username.trim().toLowerCase()
                  this._signup.createUserWithCode(this.userData,this.userData.referal).subscribe(
                    (data)=>{
                      Swal.fire({
                        title:"Success",
                        text:"User Created Successfully",
                        "icon":"info"
                      })
                      this._router.navigate(['/login'])
                    },
                    (error)=>{
                      this._snack.open("Internal Server Error","",{duration:3000})
                    }
                  )
                }

              }
            },
            (error)=>{
              console.log(error)
            }
          )
        }
      },
      (error)=>{
        console.log(error)
      }
    )
    


    

    

    // console.log("all clear")


    
    

  }

}
