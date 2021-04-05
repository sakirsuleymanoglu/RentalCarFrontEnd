import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { CarService } from 'src/app/services/car.service';
import { CarImageService } from 'src/app/services/carImage.service.';
import { FindeksService } from 'src/app/services/findeks.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-cardto',
  templateUrl: './cardto.component.html',
  styleUrls: ['./cardto.component.css'],
})
export class CardtoComponent implements OnInit {
  car: CarDto;
  newRouter: string;

  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private findeksService: FindeksService,
    private toastrService: ToastrService,
    private messagesService: MessagesService,
    private router: Router
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

  getImage(imagePath: string) {
    return this.carImageService.getImage(imagePath);
  }

  rent() {
    let result = this.checkFindeks();

    if (!result) {
      this.toastrService.error(
        this.messagesService.findeksErrorMessage,
        'Araba Kiralama'
      );
    } else {
      let carId = this.localStorageService.get('carId');
      this.router.navigate(['/cars/car/' + carId + '//rental/add']);
    }
  }

  checkFindeks(): boolean {
    let userFindeks: any = this.localStorageService.get('userFindeks');
    let carFindeks: any = this.localStorageService.get('carFindeks');
    if (this.findeksService.checkFindeks(userFindeks, carFindeks)) {
      return true;
    }
    return false;
  }
}
