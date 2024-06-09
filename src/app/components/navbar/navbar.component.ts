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

  constructor(private _login:LoginService,private _router:Router){}

  ngOnInit(){
    this.isLoggedIn=this._login.isLoggenIn()
    this._login.loginStatusSubject.asObservable().subscribe(data=>{
        this.isLoggedIn=this._login.isLoggenIn()
    })
  }

  logout(){
    this._login.logout()
    this._login.loginStatusSubject.next(false)
  }

  openDashboard(){
      let role=this._login.getUserRole()
      if(role=="NORMAL"){
        this._router.navigate(['/user'])
        }
        else{
          this._router.navigate(['/admin'])
      }
      
  }

}
