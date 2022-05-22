import { UserData } from './../../../models/general';
import { Order, OrderListResponse, OrderResponse } from './../../../models/order';
import { OrdersService } from './../../../services/orders/orders.service';
import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  orders: Order[];
  constructor(
    private util: UtilitiesService,
    private orderService: OrdersService,
    private languageService: LanguageService,
    private auth:AuthService
  ) {}

  ngOnInit() {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
    };
    this.showAllOrdersByUserId(userData);
  }

  showAllOrdersByUserId(userData: UserData) {
    this.util.showLoadingSpinner().then((__) => {
      this.orderService.showAllorders(userData).subscribe(
        (data: OrderListResponse) => {
          if (data.key == 1) {
            this.orders=data.data;
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }
}
