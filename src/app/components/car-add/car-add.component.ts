import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brands:Brand[];
  colors:Color[];
  carAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private colorService:ColorService) { }

  ngOnInit(): void {
    this.createCarAddForm();
    this.listBrands();
    this.listColors();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      model: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  listBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data;
    });
  }

  listColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data;
    });
  }


}
