import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-updategame',
  templateUrl: './admin-updategame.component.html',
  styleUrl: './admin-updategame.component.css'
})
export class AdminUpdategameComponent {

  public Editor = ClassicEditor;

  constructor(private _service:AdminService, private _route:ActivatedRoute){}
  
  coverImage!:File ;
  gamePlayImages!:File[];


  gameData:any={
    gid:"",
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

  ngOnInit(){
    const id=this._route.snapshot.params["gid"]
    console.log(id)


    this._service.getGameById(id).subscribe(
      (data:any)=>{
        // console.log(data)

        this.gameData=data

        delete this.gameData.coverImage
        delete this.gameData.gamePlayImages
        

        // console.log(this.gameData)
      },
      (error)=>{
        console.log(error)
      }
    )
    
  }

  onImageChange(event:any){
    // console.log(event)
    this.coverImage=event.target.files[0];
  }
  onGamePlayImagesChange(event:any){
    this.gamePlayImages = event.target.files;
  }

  formSubmit(){

    
    const formData=new FormData()
    
    formData.append("gameData", JSON.stringify(this.gameData))

    if(this.coverImage!=undefined){formData.append("coverImage",this.coverImage)}
    if(this.gamePlayImages!=undefined){
      for (const image of this.gamePlayImages) {
        formData.append("gamePlayImages",image)
      }
    }


    // console.log(this.gameData)

    this._service.updateGame(formData).subscribe(
      (data:any)=>{
        // console.log(data)
      },
      (error)=>{
        console.log(error)
      }
    )


  }

}
