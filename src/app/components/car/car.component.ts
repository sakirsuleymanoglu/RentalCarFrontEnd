import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carsDto: CarDto[] = [];
  currentCar:Car;
  constructor(
    private carService: CarService,
    private acitvatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.acitvatedRoute.params.subscribe(
      (params)=>{
        if(params["brandId"]){
          this.getDetailsOfCarsByBrand(params["brandId"]);
        }else if(params["colorId"]){
          this.getDetailsOfCarsByColor(params["colorId"]);
        }
        else{
          this.getDetailsOfCars();
        }
      }
    )
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getDetailsOfCars() {
    this.carService.getDetailsOfCars().subscribe((response) => {
      this.carsDto = response.data;
    });
  }

  getDetailsOfCarsByBrand(brandId: number) {
    this.carService.getDetailsOfCarsByBrand(brandId).subscribe((response) => {
      this.carsDto = response.data;
    });
  }

  getDetailsOfCarsByColor(colorId: number) {
    this.carService.getDetailsOfCarsByColor(colorId).subscribe((response) => {
      this.carsDto = response.data;
    });
  }

  setCurrentCar(car:Car){
    this.currentCar = car;
    console.log(this.currentCar.model);
  }
}
