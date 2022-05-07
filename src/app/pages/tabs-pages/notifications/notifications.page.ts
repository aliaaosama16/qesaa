import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications:any=[
    {
      id:1,
      title:'تم الموافقة على طلبك',
      date:'الأن'
    },
    {
      id:2,
      title:'تم الموافقة على طلبك',
      date:'منذ 5 دقائق'
    },
    {
      id:3,
      title:'تم الموافقة على طلبك',
      date:'الأن'
    },
    {
      id:4,
      title:'تم الموافقة على طلبك',
      date:'منذ 5 دقائق'
    },
    {
      id:5,
      title:'تم الموافقة على طلبك',
      date:'الأن'
    },
    {
      id:6,
      title:'تم الموافقة على طلبك',
      date:'الأن'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
