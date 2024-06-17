import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { DomSanitizer, SafeHtml ,SafeResourceUrl} from '@angular/platform-browser';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { v4 as uuidv4 } from 'uuid';

declare var Razorpay:any;


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  constructor(private _route:ActivatedRoute, private _service:GameService,private _sanitizer: DomSanitizer,private _login:LoginService,private _toast:ToastrService, private _game:GameService){}

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
        this.images_array=this.gameData.gamePlayImages
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
        progressBar:false,
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
          progressBar:false,
          closeButton:true,
          timeOut:2000
        })
      },
      (error)=>{}
    )

  }



  buyGift(){

    if(this.user==null){
      this._toast.info("login required","",{
        progressBar:false,
        closeButton:true,
        timeOut:2000
      })
      return
    }


    this._game.createTransaction(this.gameData.price- (this.gameData.price*this.gameData.discount/100)).subscribe(
      (data)=>{
        console.log(data)
        this.openTransactionModal(data)
      },
      (error)=>{
        console.log(error)
      }
    )

  }

  openTransactionModal(response:any){
    var options={
      order_id:response.orderId,
      key_id:response.key,
      currency:response.currency,
      name:"Radiant",
      description:"Where gamers create experiences!!!",
      image:'https://cdn.pixabay.com/photo/2017/09/08/20/29/chess-2730034_640.jpg',
      handler:(res:any)=>{
        if(res!=null){
          this.processResponse(res)
        }
        else{
          if(this._login.getUser()==null){
            this._toast.info("payment failed","",{
              progressBar:true,
              closeButton:true,
              timeOut:2000
            })
          }
        }
      },
      prefill:{
        name:"Radiant",
      },
      notes:{
        address:"Gaming site"
      },
      theme:{
        color:"#F37254"
      }
    }

    var razorpayObject=new Razorpay(options);
    razorpayObject.open();
    
  }

  processResponse(res:any){

    let code=uuidv4()

    let giftData={
      code:code,
      userId:this.user.uid,
      gameId:this.gameData.gid
    }

    this._game.buyGift(giftData).subscribe(
      (data:any)=>{
        this._toast.info("gift code added to your account","",{
          progressBar:false,
          closeButton:true,
          timeOut:2000
        })
      }
    )

  }


}
