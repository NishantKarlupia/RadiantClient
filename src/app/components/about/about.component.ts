import { Component } from '@angular/core';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  data={
    players:0,
    games:0
  }

  constructor(private matIconRegistry: MatIconRegistry,private domSanitizer: DomSanitizer, private _admin:AdminService) {
    this.matIconRegistry.addSvgIcon(
      'windows', // Icon name
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/images/windows.svg") // Path to SVG file
    );
  }

  ngOnInit(){
    this._admin.getAdminData().subscribe(
      (data:any)=>{
        // console.log(data)
        this.data.players=data.totalUsers
        this.data.games=data.totalGames
      }
    )
  }




}
