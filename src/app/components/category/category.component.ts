import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  constructor(private _route:ActivatedRoute,private _game:GameService,private _router:Router){}

  games:any;
  category!: String;

  ngOnInit(){
    this.category =this._route.snapshot.params["category"]
    // console.log(category)

    this._game.getGamesOfCategory(this.category).subscribe(
      (data)=>{
        this.games=data
        // console
      },
      (error)=>{}
    )


  }

  openGame(gid:any){
    this._router.navigate(["/game/"+gid])
  }


}
