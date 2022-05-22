import { ActivatedRoute } from '@angular/router';
import { OrdersService } from './../../../services/orders/orders.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { SwiperOptions } from 'swiper';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DriverLocationPage } from '../../modals/driver-location/driver-location.page';
import { ImageModalPage } from '../../modals/image-modal/image-modal.page';
import { Order, OrderData, OrderResponse } from 'src/app/models/order';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss'],
})
export class MyOrderDetailsPage implements OnInit {
  orderConfig: SwiperOptions;
  currentlangauge: string;
  // orderImages: any = [
  //   {
  //     id: 1,
  //     image: './../../../../assets/images/projects/img1.svg',
  //   },
  //   {
  //     id: 2,
  //     image: './../../../../assets/images/projects/img2.svg',
  //   },
  //   {
  //     id: 3,
  //     image: './../../../../assets/images/projects/img3.svg',
  //   },
  //   {
  //     id: 4,
  //     image: './../../../../assets/images/projects/img1.svg',
  //   },
  //   {
  //     id: 5,
  //     image: './../../../../assets/images/projects/img2.svg',
  //   },
  //   {
  //     id: 6,
  //     image: './../../../../assets/images/projects/img1.svg',
  //   },
  // ];
  orderDetails: Order;
  // any = {
  //   id: 1,
  //   status: 1,
  //   requestStatus: 'waiting',
  //   requestNumber: 3288372,
  //   date: 'الخميس12 مارس 2021',
  //   cleintName: 'محمد احمد',
  //   city: 'الرياض',
  //   neighborhood: 'حي الملز',
  //   number: '+966588278222',
  //   notices:
  //     'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام  فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال  في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.',
  // };
  // requestItems: any = [
  //   {
  //     text: 'orderNumber',
  //     value: '#' + this.orderDetails.requestNumber,
  //   },
  //   {
  //     text: 'orderStatus',
  //     value: this.orderDetails.requestStatus,
  //   },
  //   {
  //     text: 'orderDate',
  //     value: this.orderDetails.date,
  //   },
  // ];

  // clientData: any = [
  //   {
  //     text: 'cleint-name',
  //     value: this.orderDetails.cleintName,
  //   },
  //   {
  //     text: 'city',
  //     value: this.orderDetails.city,
  //   },
  //   {
  //     text: 'the area or neighborhood',
  //     value: this.orderDetails.neighborhood,
  //   },
  // ];
  constructor(
    private LanguageService: LanguageService,
    private modalController: ModalController,
    private modalCtrl: ModalController,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private orderService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private auth:AuthService
  ) {
    this.currentlangauge = this.LanguageService.getLanguage();
  }

  ngOnInit() {
    const orderData: OrderData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      order_id: parseInt(this.activatedRoute.snapshot.paramMap.get('id')),
    };
    this.showOrderByOederID(orderData);
    this.orderConfig = {
      slidesPerView: 3,
      spaceBetween: 11,
      pagination: false,
      effect: 'fade',
    };
  }

  async openPreview(itemImages, currentImage) {
    console.log('open iamges modal');
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      cssClass: 'transparent-modal',
      componentProps: {
        images: itemImages,
        imageID: currentImage,
      },
    });
    modal.present();
  }

  async driverTrack() {
    const modal = await this.modalController.create({
      component: DriverLocationPage,
      componentProps: {
        lat: this.orderDetails.lat,
        lng: this.orderDetails.lng,
      },
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.5, 0.75, 1],
    });
    return await modal.present();
  }

  showOrderByOederID(orderData: OrderData) {
    this.util.showLoadingSpinner().then((__) => {
      this.orderService.showOrderByOederID(orderData).subscribe(
        (data: OrderResponse) => {
          if (data.key == 1) {
            this.orderDetails = data.data;
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
