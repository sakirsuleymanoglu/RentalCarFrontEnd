import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/carDto';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  rental: Rental;
  customer: Customer;
  car: CarDto;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private localStorageService: LocalStorageService,
    private carService: CarService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
    this.getCustomerByUserId();
    this.getCarsById();
  }

  createProductAddForm() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.rentalAddForm = this.formBuilder.group({
          rentDate: ['', Validators.required],
          returnDate: ['', Validators.required],
        });
      }
    });
  }

  accept() {
    if (this.rentalAddForm.valid) {
      this.rental = Object.assign({}, this.rentalAddForm.value);
      this.localStorageService.add('rentDate', this.rental.rentDate);
      this.localStorageService.add('returnDate', this.rental.returnDate);
    }
  }

  getCustomerByUserId() {
    let userId: any = this.localStorageService.get('userId');
    this.customerService.getCustomerByUserId(userId).subscribe((respone) => {
      this.customer = respone.data;
      this.localStorageService.add('customerId', this.customer.id);
    });
  }

  getCarsById() {
    let carId: any = this.localStorageService.get('carId');
    this.carService.getDetailsOfCarByCarId(carId).subscribe((response) => {
      this.car = response.data;
    });
  }
}
