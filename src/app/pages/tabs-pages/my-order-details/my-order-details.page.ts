import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss'],
})
export class MyOrderDetailsPage implements OnInit {
  orderDetails: any = {
    id: 1,
    status: 1,
    requestStatus: 'waiting',
    requestNumber: 3288372,
    date: 'الخميس12 مارس 2021',
  };
  requestItems: any = [
    {
      text: 'orderNumber',
      value: '#' + this.orderDetails.requestNumber,
    },
    {
      text: 'orderStatus',
      value: this.orderDetails.requestStatus,
    },
    {
      text: 'orderStatus',
      value: this.orderDetails.date,
    },
  ];

  clientData: any = [
    {
      text: 'orderNumber',
      value: '#' + this.orderDetails.requestNumber,
    },
    {
      text: 'orderStatus',
      value: this.orderDetails.requestStatus,
    },
    {
      text: 'orderStatus',
      value: this.orderDetails.date,
    },
  ];
  constructor() {}

  ngOnInit() {}
}
