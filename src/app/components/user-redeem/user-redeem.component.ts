import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { GameService } from '../../services/game.service';


@Component({
  selector: 'app-user-redeem',
  templateUrl: './user-redeem.component.html',
  styleUrl: './user-redeem.component.css'
})
export class UserRedeemComponent {

  constructor(private _login:LoginService,private _toast:ToastrService,private _game:GameService){}

  user:any;
  code="";

  ngOnInit(){
    this.user=this._login.getUser()
  }

  redeemCode(){
    this._game.redeemGift(this.code,this.user.uid).subscribe(
      (data:any)=>{
        // console.log(data)
        this._toast.info(data.message,"",{
          progressBar:false,
          closeButton:true,
          timeOut:2000
        })
      },
      (error)=>{
        console.log(error)
      }
    )
  }

}
