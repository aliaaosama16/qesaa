import { UserData } from './../../../models/general';
import {
  Order,
  OrderListResponse,
  OrderResponse,
} from './../../../models/order';
import { OrdersService } from './../../../services/orders/orders.service';
import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data/data.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  orders: Order[];
  volunteerOrders: Order[] = [];
  serviceOrders: Order[] = [];
  orderType: string = 'volunteers';
  userData: UserData;
  constructor(
    private util: UtilitiesService,
    private orderService: OrdersService,
    private languageService: LanguageService,
    private auth: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.userData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
    };
    this.showAllOrdersByUserId('volunteer');
  }

  showAllOrdersByUserId(type: string) {
    this.util.showLoadingSpinner().then((__) => {
      this.orderService.showAllorders(this.userData).subscribe(
        (data: OrderListResponse) => {
          if (data.key == 1) {
            this.orders = data.data;

            if (type == 'charity-market') {
              this.serviceOrders = this.orders.filter(
                (item) => item.type === 'service'
              );
            } else {
              this.volunteerOrders = this.orders.filter(
                (item) => item.type === 'volunteer'
              );
            }
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  orderTypeChoose($event) {
    this.orderType = $event.detail.value;
    console.log($event.detail.value);
    this.showAllOrdersByUserId($event.detail.value);
  }

  showOrder(orderID, page) {
    this.dataService.setPageData(page);
    this.router.navigateByUrl(`/tabs/my-orders/details/${orderID}`);
  }
}
