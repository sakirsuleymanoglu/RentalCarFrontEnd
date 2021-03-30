import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentOperationForm: FormGroup;
  creditCardInformation:CreditCard;
  creditCard:CreditCard;
  rental:Rental;
  carId:number;
  customerId:number;
  rentDate:string;
  returnDate:string;
  totalPrice:number;
  car:Car;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.createPaymentOperationForm();
  }

  createPaymentOperationForm() {
    this.paymentOperationForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardDate: ['', Validators.required],
      cardSecurityValue: ['', Validators.required],
      cardHasPersonName: ['', Validators.required],
      cardHasPersonSuname: ['', Validators.required],
    });
  }

  getCreditCard(){
    this.creditCardInformation = Object.assign({}, this.paymentOperationForm.value);
    this.paymentService.getByCreditCard(this.creditCardInformation.cardNumber).subscribe(
      (response)=>{
        this.creditCard = response;
      }
    )
  }

  pay(rental: Rental, creditCard: CreditCard, totalPrice: number) {
    this.activatedRoute.params.subscribe(
      (params)=>{
        if(params['carId']){
          this.carId = params['carId'];
        }if(params['customerId']){
          this.customerId = params['customerId'];
        }if(params['rentDate']){
          this.rentDate = params['rentDate'];
        }if(params['returnDate']){
          this.returnDate = params['returnDate'];
        }

        this.rental = {
          carId : this.carId,
          customerId : this.customerId,
          rentDate : this.rentDate,
          returnDate : this.returnDate
        }
        
        let days = ((new Date(this.returnDate).getTime() - new Date(this.rentDate).getTime()) / 84000)
        
        this.carService.getCarById(this.carId).subscribe((response)=>
        {
          this.car = response.data;
          this.totalPrice = this.car.dailyPrice * days;
        });

        this.rentalService.add(this.rental, this.creditCard, this.totalPrice).subscribe(
          (response)=>{
            alert(response.success);
          }
        );

      }
    ) 
  }
}
