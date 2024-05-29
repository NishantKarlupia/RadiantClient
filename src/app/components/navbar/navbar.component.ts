import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn=false;
  account_path="";

  constructor(private _login:LoginService,private _router:Router){}

  ngOnInit(){
    this.isLoggedIn=this._login.isLoggenIn()
    this._login.loginStatusSubject.asObservable().subscribe(data=>{
      // console.log(data)
      if(data==false){
        this.isLoggedIn=this._login.isLoggenIn()
        this._router.navigate(["/"])
        return
      }
      this.isLoggedIn=this._login.isLoggenIn()
      let role=this._login.getUserRole()
      // console.log(role)

      if(this.isLoggedIn){if(role=="ADMIN")this.account_path="/admin"; else this.account_path=`/user`}
      else this.account_path="/store"
      console.log(this.account_path)
    })
  }

  logout(){
    this._login.logout()
    this._login.loginStatusSubject.next(false)
    // window.location.reload()
    console.log("logout")
  }

}
