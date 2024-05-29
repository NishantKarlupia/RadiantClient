import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  constructor(private _login:LoginService){}

  user:any;

  ngOnInit(){
    this.user=this._login.getUser()
    console.log(this.user)
  }

}
