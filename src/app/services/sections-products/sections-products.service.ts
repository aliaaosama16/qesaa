import { GeneralResponse, UserData } from './../../models/general';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../language/language.service';
import { UtilitiesService } from '../utilities/utilities.service';
import {
  CartData,
  ProductData,
  ProductResponse,
  ProductsResponse,
  SectionProductsData,
  SectionProductsResponse,
  SectionResponse,
  StoreOrderData,
} from 'src/app/models/sections';

@Injectable({
  providedIn: 'root',
})
export class SectionsProductsService {
  cartCount = new BehaviorSubject(0);
  constructor(
    private httpclient: HttpClient,
    private languageService: LanguageService,
    private util: UtilitiesService
  ) {}

  setCartCount() {
    const cartData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: 1,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.showCart(cartData).subscribe(
        (data: ProductsResponse) => {
          if (data.key == 1) {
            console.log('cart products  :' + data.data);
            this.cartCount.next(data.data.length);
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

  getCartCount(): Observable<number> {
    return this.cartCount.asObservable();
  }

  getAllSections(data: UserData): Observable<SectionResponse> {
    return this.httpclient.post<SectionResponse>(
      `${environment.BASE_URL}sections`,
      data
    );
  }

  getSectionByID(
    data: SectionProductsData
  ): Observable<SectionProductsResponse> {
    return this.httpclient.post<SectionProductsResponse>(
      `${environment.BASE_URL}services`,
      data
    );
  }

  showService(data: ProductData): Observable<ProductResponse> {
    return this.httpclient.post<ProductResponse>(
      `${environment.BASE_URL}show-service`,
      data
    );
  }

  addToCart(data: ProductData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}add-to-cart`,
      data
    );
  }

  updateToCart(data: CartData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}update-to-cart`,
      data
    );
  }

  showCart(data: UserData): Observable<ProductsResponse> {
    return this.httpclient.post<ProductsResponse>(
      `${environment.BASE_URL}show-cart`,
      data
    );
  }

  // StoreOrderData

  storeOrder(data: StoreOrderData): Observable<ProductsResponse> {
    return this.httpclient.post<ProductsResponse>(
      `${environment.BASE_URL}store-order`,
      data
    );
  }
}
