import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

// import Razorpay from 'razorpay';

declare var Razorpay:any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


  constructor(private _login:LoginService,private _router:Router,private _game:GameService,private _toast:ToastrService,private _user:UserService){}
  user:any;

  user_cart:any;
  total_price=0;
  x_points=0;

  ngOnInit(){

    this.user=this._login.getUser()
    // console.log(this.user)

    if(this.user==null){
      this._router.navigate(['/store'])
      return
    }

    this.x_points=this.user.xpoints;

    this._user.getUserCartItems(this.user.uid).subscribe(
      (data:any)=>{
        this.user_cart=data

        console.log(this.user_cart)

        this.user_cart=(this.user.cart.length!=0?this.user.cart:null)

        if(this.user_cart!=null){
          for(let item of this.user_cart)this.total_price+=(item.price- (item.price*item.discount)/100);
        }


        if(this.x_points<=this.total_price){
          this.total_price-=this.x_points;
          this.x_points=0
        }
        else{
          this.x_points-=this.total_price
          this.total_price=0
        }

      },
      (error)=>{}
    )

    

  }

  placeOrder(){

    this._game.createTransaction(this.total_price).subscribe(
      (data)=>{
        // console.log(data)
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
    // console.log(res)
    for(let game of this.user_cart){
      // console.log(this.user.uid,game.gid)
      this._game.purchaseGame(this.user.uid,game.gid).subscribe(
        (data)=>{},
        (error)=>{}
      )
    }
    this._user.updatePoints(this.user.uid,this.x_points).subscribe(
      (data)=>{},
      (error)=>{}
    )
    this._router.navigate(['/store'])
  }


}
