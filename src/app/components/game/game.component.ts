import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { DomSanitizer, SafeHtml ,SafeResourceUrl} from '@angular/platform-browser';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  constructor(private _route:ActivatedRoute, private _service:GameService,private _sanitizer: DomSanitizer,private _login:LoginService,private _toast:ToastrService){}

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

  alreadyInCart=false;
  alreadyOwned=false;

  user={
    uid:""
  };

  ngOnInit(){
    const gid=this._route.snapshot.params["gid"]
    // console.log(gid)

    this.user=this._login.getUser()
    



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

    if(this.user!=null){
      this._service.isGameInCart(this.user.uid,gid).subscribe(
        (data:any)=>{
          this.alreadyInCart=data
        },
        (error)=>{}
      )

      this._service.isGameOwned(this.user.uid,gid).subscribe(
        (data:any)=>{
          this.alreadyOwned=data
        },
        (error)=>{}
      )

    }


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


  addToCart(user:any,game:any){
    if(user==null){
      this._toast.info("login required","",{
        progressBar:true,
        closeButton:true,
        timeOut:2000
      })

      return
    }

    // console.log(user.uid)
    // console.log(game.gid)

    this._service.addToCart(user.uid,game.gid).subscribe(
      (data)=>{
        this.alreadyInCart=true
        this._toast.info("game added to cart","",{
          progressBar:true,
          closeButton:true,
          timeOut:2000
        })
      },
      (error)=>{}
    )



  }


}
