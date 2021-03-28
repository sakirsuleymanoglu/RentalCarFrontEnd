import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-cardto',
  templateUrl: './cardto.component.html',
  styleUrls: ['./cardto.component.css']
})
export class CardtoComponent implements OnInit {

  car:CarDto;

  constructor( private carService: CarService, private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getDetailsOfCarByCarId(params['carId']);
      } 
    });}
  

  getDetailsOfCarByCarId(carId: number) {
    this.carService.getDetailsOfCarByCarId(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  imageDomSanitizer(imageUrl:string){
      return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl); 
  }
}
