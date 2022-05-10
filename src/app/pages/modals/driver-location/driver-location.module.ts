import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DriverLocationPageRoutingModule } from './driver-location-routing.module';

import { DriverLocationPage } from './driver-location.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DriverLocationPageRoutingModule
  ],
  declarations: [DriverLocationPage]
})
export class DriverLocationPageModule {}
