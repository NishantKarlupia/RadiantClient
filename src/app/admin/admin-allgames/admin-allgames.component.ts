import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-allgames',
  templateUrl: './admin-allgames.component.html',
  styleUrl: './admin-allgames.component.css'
})
export class AdminAllgamesComponent {

  games:any

  constructor(private _service:AdminService,private _router:Router){}

  ngOnInit(){

    this._service.getAllGame().subscribe(
      (data)=>{
        this.games=data
        console.log(this.games)
      },
      (error)=>{
        console.log(error)
      }
    )

  }

  navigateToGame(gid:any){

    console.log(gid)
    this._router.navigate([`game/${gid}`])

  }

}
