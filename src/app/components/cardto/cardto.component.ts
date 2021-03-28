import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service.';

@Component({
  selector: 'app-cardto',
  templateUrl: './cardto.component.html',
  styleUrls: ['./cardto.component.css'],
})
export class CardtoComponent implements OnInit {
  car: CarDto;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getDetailsOfCarByCarId(params['carId']);
      }
    });
  }

  getDetailsOfCarByCarId(carId: number) {
    this.carService.getDetailsOfCarByCarId(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  getImage(imagePath:string){
    return this.carImageService.getImage(imagePath);
  }
  
}
