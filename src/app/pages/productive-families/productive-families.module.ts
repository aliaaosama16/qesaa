import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductiveFamiliesPageRoutingModule } from './productive-families-routing.module';

import { ProductiveFamiliesPage } from './productive-families.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductiveFamiliesPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [ProductiveFamiliesPage]
})
export class ProductiveFamiliesPageModule {}