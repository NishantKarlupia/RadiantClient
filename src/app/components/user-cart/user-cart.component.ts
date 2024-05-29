import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent {

  constructor(private _login:LoginService,private _game:GameService){}

  user:any;
  games:any;
  image=false;

  ngOnInit(){
    this.user=this._login.getUser()
    this.games=this.user.cart

    console.log(this.games)

    for(let id in this.games){
      this._game.getGameById(this.games[id].gid).subscribe(
        (data:any)=>{
          this.games[id].coverImage=data.coverImage
          this.image=true
        },
        (error)=>{}
      )
    }
    console.log(this.games)
  }

  navigateToGame(gid:any){}

}
