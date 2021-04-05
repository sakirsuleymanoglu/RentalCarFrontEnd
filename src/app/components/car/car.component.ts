import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service.';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carsDto: CarDto[];
  currentCar: CarDto;
  selectedOptionValue:string;
  filterByBrandName:string;
  filterByModel:string;
  filterByModelYear:string;
  filterByColor:string;
  userFindeks:any;
  balance:any;
  isAuth:boolean;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService:CarImageService,
    private localStorageService:LocalStorageService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.isAuth = true;
    }
    this.activatedRoute.params.subscribe((params) => {
      if (params["brandId"]) {
        this.getDetailsOfCarsByBrand(params["brandId"]);
      } else if (params["colorId"]) {
        this.getDetailsOfCarsByColor(params["colorId"]);
      } else {
        this.getDetailsOfCars();
      }
    });
    this.userFindeks = this.localStorageService.get('userFindeks');
    this.balance = this.localStorageService.get('balance');
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getDetailsOfCars() {
    this.carService.getDetailsOfCars().subscribe((response) => {
      this.carsDto = response.data;
      this.carsDto.forEach(car => {
        car.findeks = this.getRndInteger(0,1900);
      });
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

  setCurrentCar(car: CarDto) {
    this.currentCar = car;
    this.localStorageService.add('carFindeks', this.currentCar.findeks);
    this.localStorageService.add('carId', this.currentCar.id);
    this.localStorageService.add('dailyPrice', this.currentCar.dailyPrice);
  }

  getImage(imagePath:string){
    return this.carImageService.getImage(imagePath);
  }

  getRndInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
