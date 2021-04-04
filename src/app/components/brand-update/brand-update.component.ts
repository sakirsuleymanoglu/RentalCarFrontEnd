import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brand: Brand;
  updatedBrand: Brand;
  brands: Brand[];
  isUpdate: boolean;
  formBrandData: Brand;
  formSelectedBrandData: Brand;
  brandUpdateForm: FormGroup;
  selectedBrandUpdateForm: FormGroup;
  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.brandService.getBrand(params['brandId']).subscribe((response) => {
          this.brand = response.data;
          this.createSelectedUpdateBrandForm();
        });
      } else {
        this.brandService.getBrands().subscribe((response) => {
          this.brands = response.data;
        });
        this.createUpdateBrandForm();
      }
    });
  }

  createUpdateBrandForm() {
    this.brandUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  createSelectedUpdateBrandForm() {
    this.selectedBrandUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  checkUpdate(brand: Brand) {
    this.updatedBrand = brand;
    this.isUpdate = true;
  }

  update() {
    if (this.brandUpdateForm.valid) {
      this.formBrandData = Object.assign({}, this.brandUpdateForm.value);

      this.brandService.getBrand(this.updatedBrand.id).subscribe((response) => {
        this.updatedBrand = response.data;
        this.updatedBrand.name = this.formBrandData.name;
        this.brandService.update(this.updatedBrand).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Marka Güncelleme');
            this.list();
          },
          (errorResponse) => {
            this.toastrService.error(
              errorResponse.error.message,
              'Marka Güncelleme'
            );
          }
        );
      });
    } else {
      this.toastrService.error(
        this.messagesService.notNullMessage,
        'Marka Güncelleme'
      );
    }
  }

  list() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  selectedBrandUpdate() {
    if (this.selectedBrandUpdateForm.valid) {
      this.formSelectedBrandData = Object.assign(
        {},
        this.selectedBrandUpdateForm.value
      );
      this.brand.name = this.formSelectedBrandData.name;
      this.brandService.update(this.brand).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Marka Güncelleme');
        },
        (responseError) => {
          this.toastrService.error(
            responseError.error.message,
            'Marka Güncelleme'
          );
        }
      );
    } else {
      this.toastrService.error(
        this.messagesService.notNullMessage,
        'Marka Güncelleme'
      );
    }
  }
}
