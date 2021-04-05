import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessagesService } from 'src/app/services/messages.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentOperationForm: FormGroup;
  rental: Rental;
  creditCard: CreditCard;
  totalPrice: number;
  car: Car;
  modal: string;
  state: boolean;
  cardNumber: any;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private carService: CarService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createPaymentOperationForm();
    this.cardNumber = this.localStorageService.get('creditCardNumber');
  }

  createPaymentOperationForm() {
    this.paymentOperationForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardLastUseDate: ['', Validators.required],
      securityValue: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  payWithBeforeCard(){
    let userBalance = this.localStorageService.get('balance');
    let dailyPrice: any = this.localStorageService.get('dailyPrice');
    let rentDate: any = this.localStorageService.get('rentDate');
    let returnDate: any = this.localStorageService.get('returnDate');
    let days =
      (new Date(returnDate).getTime() - new Date(rentDate).getTime()) /
      86400000;
    this.totalPrice = parseInt(dailyPrice) * days;

    if (!this.paymentService.pay(userBalance, this.totalPrice)) {
      this.toastrService.error(
        this.messagesService.insufficientBalance,
        'Ödeme'
      );
    } else {
      let carId: any = this.localStorageService.get('carId');
      let customerId: any = this.localStorageService.get('customerId');
      let rentDate: any = this.localStorageService.get('rentDate');
      let returnDate: any = this.localStorageService.get('returnDate');

      this.rental = {
        carId: parseInt(carId),
        customerId: parseInt(customerId),
        rentDate: rentDate.toString(),
        returnDate: returnDate.toString(),
      };

      this.rentalService.add(this.rental).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Araba Kiralama');
          this.router.navigate(['/']);
        },
        (responseError) => {
          this.toastrService.error(
            responseError.error.message,
            'Araba Kiralama'
          );
        }
      );
    }
  }


  pay() {
    if (this.paymentOperationForm.valid) {
      this.creditCard = Object.assign({}, this.paymentOperationForm.value);

      let userBalance = this.localStorageService.get('balance');
      let dailyPrice: any = this.localStorageService.get('dailyPrice');
      let rentDate: any = this.localStorageService.get('rentDate');
      let returnDate: any = this.localStorageService.get('returnDate');
      let days =
        (new Date(returnDate).getTime() - new Date(rentDate).getTime()) /
        86400000;
      this.totalPrice = parseInt(dailyPrice) * days;

      if (!this.paymentService.pay(userBalance, this.totalPrice)) {
        this.toastrService.error(
          this.messagesService.insufficientBalance,
          'Ödeme'
        );
      } else {
        let carId: any = this.localStorageService.get('carId');
        let customerId: any = this.localStorageService.get('customerId');
        let rentDate: any = this.localStorageService.get('rentDate');
        let returnDate: any = this.localStorageService.get('returnDate');

        this.rental = {
          carId: parseInt(carId),
          customerId: parseInt(customerId),
          rentDate: rentDate.toString(),
          returnDate: returnDate.toString(),
        };

        this.rentalService.add(this.rental).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Araba Kiralama');
            if (!this.cardNumber) {
              if (window.confirm('Kredi kartı kaydedilsin mi?')) {
                this.saveCreditCard();
              }else{
                this.router.navigate(['/']);
              }
            }
          },
          (responseError) => {
            this.toastrService.error(
              responseError.error.message,
              'Araba Kiralama'
            );
          }
        );
      }
    } else {
      this.toastrService.error(
        this.messagesService.notNullMessage,
        'Araba Kiralama'
      );
    }
  }

  saveCreditCard() {
    this.localStorageService.add(
      'creditCardFirstName',
      this.creditCard.firstName
    );
    this.localStorageService.add(
      'creditCardLastName',
      this.creditCard.lastName
    );
    this.localStorageService.add(
      'creditCardNumber',
      this.creditCard.cardNumber
    );
    this.localStorageService.add(
      'creditCardLastUseDate',
      this.creditCard.cardLastUseDate
    );
    this.localStorageService.add(
      'creditCardSecurityValue',
      this.creditCard.securityValue
    );
    this.toastrService.success(
      this.messagesService.creditCardInsertionSuccessful,
      'Kredi Kartı'
    );
    this.router.navigate(['/']);
  }

  changeCreditCard() {
    this.localStorageService.delete('creditCardNumber');
    window.location.reload();
  }
}
