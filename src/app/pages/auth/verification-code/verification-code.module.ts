import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationCodePageRoutingModule } from './verification-code-routing.module';

import { VerificationCodePage } from './verification-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationCodePageRoutingModule
  ],
  declarations: [VerificationCodePage]
})
export class VerificationCodePageModule {}
