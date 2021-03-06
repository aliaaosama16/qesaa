import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GeneralSectionResponse } from 'src/app/models/general';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { ProductData, ProductResponse } from 'src/app/models/sections';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-charity-market-product',
  templateUrl: './charity-market-product.page.html',
  styleUrls: ['./charity-market-product.page.scss'],
})
export class CharityMarketProductPage implements OnInit {
  productDetails: GeneralSectionResponse;

  constructor(
    private router: Router,
    private util: UtilitiesService,
    private sectionsService: SectionsProductsService,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    private auth:AuthService
  ) {}

  ngOnInit() {
    console.log(
      'id : ' + JSON.stringify(this.activatedRoute.snapshot.paramMap.get('id'))
    );
    const productData: ProductData = {
      lang: this.languageService.getLanguage(),
      user_id:this.auth.userID.value,
      service_id: parseInt(this.activatedRoute.snapshot.paramMap.get('id')),
    };

    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.showService(productData).subscribe(
        (data: ProductResponse) => {
          if (data.key == 1) {
            this.productDetails = data.data;
            console.log('get priduct by  :' + this.productDetails);
          } else {
           // this.util.showMessage(data.msg);
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
    const productData: ProductData = {
      lang: this.languageService.getLanguage(),
      user_id:  this.auth.userID.value,
      service_id: parseInt(this.activatedRoute.snapshot.paramMap.get('id')),
    };

    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.addToCart(productData).subscribe(
        (data: ProductResponse) => {
          if (data.key == 1) {
            //this.productDetails = data.data;
            console.log('get priduct by  :' + this.productDetails);
            this.util.showMessage(data.msg).then((_) => {
              this.sectionsService.setCartCount();
              //this.router.navigateByUrl('/tabs/home/market/products');
            });
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
}
