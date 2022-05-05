import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-charity-market',
  templateUrl: './charity-market.page.html',
  styleUrls: ['./charity-market.page.scss'],
})
export class CharityMarketPage implements OnInit {
  categoriesConfig:SwiperOptions;
  currentlangauge:string;
  categories:any=[
    {
      id:1,
      title:'اسم القسم'
    },
    {
      id:2,
      title:'اسم القسم'
    },
    {
      id:3,
      title:'اسم القسم'
    },
    {
      id:4,
      title:'اسم القسم'
    },
     {
      id:5,
      title:'اسم القسم'
    },
    {
      id:6,
      title:'اسم القسم'
    }
  ]
  products:any=[
    {
      id:1,
      title:'طلب المنتج',
      icon:'./../../../assets/icon/market-icon.svg'
    },
    {
      id:2,
      title:'طلب المنتج',
      icon:'./../../../assets/icon/market-icon.svg'
    },
    {
      id:3,
      title:'طلب المنتج',
      icon:'./../../../assets/icon/market-icon.svg'
    },
    {
      id:4,
      title:'طلب المنتج',
      icon:'./../../../assets/icon/market-icon.svg'
    },
    {
      id:5,
      title:'طلب المنتج',
      icon:'./../../../assets/icon/market-icon.svg'
    },
    {
      id:6,
      title:'طلب المنتج',
      icon:'./../../../assets/icon/market-icon.svg'
    },
    {
      id:7,
      title:'طلب المنتج',
      icon:'./../../../assets/icon/market-icon.svg'
    },
    {
      id:8,
      title:'طلب المنتج',
      icon:'./../../../assets/icon/market-icon.svg'
    },
    {
      id:9,
      title:'طلب المنتج',
      icon:'./../../../assets/icon/market-icon.svg'
    }
  ]
  constructor(private languageService:LanguageService) { 
    this.currentlangauge=this.languageService.getLanguage();
  }

  ngOnInit() {

    this.categoriesConfig = {
      slidesPerView: 3.4,
      spaceBetween: 6,
      pagination: false,
      effect: 'fade',
    };
  }

}
