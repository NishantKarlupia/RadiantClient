import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-user-codes',
  templateUrl: './user-codes.component.html',
  styleUrl: './user-codes.component.css'
})
export class UserCodesComponent {


  constructor(private _game:GameService,private _login:LoginService){}

  user:any;
  codes=[];

  ngOnInit(){
    this.user=this._login.getUser()
    this._game.getUserCodes(this.user.uid).subscribe(
      (data:any)=>{
        this.codes=data;
      }
    )
  }

}
