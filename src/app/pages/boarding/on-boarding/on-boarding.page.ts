import { SwiperOptions } from 'swiper';
import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {
  currentlangauge: string;
  boardingConfig :SwiperOptions= {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: false,
    effect: 'fade',
  };
  constructor(private langaugeService: LanguageService) {
    this.currentlangauge = this.langaugeService.getLanguage();
  }

  ngOnInit() {}
}
