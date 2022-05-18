import { Component, OnInit } from '@angular/core';
import { GeneralSectionResponse, UserData, GeneralResponse } from 'src/app/models/general';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/services/language/language.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { CartCount, CartData, ProductsResponse } from '../../models/sections';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';

@Component({
  selector: 'app-charity-market-products',
  templateUrl: './charity-market-products.page.html',
  styleUrls: ['./charity-market-products.page.scss'],
})
export class CharityMarketProductsPage implements OnInit {
  products: GeneralSectionResponse[];

  constructor(
    private router: Router,
    private util: UtilitiesService,
    private languageService: LanguageService,
    private sectionsService: SectionsProductsService
  ) {}

  ngOnInit() {
    const cartData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: 1,
    };
    this.getCartProducts(cartData);
  }

  getCartProducts(cartData: UserData) {
    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.showCart(cartData).subscribe(
        (data: ProductsResponse) => {
          if (data.key == 1) {
            this.products = data.data;
            console.log('cart products  :' + this.products);
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

  deleteProduct(productID) {
    console.log('delete product with id : '+productID);
    const cartData:  CartData= {
      lang: this.languageService.getLanguage(),
      user_id: 1,
      cart_id:productID,
      count:CartCount.delete
    };
    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.updateToCart(cartData).subscribe(
        (data: GeneralResponse) => {
          if (data.key == 1) {
           this.util.showMessage(data.msg).then((_)=>{
            const cartData: UserData = {
              lang: this.languageService.getLanguage(),
              user_id: 1,
            };
            this.getCartProducts(cartData);
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

  checkout() {}
}
