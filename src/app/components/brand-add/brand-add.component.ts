import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;
  brand: Brand;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.brandAddForm.valid) {
      this.brand = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(this.brand).subscribe((response) => {
        alert(response.success);
      });
    }
  }
}
