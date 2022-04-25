import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactWithUsPageRoutingModule } from './contact-with-us-routing.module';

import { ContactWithUsPage } from './contact-with-us.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactWithUsPageRoutingModule,SharedComponentModule
  ],
  declarations: [ContactWithUsPage]
})
export class ContactWithUsPageModule {}
