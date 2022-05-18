import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GeneralSectionResponse } from 'src/app/models/general';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ProductData, ProductResponse } from 'src/app/models/sections';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-charity-market-product',
  templateUrl: './charity-market-product.page.html',
  styleUrls: ['./charity-market-product.page.scss'],
})
export class CharityMarketProductPage implements OnInit {
  productDetails: GeneralSectionResponse;
  // : any = {
  //   id: 1,
  //   name: 'اسم المنتج',
  //   categoryName: 'اسم القسم',
  //   description:
  //     'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.',
  //   image: './../../../assets/images/product.svg',
  // };
  constructor(
    private router: Router,
    private util: UtilitiesService,
    private sectionsService: SectionsProductsService,
    private activatedRoute:ActivatedRoute,
    private languageService:LanguageService
  ) {}

  ngOnInit() {
   console.log('id : '+JSON.stringify(this.activatedRoute.snapshot.paramMap.get('id')));
    const productData: ProductData = {
      lang: this.languageService.getLanguage(),
      user_id: 1,
      service_id: parseInt(this.activatedRoute.snapshot.paramMap.get('id')),
    };

    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.showService(productData).subscribe(
        (data: ProductResponse) => {
          if (data.key == 1) {
            this.productDetails = data.data;
             console.log('get priduct by  :' +   this.productDetails );
          } else {
            this.util.showMessage(data.msg);
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  addProduct() {
    // call api to add this product to charity cart
    // show toast to successful addtion
    this.router.navigateByUrl('/tabs/home/market/products');
  }
}
