import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonationOrderPageRoutingModule } from './donation-order-routing.module';

import { DonationOrderPage } from './donation-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationOrderPageRoutingModule
  ],
  declarations: [DonationOrderPage]
})
export class DonationOrderPageModule {}
