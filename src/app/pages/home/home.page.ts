import { UtilitiesService } from './../../services/utilities/utilities.service';
import { MenuController } from '@ionic/angular';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  configSlider: SwiperOptions;
  partenrsConfig:SwiperOptions;
  partenrs:any[]=[
    './../../../assets/icon/logos/img1.svg',
    './../../../assets/icon/logos/img2.svg',
    './../../../assets/icon/logos/img3.svg',
    './../../../assets/icon/logos/img4.svg',
  ];
  Sliders: any[];
  platform: string = '';
  currentlangauge: string;
  constructor(
    private menuCtrl: MenuController,
    private util: UtilitiesService,
    private langaugeservice: LanguageService
  ) {
    this.platform = this.util.platform;
    this.currentlangauge = this.langaugeservice.getLanguage();
  }

  ngOnInit() {
    this.configSlider = {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: true,
      effect: 'fade',
      autoplay: true,
      loop:true
    };

    this.partenrsConfig={
    slidesPerView: 3.1,
    spaceBetween: 3,
    pagination: false,
    effect: 'fade',
   
  };
    this.Sliders = [
      { image: './../../../assets/images/1024-500.png', id: 1 },
      { image: './../../../assets/images/1024-500.png', id: 2 },
      { image: './../../../assets/images/1024-500.png', id: 3 },
    ];
  }

  openMenu() {
    this.menuCtrl.open();
  }
}
