import { CharityGoalsMessageComponent } from './charity-goals-message/charity-goals-message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [HeaderComponent,CharityGoalsMessageComponent],
  imports: [CommonModule, IonicModule, TranslateModule.forChild()],
  exports: [HeaderComponent,CharityGoalsMessageComponent],
})
export class SharedComponentModule {}
