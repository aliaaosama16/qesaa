import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AuthData } from './models/auth';
import { AuthService } from './services/auth/auth.service';
import { LanguageService } from './services/language/language.service';
import { NetworkService } from './services/network/network.service';
import { UtilitiesService } from './services/utilities/utilities.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentLanguage: string = '';
  language: string = '';
  selectedIndex: number;
  logoutData: AuthData;
  logined: boolean = this.auth.isAuthenticated.value;

  pages = [
    {
      title: 'about',
      url: '/tabs/about',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'our-services',
      url: '/tabs/our-services',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'news',
      url: '/tabs/news',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'our-projects',
      url: '/tabs/our-projects',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'gallery',
      url: '/tabs/gallery',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'volunteer with us',
      url: '/tabs/volunteer-with-us',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'Supporting productive families',
      url: '/tabs/support-productive-families',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'share app',
      url: 'share',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'our presence',
      url: '/tabs/our-presence',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'contact us',
      url: '/tabs/contact-with-us',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'Suggestions and complaints',
      url: '/tabs/suggestions',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
    {
      title: 'Terms and Conditions',
      url: '/tabs/rules',
      iconActive: './../assets/icon/home-active.svg',
      iconInActive: './../assets/icon/home-inactive.svg',
    },
  ];

  constructor(
    private platform: Platform,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private router: Router,
    private alertController: AlertController,
    private translate: TranslateService,
    private network: NetworkService,
    private menuCtrl: MenuController,
    private auth: AuthService
  ) {
    this.initializeApp();

    // this.auth.getLoginedObservable().subscribe((val) => {
    //   this.logined = val;
    // });

    this.languageService.getUpdatedLanguage().subscribe((val) => {
      this.language = val;
    });
    console.log('logined : ' + this.logined);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.languageService.setInitialAppLanguage();
      this.currentLanguage = this.languageService.getLanguage();
      console.log(`language is ${this.currentLanguage}`);
      this.util.getPlatformType();
      this.util.getDeviceID();

      // this.fcmService.initFcm();
    });
  }

  async shareApp() {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  }

  selectMenuItem(index,url) {
    this.selectedIndex = index;
    if (index == 7) {
      console.log('share app');
      //this.shareApp();
    }else{
      this.router.navigateByUrl(url);
    }

    
  }
}
