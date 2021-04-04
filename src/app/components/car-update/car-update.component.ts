import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  brands: Brand[];
  colors: Color[];
  car: Car;
  updatedCar: Car;
  cars: Car[];
  isUpdate: boolean;
  formCarData: Car;
  formSelectedCarData: Car;
  carUpdateForm: FormGroup;
  selectedCarUpdateForm: FormGroup;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private messagesService: MessagesService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carService.getCarById(params['carId']).subscribe((response) => {
          this.car = response.data;
          this.createSelectedUpdateCarForm();
          this.listBrands();
          this.listColors();
        });
      } else {
        this.carService.getCars().subscribe((response) => {
          this.cars = response.data;
        });
        this.createUpdateCarForm();
      }
    });
  }

  createUpdateCarForm() {
    this.carUpdateForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      model: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createSelectedUpdateCarForm() {
    this.selectedCarUpdateForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      model: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  checkUpdate(car: Car) {
    this.updatedCar = car;
    this.isUpdate = true;
  }

  update() {
    if (this.carUpdateForm.valid) {
      this.formCarData = Object.assign({}, this.carUpdateForm.value);

      this.carService.getCarById(this.updatedCar.id).subscribe((response) => {
        this.updatedCar = response.data;
        this.updatedCar.brandId = this.formCarData.brandId;
        this.updatedCar.colorId = this.formCarData.colorId;
        this.updatedCar.model = this.formCarData.model;
        this.updatedCar.modelYear = this.formCarData.modelYear;
        this.updatedCar.dailyPrice = this.formCarData.dailyPrice;
        this.updatedCar.description = this.formCarData.description;
        this.carService.update(this.updatedCar).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Araba Güncelleme');
            this.list();
          },
          (responseError) => {
            this.toastrService.error(
              responseError.error.message,
              'Araba Güncelleme'
            );
          }
        );
      });
    } else {
      this.toastrService.error(
        this.messagesService.notNullMessage,
        'Araba Güncelleme'
      );
    }
  }

  list() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  selectedCarUpdate() {
    if (this.selectedCarUpdateForm.valid) {
      this.formSelectedCarData = Object.assign(
        {},
        this.selectedCarUpdateForm.value
      );
      this.car.brandId = this.formSelectedCarData.brandId;
      this.car.colorId = this.formSelectedCarData.colorId;
      this.car.model = this.formSelectedCarData.model;
      this.car.modelYear = this.formSelectedCarData.modelYear;
      this.car.dailyPrice = this.formSelectedCarData.dailyPrice;
      this.car.description = this.formSelectedCarData.description;
      this.carService.update(this.car).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Araba Güncelleme');
        },
        (responseError) => {
          this.toastrService.error(
            responseError.error.message,
            'Araba Güncelleme'
          );
        }
      );
    } else {
      this.toastrService.error(
        this.messagesService.notNullMessage,
        'Araba Güncelleme'
      );
    }
  }

  listBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  listColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}
