import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;
  brand: Brand;
  brands: Brand[];
  emptyBrands: Brand[];

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private messagesService: MessagesService
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
      this.brandService.add(this.brand).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(response.message, 'Marka');
            this.list();
          }
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error(
        this.messagesService.notNullMessage,
        'Marka Ekleme'
      );
    }
  }

  list() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      return this.brands;
    });
  }

  deList() {
    this.brands = this.emptyBrands;
  }
}
