import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  rental: Rental;
  carDailyPrice: number;
  totalPrice: number;
  car:Car;
  rentalCarId:number;
  

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.rentalAddForm = this.formBuilder.group({
          carId: [params['carId'], Validators.required],
          customerId: ['', Validators.required],
          rentDate: ['', Validators.required],
          returnDate: ['', Validators.required],
        });
      }
    });
  }

  accept() {
    if (this.rentalAddForm.valid) {
      return Object.assign({}, this.rentalAddForm.value);
    }
  }
}
