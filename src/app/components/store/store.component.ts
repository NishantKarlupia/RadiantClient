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

  categories=["Racing", "Action", "Adventure","Role Play","Open World","Fighting","Survival"]

  price_filter=1000;

  price_filter_data:any;

  search_result:any;

  

  ngOnInit(){

    this._game.getRandomGames().subscribe(
      (data:any)=>{
        this.featured=data
        // console.log(this.featured)
      },
      (error)=>{}
    )


    this._game.getGameByName("Far Cry 6").subscribe(
      (data:any)=>{
        this.nowAvailable=data
        // console.log(this.nowAvailable)
      },
      (error)=>{}
    )

    
    this._game.getRandomGamesWithDiscount().subscribe(
      (data:any)=>{
        this.special_offers=data
        // console.log(this.special_offers)
      },
      (error)=>{

      }
    )


    this._game.getGamesLessThanPrice(this.price_filter).subscribe(
      (data:any)=>{
        this.price_filter_data=data

      },
      (error)=>{}
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

  gamesOfCategory(category:String){
    this._router.navigate([`/games/category/${category}`])
  }

  searchGame(event:any,value:String){
    if(value.trim()==""){
      this.search_result=null;
      return
    }

    this._game.searchGame(value).subscribe(
      (data)=>{
        this.search_result=data
      },
      (error)=>{}
    )

  }

  navigateToGame(gid:any){
  }




}
