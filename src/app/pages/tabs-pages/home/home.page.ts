import { GeneralSectionResponse, UserData } from './../../../models/general';
import { Router } from '@angular/router';
import { UtilitiesService } from './../../../services/utilities/utilities.service';
import { MenuController } from '@ionic/angular';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { LanguageService } from 'src/app/services/language/language.service';
import { DataService } from 'src/app/services/data/data.service';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { HomeService } from 'src/app/services/home/home.service';
import { HomeResponse } from 'src/app/models/home';
import { StaticPageResponse, StaticPageTitle } from 'src/app/models/staticPage';
import { GeneralService } from 'src/app/services/general/general.service';
SwiperCore.use([Pagination, Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  configSlider: SwiperOptions;
  partenrsConfig: SwiperOptions;
  feedbackConfig: SwiperOptions;
  partenrs: GeneralSectionResponse[];
  people_feedback: GeneralSectionResponse[];
  Sliders: GeneralSectionResponse[];
  volunteers_count: string = '0';
  beneficiaries_count: string = '0';
  satisfaction_masure: string = '0';
  platform: string = '';
  currentlangauge: string;
  appData: any;
  appDataResponse: GeneralSectionResponse[];
  constructor(
    private menuCtrl: MenuController,
    private util: UtilitiesService,
    private general: GeneralService,
    private router: Router,
    private data: DataService,
    private home: HomeService,
    private languageService: LanguageService
  ) {
    this.platform = this.util.platform;
    this.currentlangauge = this.languageService.getLanguage();
    this.menuCtrl.enable(true, 'main');
  }

  ngOnInit() {
    this.configSlider = {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: true,
      effect: 'fade',
      autoplay: true,
      loop: true,
    };

    this.partenrsConfig = {
      slidesPerView: 3.1,
      spaceBetween: 24,
      pagination: false,
      effect: 'fade',
    };

    this.feedbackConfig = {
      slidesPerView: 2,
      spaceBetween: 13,
      pagination: false,
      effect: 'fade',
    };

    const userData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: 1,
    };
    this.getHomeData(userData);

    const statisPageList = [
      {
        type: StaticPageTitle.goals,
      },
      {
        type: StaticPageTitle.message,
      },
      {
        type: StaticPageTitle.message,
      },
    ];

    for (let i = 0; i < statisPageList.length; i++) {
      this.appData = {
        lang: this.languageService.getLanguage(),
        user_id: 1,
        title: statisPageList[i].type,
      };
      this.util.showLoadingSpinner().then((__) => {
        this.general.staticPages(this.appData).subscribe(
          (data: StaticPageResponse) => {
            if (data.key == 1) {
              this.appDataResponse.push({
                title: data.data.title,
                desc: data.data.desc,
              });

              console.log(
                ' appDataResponse  res : ' +
                  JSON.stringify(this.appDataResponse)
              );
              this.util.showMessage(data.msg);
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

  openMenu() {
    this.menuCtrl.open();
  }

  charityInfo(title: string, content: string) {
    this.router.navigate(['/tabs/home/info']);
    this.data.setPageData(title, title, content);
  }

  getHomeData(userData: UserData) {
    this.util.showLoadingSpinner().then((__) => {
      this.home.home(userData).subscribe(
        (data: HomeResponse) => {
          if (data.key == 1) {
            this.partenrs = data.data?.partners;
            this.Sliders = data.data?.sliders;
            this.people_feedback = data.data?.says;
            this.volunteers_count = data.data.volunteers_count;
            this.satisfaction_masure = data.data?.satisfaction_masure;
            this.beneficiaries_count = data.data?.beneficiaries_count;

            // this.sections = data.data.sections;
            // this.Sliders = data.data.sliders;
            // this.nearDepartments = data.data.near_departments;
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
