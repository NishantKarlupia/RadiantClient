import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  
  constructor(private _login:LoginService,private _router:Router){}

  user:any;


  ngOnInit(){

    this.user=this._login.getUser()

    if(this.user==null){

      this._router.navigate(["/store"])
      return
    }

  }


}
