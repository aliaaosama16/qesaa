import { LanguageService } from 'src/app/services/language/language.service';
import { SwiperOptions } from 'swiper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss'],
})
export class MyOrderDetailsPage implements OnInit {
  orderConfig: SwiperOptions;
  currentlangauge: string;
  orderImages: any = [
    './../../../../assets/images/projects/img1.svg',
    './../../../../assets/images/projects/img2.svg',
    './../../../../assets/images/projects/img3.svg',
    './../../../../assets/images/projects/img1.svg',
    './../../../../assets/images/projects/img3.svg',
  ];
  orderDetails: any = {
    id: 1,
    status: 1,
    requestStatus: 'waiting',
    requestNumber: 3288372,
    date: 'الخميس12 مارس 2021',
    cleintName: 'محمد احمد',
    city: 'الرياض',
    neighborhood: 'حي الملز',
    notices:"هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام  فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال  في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها."
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
      text: 'orderDate',
      value: this.orderDetails.date,
    },
  ];

  clientData: any = [
    {
      text: 'cleint-name',
      value: this.orderDetails.cleintName,
    },
    {
      text: 'city',
      value: this.orderDetails.city,
    },
    {
      text: 'the area or neighborhood',
      value: this.orderDetails.neighborhood,
    },
  ];
  constructor(private LanguageService: LanguageService) {
    this.currentlangauge = this.LanguageService.getLanguage();
  }

  ngOnInit() {
    this.orderConfig = {
      slidesPerView: 3,
      spaceBetween: 11,
      pagination: false,
      effect: 'fade',
    };
  }

  driverContact(){

  }
}
