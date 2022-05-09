import { LanguageService } from 'src/app/services/language/language.service';
import { SwiperOptions } from 'swiper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss'],
})
export class MyOrderDetailsPage implements OnInit {

  orderConfig:SwiperOptions;
  currentlangauge :string;
  orderImages:any=[
    './../../../../assets/images/projects/img2.svg',
    './../../../../assets/images/projects/img1.svg',
    './../../../../assets/images/projects/img2.svg',
    './../../../../assets/images/projects/img3.svg'
  ]
  orderDetails:any={
    id:1,
    status:1,
    requestStatus:'waiting',
    requestNumber:3288372,
    date:'الخميس12 مارس 2021'
  };
  requestItems:any=[
    {
      text:"orderNumber",
      value:'#'+this.orderDetails.requestNumber
    },
    {
      text:"orderStatus",
      value:this.orderDetails.requestStatus
    },
    {
      text:"orderStatus",
      value:this.orderDetails.date
    }
  ];

  clientData:any=[
    {
      text:"cleint-name",
      value:"محمد احمد"
    },
    {
      text:"city",
      value:"الرياض"
    },
    {
      text:"the area or neighborhood",
      value:"حي الملز"
    }
  ];
  constructor(private languageService:LanguageService) { 
    this.orderConfig= {
      slidesPerView: 3,
      spaceBetween: 11,
      pagination: false,
      effect: 'fade',
    };
    this.currentlangauge=this.languageService.getLanguage();
  }

  ngOnInit() {
  }

}
