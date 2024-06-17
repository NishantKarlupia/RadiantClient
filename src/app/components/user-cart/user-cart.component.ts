import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent {

  constructor(private _login:LoginService,private _game:GameService,private _user:UserService){}

  user:any;
  games:any;
  image=false;

  ngOnInit(){
    this.user=this._login.getUser()

    this.getUserCartItems()

  }

  getUserCartItems(){
    this._user.getUserCartItems(this.user.uid).subscribe(
      (data:any)=>{
        this.games=data
        for(let id in this.games){
          this._game.getGameById(this.games[id].gid).subscribe(
            (data:any)=>{
              this.games[id].coverImage=data.coverImage
              this.image=true
            },
            (error)=>{}
          )
        }
      },
      (error)=>{}
    )
  }

  navigateToGame(gid:any){}

  removeItemFromCart(gid:any){


    this._game.removeFromCart(this.user.uid,gid).subscribe(
      (data:any)=>{
        this.getUserCartItems()
      },
      (error)=>{}
    )

  }

}
