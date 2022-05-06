import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsDetailsPageRoutingModule } from './news-details-routing.module';

import { NewsDetailsPage } from './news-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDetailsPageRoutingModule,
    SharedComponentModule,
    TranslateModule,
  ],
  declarations: [NewsDetailsPage],
})
export class NewsDetailsPageModule {}
