import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import baseUrl from '../../services/globalConfig';
import { DomSanitizer, SafeHtml ,SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  constructor(private _route:ActivatedRoute, private _service:GameService,private _sanitizer: DomSanitizer){}
  sanitizeHtml(html: string): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  

  hidden=false;
  gamePlayImage:any
  images_array:any
  current_image=-5;

  gameData!:any;

  ngOnInit(){
    const gid=this._route.snapshot.params["gid"]
    console.log(gid)

    this._service.getGameById(gid).subscribe(
      (data:any)=>{
        this.gameData=data
        // const path=`${baseUrl}/uploads/${this.gameData.gid}/coverImage.jpg`
        // console.log(path)
        // this.gameData["image"]=path
        this.images_array=this.gameData.gamePlayImages
        console.log(this.gameData)
        // console.log(this.images_array)
        this.gamePlayImage=this.images_array[1]

      },
      (error)=>{}
    )

  }

  previous_click(){
    if(this.current_image==-5){
      this.current_image=this.images_array.length - 1
      this.gamePlayImage=this.images_array[this.current_image]
      this.hidden=!this.hidden
      return
    }

    if(this.current_image==-1){
      this.hidden=!this.hidden
      this.current_image=this.images_array.length - 1
      this.gamePlayImage=this.images_array[this.current_image]
    }
    else if(this.current_image==0){
      this.hidden=!this.hidden
      this.current_image-=1
    }
    else {
      this.current_image--;
      this.gamePlayImage=this.images_array[this.current_image]
    }
    // console.log(this.current_image,this.hidden)
    
  }
  next_click(){

    if(this.current_image==-5){
      this.current_image=0
      this.gamePlayImage=this.images_array[this.current_image]
      this.hidden=!this.hidden
      return
    }
    
    if(this.current_image==(this.images_array.length - 1)){
      this.hidden=!this.hidden
      this.current_image=-1
    }
    else if(this.current_image==-1){
      this.hidden=!this.hidden
      this.current_image=0
      this.gamePlayImage=this.images_array[this.current_image]
    }
    else{
      this.current_image++
      this.gamePlayImage=this.images_array[this.current_image]
    }

    // console.log(this.current_image,this.hidden)
    
  }


}
