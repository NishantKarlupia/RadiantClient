import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {

  constructor(private _game:GameService, private _router:Router){}

  nowAvailable:any;
  featured:any;
  special_offers:any;
  random_index=0;
  special_index=0;

  ngOnInit(){


    this._game.getGameByName("Far Cry 4").subscribe(
      (data:any)=>{
        this.nowAvailable=data
        // console.log(this.nowAvailable)
      },
      (error)=>{}
    )

    this._game.getRandomGames().subscribe(
      (data:any)=>{
        this.featured=data
        // console.log(this.featured)
      },
      (error)=>{}
    )
    this._game.getRandomGamesWithDiscount().subscribe(
      (data:any)=>{
        this.special_offers=data
        console.log(this.special_offers)
      },
      (error)=>{

      }
    )

    setInterval(() => {
      this.random_index = (this.random_index + 1) % this.featured.length;
    }, 6000); 

    setInterval(() => {
      this.special_index = (this.special_index + 1) % this.special_offers.length;
    }, 5000); 


  }



  openGame(gid:any){
    // console.log("krbjkbjksbk")
    this._router.navigate(["/game/"+gid])
  }

}
