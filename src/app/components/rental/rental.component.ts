import { Component, OnInit } from '@angular/core';
import { RentalDto } from 'src/app/models/rentalDto';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentalsDto: RentalDto[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getDetailsOfCars();
  }

  getDetailsOfCars() {
    this.rentalService.getDetailsOfRentals().subscribe((response) => {
      this.rentalsDto = response.data;
    });
  }
}
