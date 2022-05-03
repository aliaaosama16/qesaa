import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.page.html',
  styleUrls: ['./our-services.page.scss'],
})
export class OurServicesPage implements OnInit {
  services: any = [
    {
      id: 1,
      title: 'عنوان الخدمة',
      icon:'./../../../../assets/icon/services/icon1.svg'
    },
    {
      id: 2,
      title: 'عنوان الخدمة',
      icon:'./../../../../assets/icon/services/icon2.svg'
    },
    {
      id: 3,
      title: 'عنوان الخدمة',
      icon:'./../../../../assets/icon/services/icon3.svg'
    },
    {
      id: 4,
      title: 'عنوان الخدمة',
      icon:'./../../../../assets/icon/services/icon1.svg'
    },
    {
      id: 5,
      title: 'عنوان الخدمة',
      icon:'./../../../../assets/icon/services/icon2.svg'
    },
    {
      id: 5,
      title: 'عنوان الخدمة',
      icon:'./../../../../assets/icon/services/icon1.svg'
    },
    {
      id: 6,
      title: 'عنوان الخدمة',
      icon:'./../../../../assets/icon/services/icon3.svg'
    },
    {
      id: 7,
      title: 'عنوان الخدمة',
      icon:'./../../../../assets/icon/services/icon2.svg'
    },
  ];
  constructor() {}

  ngOnInit() {}
}
