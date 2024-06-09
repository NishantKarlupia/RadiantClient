import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './admin-stats.component.html',
  styleUrl: './admin-stats.component.css'
})
export class AdminStatsComponent {

  constructor(private _admin:AdminService){}

  adminData:any;

  ngOnInit(){
    this._admin.getAdminData().subscribe(
      (data:any)=>{
        this.adminData=data
        // console.log(this.adminData)

      },
      (error)=>{}
    )
  }

}
