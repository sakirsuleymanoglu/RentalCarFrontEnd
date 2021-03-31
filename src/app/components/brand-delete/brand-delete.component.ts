import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {
  brand:Brand;
  brands:Brand[];

  constructor(private brandService:BrandService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params['brandId']){
        this.brandService.getBrand(params['brandId']).subscribe((response)=>{
          this.brand = response.data;
        });
      }else{
        this.brandService.getBrands().subscribe((response)=>{
          this.brands = response.data;
        });
      }
    });
  }

  delete(brand:Brand){
    this.brandService.delete(brand).subscribe((response)=>{
        alert("Silindi " + response.success);
    });
  }
  
}
