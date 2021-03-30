import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor() { }

  apiUploads = "https://localhost:44394/uploads/";

  getImage(imagePath:string){
    let path = this.apiUploads + imagePath;
    return path;
  }
}
