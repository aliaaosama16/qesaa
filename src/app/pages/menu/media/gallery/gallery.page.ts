import {
  Artical,
  ArticalsData,
  ArticalsDataResponse,
  ArticalType,
} from 'src/app/models/articals';

import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LanguageService } from 'src/app/services/language/language.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { MediaService } from 'src/app/services/media/media.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  galleyType: string = 'photos';
  currentLanguage: string = '';
  galleryPhotos: Artical[]=[] ;
  galleryVideos: Artical[]=[] ;
  articalData: ArticalsData;
  articalDataResponse: ArticalsDataResponse;
  constructor(
    private platform: Platform,
    private location: Location,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private mediaService: MediaService,
    private auth: AuthService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.location.back();
    });
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.showPhotos('photos');
  }

  showPhotos(type: string) {
     //this.gallery =[];

    const articalData: ArticalsData = {
      lang: this.languageService.getLanguage(),
      type: type,
    };

    this.util.showLoadingSpinner().then((__) => {
      this.mediaService.articals(articalData).subscribe(
        (data: ArticalsDataResponse) => {
          if (data.key == 1) {

            if(type=='photos'){
              this.galleryPhotos = data.data;
            }else{
              this.galleryVideos= data.data;
            }
            
           // console.log('gallery  :  ' + JSON.stringify(this.gallery));
            //this.util.showMessage(data.msg);
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

  galleyTypeChoose($event) {
    this.galleyType = $event.detail.value;
    console.log($event.detail.value);
    // if ($event.detail.value == 0) {
    //   this.showPhotos($event.detail.value);
    // } else if ($event.detail.value == 1) {
    this.showPhotos($event.detail.value);
    //}
  }
}
