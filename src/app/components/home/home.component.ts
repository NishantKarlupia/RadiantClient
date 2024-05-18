import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private _game:GameService){}

  // ngOnInit(){
  //   this._game.getGameByName("Assassin's Creed Valhalla").subscribe(
  //     (data)=>{
  //       console.log(data)
  //     },
  //     (error)=>{}
  //   )
  // }


}
