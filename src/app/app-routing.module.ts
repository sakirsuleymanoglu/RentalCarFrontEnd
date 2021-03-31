import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDeleteComponent } from './components/brand-delete/brand-delete.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardtoComponent } from './components/cardto/cardto.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDeleteComponent } from './components/color-delete/color-delete.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalAddComponent } from './components/rental-add/rental-add.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/car/:carId', component: CardtoComponent },
  { path: 'cars/car/:carId/rental/add', component: RentalAddComponent },
  {
    path:
      'cars/car/:carId/rental/payment/customer/:customerId/rentDate/:rentDate/returnDate/:returnDate',
    component: PaymentComponent,
  },
  {path:'car/add', component:CarAddComponent},
  {path:'car/delete', component:CarDeleteComponent},
  {path:'car/update', component:CarUpdateComponent},
  {path:'brand/add', component:BrandAddComponent},
  {path:'brand/delete', component:BrandDeleteComponent},
  {path:'brand/update', component:BrandUpdateComponent},
  {path:'color/add', component:ColorAddComponent},
  {path:'color/delete', component:ColorDeleteComponent},
  {path:'color/update', component:ColorUpdateComponent},
  {path:'brand/update/:brandId', component:BrandUpdateComponent},
  {path:'brand/delete/:brandId', component:BrandDeleteComponent},
  {path:'color/update/:colorId', component:ColorUpdateComponent},
  {path:'color/delete/:colorId', component:ColorDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
