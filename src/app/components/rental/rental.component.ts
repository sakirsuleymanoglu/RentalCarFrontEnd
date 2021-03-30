import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDto } from 'src/app/models/rentalDto';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentalsDto: RentalDto[] = [];
  
  constructor(
 
  ) {}

  ngOnInit(): void {}



  
}

