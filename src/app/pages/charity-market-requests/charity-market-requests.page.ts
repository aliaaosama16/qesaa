import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charity-market-requests',
  templateUrl: './charity-market-requests.page.html',
  styleUrls: ['./charity-market-requests.page.scss'],
})
export class CharityMarketRequestsPage implements OnInit {
// 1 waiting 2 canceled 3  confirmed
  requests:any=[
    {
      id:1,
      status:1,
      requestStatus:'waiting',
      requestNumber:3288372,
      date:'الخميس12 مارس 2021'
    },
    {
      id:2,
      status:2,
      requestStatus:'canceled',
      requestNumber:3288372,
      date:'الخميس12 مارس 2021'
    },
    {
      id:3,
      status:3,
      requestStatus:'confirmed',
      requestNumber:3288372,
      date:'الخميس12 مارس 2021'
    },
    {
      id:4,
      status:1,
      requestStatus:'waiting',
      requestNumber:3288372,
      date:'الخميس12 مارس 2021'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
