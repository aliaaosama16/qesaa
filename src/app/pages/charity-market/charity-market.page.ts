import { UtilitiesService } from './../../services/utilities/utilities.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { GeneralSectionResponse, UserData } from 'src/app/models/general';
import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import {
  SectionProductsData,
  SectionProductsResponse,
  SectionResponse,
} from 'src/app/models/sections';

@Component({
  selector: 'app-charity-market',
  templateUrl: './charity-market.page.html',
  styleUrls: ['./charity-market.page.scss'],
})
export class CharityMarketPage implements OnInit {
  selectedIndex: number = 0;
  categoriesConfig: SwiperOptions;
  currentlangauge: string;
  sections: GeneralSectionResponse[];
  sectionProducts: GeneralSectionResponse[];
  constructor(
    private languageService: LanguageService,
    private util: UtilitiesService,
    private sectionsService: SectionsProductsService
  ) {
    this.currentlangauge = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.categoriesConfig = {
      slidesPerView: 3.4,
      spaceBetween: 6,
      pagination: false,
      effect: 'fade',
    };

    const sectionData: UserData = {
      lang: this.languageService.getLanguage(),
      user_id: 1,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.sectionsService.getAllSections(sectionData).subscribe(
        (data: SectionResponse) => {
          if (data.key == 1) {
            this.sections = data.data;
            console.log('all sections :' + this.sections);
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

  segmentChanged($event) {
    console.log('selected :' + $event.target.value);

    const sectionProductsData: SectionProductsData = {
      lang: this.languageService.getLanguage(),
      user_id: 1,
      section_id: $event.target.value,
    };
    this.sectionProducts = [
      {
        id: '1',
        title: 'تيشرت',
        desc: 'تيشرت تيشرت تيشرت تيشرت تيشرت تيشرت تيشرت تيشرت',
        section_id: 2,
        section_title: 'ملابس',
        image:
          'https://kesa.sa/public/images/sections/25-04-221650898645400326334.png',
      },
      {
        id: '1',
        title: 'تيشرت',
        desc: 'تيشرت تيشرت تيشرت تيشرت تيشرت تيشرت تيشرت تيشرت',
        section_id: 2,
        section_title: 'ملابس',
        image:
          'https://kesa.sa/public/images/sections/25-04-221650898645400326334.png',
      },
      {
        id: '1',
        title: 'تيشرت',
        desc: 'تيشرت تيشرت تيشرت تيشرت تيشرت تيشرت تيشرت تيشرت',
        section_id: 2,
        section_title: 'ملابس',
        image:
          'https://kesa.sa/public/images/sections/25-04-221650898645400326334.png',
      },
    ];
    // this.util.showLoadingSpinner().then((__) => {
    //   this.sectionsService.getSectionByID(sectionProductsData).subscribe(
    //     (data: SectionProductsResponse) => {
    //       if (data.key == 1) {
    //         this.sectionProducts = data.data;
    //         console.log('all products by section :' + this.sections);
    //       } else {
    //         this.util.showMessage(data.msg);
    //       }
    //       this.util.dismissLoading();
    //     },
    //     (err) => {
    //       this.util.dismissLoading();
    //     }
    //   );
    // });
  }
}
