import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdminService } from '../../services/admin.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-addgame',
  templateUrl: './admin-addgame.component.html',
  styleUrl: './admin-addgame.component.css'
})
export class AdminAddgameComponent {

  public Editor = ClassicEditor;

  constructor(private _service:AdminService, private _snack:MatSnackBar,private _toast:ToastrService){}

  coverImage!:File ;
  gamePlayImages!:File[];


  gameData:any={

    gamename:"",
    description:"",
    video:"",
    price:0,
    discount:0,
    categories:"",
    platform:"",
    publisher:"",
    releaseDate:"",
    requirements: ""
  }

  onImageChange(event:any){
    this.coverImage=event.target.files[0];
  }
  onGamePlayImagesChange(event:any){
    this.gamePlayImages = event.target.files;
  }

  formSubmit(){
    // this.gameData["coverImage"]=this.coverImage

    // console.log(this.gameData)
    // console.log(this.coverImage)
    // console.log(this.gamePlayImages)

    for(let key of Object.keys(this.gameData)){
      // console.log(key+" "+this.gameData[key])
      if(this.gameData[key]===""){
        this._toast.info("Please enter "+ key,"",{
          progressBar:true,
          closeButton:true,
          timeOut:1000
        })
        return
      }
    }


    const formData=new FormData()
    formData.append("gameData", JSON.stringify(this.gameData))
    if(this.coverImage!=undefined){formData.append("coverImage",this.coverImage)}
    if(this.gamePlayImages!=undefined){
      for (const image of this.gamePlayImages) {
        formData.append("gamePlayImages",image)
      }
    }
    
    this._service.addGame(formData).subscribe(
      (data)=>{
        // console.log(data)
        Swal.fire({
          title:"Success",
          text:"Game Added Successfully",
          "icon":"info"
        })
      },
      (error)=>{
        this._snack.open("Internal Server Error","",{duration:2000})
      }
    )

    
  }

  
}
