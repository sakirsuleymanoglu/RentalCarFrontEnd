import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDto } from 'src/app/models/carDto';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  brands: Brand[];
  colors: Color[];
  cars: CarDto[];
  carAddForm: FormGroup;
  car: Car;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.listBrands();
    this.listColors();
    this.listCars();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      model: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
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

  listCars() {
    this.carService.getDetailsOfCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  add() {
    if (this.carAddForm.valid) {
      this.car = Object.assign({}, this.carAddForm.value);
      this.carService.add(this.car).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Araba Ekleme');
          this.listCars();
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Araba Ekleme');
        }
      );
    } else {
      this.toastrService.error(
        this.messagesService.notNullMessage,
        'Araba Ekleme'
      );
    }
  }
}
