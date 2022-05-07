import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  orders:any=[
    {
      id:1,
      orderID:'6868',
      orderStatus:'waiting',
      status:3,
      date:'الخميس12 مارس 2021'
    },
    {
      id:2,
      orderID:'6868',
      status:3,
      orderStatus:'waiting',
      date:'الخميس12 مارس 2021'
    },
    {
      id:3,
      orderID:'6868',
      status:3,
      orderStatus:'waiting',
      date:'الخميس12 مارس 2021'
    },
    {
      id:4,
      orderID:'6868',
      status:1,
      orderStatus:'already-delivered',
      date:'الخميس12 مارس 2021'
    },
    {
      id:5,
      orderID:'6868',
      status:3,
      orderStatus:'waiting',
      date:'الخميس12 مارس 2021'
    },
    {
      id:6,
      orderID:'6868',
      status:3,
      orderStatus:'waiting',
      date:'الخميس12 مارس 2021'
    },
    {
      id:7,
      orderID:'6868',
      status:2,
      orderStatus:'refused',
      date:'الخميس12 مارس 2021'
    },
    {
      id:8,
      orderID:'6868',
      status:3,
      orderStatus:'waiting',
      date:'الخميس12 مارس 2021'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
