import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-addgame',
  templateUrl: './admin-addgame.component.html',
  styleUrl: './admin-addgame.component.css'
})
export class AdminAddgameComponent {

  public Editor = ClassicEditor;

  constructor(private _service:AdminService){}

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
    console.log(this.coverImage)
    console.log(this.gamePlayImages)


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
        console.log(data)
      },
      (error)=>{
        console.log(error)
      }
    )

    
  }

  
}
