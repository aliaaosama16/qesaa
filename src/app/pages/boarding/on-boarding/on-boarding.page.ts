import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SwiperOptions } from 'swiper';
import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  currentlangauge: string;
  boardingConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: false,
    effect: 'fade',
    allowTouchMove: false,
  };
  constructor(
    private langaugeService: LanguageService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.currentlangauge = this.langaugeService.getLanguage();
    this.menuCtrl.enable(false, 'main');
  }

  ngOnInit() {}

  nextSlide() {
    this.swiper.swiperRef.slideNext();
  }

  start() {
    this.setBoarding();

    this.router.navigateByUrl('/tabs');
  }

  async setBoarding() {
    await Storage.set({
      key: 'qessa-openBoarding',
      value: 'true',
    });
  }
}
