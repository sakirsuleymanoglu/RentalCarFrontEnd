import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CardtoComponent } from './components/cardto/cardto.component';
import { FilterPipe } from './pipes/filterPipe';
import { RentalAddComponent } from './components/rental-add/rental-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
    CustomerComponent,
    RentalComponent,
    CardtoComponent,
    FilterPipe,
    RentalAddComponent,
    PaymentComponent,
    BrandAddComponent,
    CarAddComponent,
    ColorAddComponent,
    CarDeleteComponent,
    CarUpdateComponent,
    BrandDeleteComponent,
    BrandUpdateComponent,
    ColorDeleteComponent,
    ColorUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
