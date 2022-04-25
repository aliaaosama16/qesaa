import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupportProductiveFamiliesPageRoutingModule } from './support-productive-families-routing.module';

import { SupportProductiveFamiliesPage } from './support-productive-families.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupportProductiveFamiliesPageRoutingModule,SharedComponentModule
  ],
  declarations: [SupportProductiveFamiliesPage]
})
export class SupportProductiveFamiliesPageModule {}
