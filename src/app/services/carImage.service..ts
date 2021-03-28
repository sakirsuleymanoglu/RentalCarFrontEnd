import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

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
