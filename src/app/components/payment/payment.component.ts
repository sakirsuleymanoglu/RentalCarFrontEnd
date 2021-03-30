import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {



  paymentOperationForm : FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    
  }

 
  
  createPaymentOperationForm(){
    this.paymentOperationForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardDate: ['', Validators.required],
      cardSecurityValue:['',Validators.required],
      cardHasPersonName: ['', Validators.required],
      cardHasPersonSuname:['',Validators.required],
    });
  }

}
