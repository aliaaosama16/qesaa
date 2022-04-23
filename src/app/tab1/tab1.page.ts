import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DonationOrderPage } from '../pages/donation-order/donation-order.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private modalController:ModalController) {}

  async openModal(){
   
      const modal = await this.modalController.create({
        component: DonationOrderPage,
        cssClass: 'my-custom-class',
        componentProps: {
          'firstName': 'Douglas',
          'lastName': 'Adams',
          'middleInitial': 'N'
        }
      });
      return await modal.present();
    }
  
}
