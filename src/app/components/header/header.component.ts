import { UtilitiesService } from './../../services/utilities/utilities.service';
import { MenuController, Platform } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() isHome: boolean;
  @Input() haveBeforeHeader: boolean;
  @Input() hasMarketCart: boolean;
  currentPlatform: string;
  cartCount:number=0;

  constructor(
    private menuCtrl: MenuController,
    private platform: Platform,
    private location: Location,
    private util: UtilitiesService,
    private router:Router,
    private sectionsProductsService:SectionsProductsService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.location.back();
    });
    this.sectionsProductsService.getCartCount().subscribe((val) => {
      if (val != 0) {
        this.cartCount = val;
      } else {
        this.cartCount = 0;
      }
    });
  }

  ngOnInit() {
    console.log('current platform : ' + this.util.getCapacitorPlatform());
    this.currentPlatform = this.util.getCapacitorPlatform();
  }

  openMenu() {
    this.menuCtrl.open();
  }

  goBack() {
    this.location.back();
  }

  showUserCart(){
    this.router.navigateByUrl('/tabs/home/market/products');
  }
}
