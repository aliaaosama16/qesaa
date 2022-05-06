import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  currentLanguage:string;
  newsList: any = [
    {
      id: 1,
      title: 'test_title',
      content: 'test_subtitle',
      date: '‏12 مارس 2021',
      image:'./../../../../assets/images/news.svg'
    },
    {
      id: 2,
      title: 'test_title',
      content: 'test_subtitle',
      date: '‏12 مارس 2021',
      image:'./../../../../assets/images/news.svg'
    },
    {
      id: 3,
      title: 'test_title',
      content: 'test_subtitle',
      date: '‏12 مارس 2021',
      image:'./../../../../assets/images/news.svg'
    },
    {
      id: 4,
      title: 'test_title',
      content: 'test_subtitle',
      date: '‏12 مارس 2021',
      image:'./../../../../assets/images/news.svg'
    },
    {
      id: 5,
      title: 'test_title',
      content: 'test_subtitle',
      date: '‏12 مارس 2021',
      image:'./../../../../assets/images/news.svg'
    },
  ];
  constructor(private languageService:LanguageService) {
    this.currentLanguage=this.languageService.getLanguage();
  }

  ngOnInit() {}
}
