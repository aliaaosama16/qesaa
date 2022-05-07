import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  galleyType: string = 'images';
  images: any = [
    {
      id: 1,
      image: './../../../../assets/images/images.svg',
    },
    {
      id: 2,
      image: './../../../../assets/images/images.svg',
    },
    {
      id: 3,
      image: './../../../../assets/images/images.svg',
    },
    {
      id: 4,
      image: './../../../../assets/images/images.svg',
    },
    {
      id: 5,
      image: './../../../../assets/images/images.svg',
    },
  ];
  videos: any = [
    {
      id: 1,
      image: './../../../../assets/images/video.svg',
    },
    {
      id: 2,
      image: './../../../../assets/images/video.svg',
    },
    {
      id: 3,
      image: './../../../../assets/images/video.svg',
    },
    {
      id: 4,
      image: './../../../../assets/images/video.svg',
    },
    {
      id: 5,
      image: './../../../../assets/images/video.svg',
    },
  ];
  currentLanguage: string;
  constructor(private langaugeService: LanguageService) {
    this.currentLanguage = this.langaugeService.getLanguage();
  }

  ngOnInit() {}

  galleyTypeChoose($event) {
    console.log($event.target.value);
    this.galleyType = $event.target.value;
  }
}
