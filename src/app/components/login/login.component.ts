import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData={
    username:"",
    password:""
  }

  constructor(private _snack:MatSnackBar,private _login:LoginService,private _router:Router){}

  ngOnInit(){
    const user=this._login.getUser()
    if(user!=null)this._router.navigate(["store"])
  }

  formSubmit(){
    console.log("login component")
    console.log(this.loginData)

    if(this.loginData.username.trim()==""){
      this._snack.open("Username is required!!!","",{duration:2000})
      return
    }

    if(this.loginData.password.trim()==""){
      this._snack.open("Pasword is required!!!","",{duration:2000})
      return
    }

    this._login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data)
        this._login.loginUser(data.token)
        this._login.getCurrentUser().subscribe(
          (user:any)=>{
            console.log(user.user)
            this._login.setUser(user.user)

            const role=this._login.getUserRole()
            console.log(role)
            if(role=="ADMIN" || role=="NORMAL"){
              this._login.loginStatusSubject.next(true)
              this._router.navigate(['store'])
            }
            else{
              this._login.logout()
            }


          },
          (error)=>{
            console.log("something went wrong")
          }
        )
      },
      (error)=>{
        this._snack.open("Entered wrong credentials!!!","",{duration:2000})
        console.log(error)
      }
    )



  }

}
