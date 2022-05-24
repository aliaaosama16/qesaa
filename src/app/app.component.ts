import { SectionsProductsService } from 'src/app/services/sections-products/sections-products.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { LanguageService } from './services/language/language.service';
import { UtilitiesService } from './services/utilities/utilities.service';
import { Share } from '@capacitor/share';
import { LogOutData, Status } from './models/auth';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentLanguage: string = '';
  language: string = '';
  selectedIndex: number;
  logoutData: LogOutData;
  currentPlatform: string;
  pages = [
    {
      title: 'about',
      url: '/tabs/about',
      iconActive: './../assets/icon/menu-icons/about-active.svg',
      iconInActive: './../assets/icon/menu-icons/about-inactive.svg',
    },
    {
      title: 'our-services',
      url: '/tabs/our-services',
      iconActive: './../assets/icon/menu-icons/services-active.svg',
      iconInActive: './../assets/icon/menu-icons/services-inactive.svg',
    },
    {
      title: 'news',
      url: '/tabs/news',
      iconActive: './../assets/icon/menu-icons/news-active.svg',
      iconInActive: './../assets/icon/menu-icons/news-inactive.svg',
    },
    {
      title: 'our-projects',
      url: '/tabs/our-projects',
      iconActive: './../assets/icon/menu-icons/projects-active.svg',
      iconInActive: './../assets/icon/menu-icons/projects-inactive.svg',
    },
    {
      title: 'gallery',
      url: '/tabs/gallery',
      iconActive: './../assets/icon/menu-icons/gallary-active.svg',
      iconInActive: './../assets/icon/menu-icons/gallary-inactive.svg',
    },
    {
      title: 'volunteer with us',
      url: '/tabs/volunteer-with-us',
      iconActive: './../assets/icon/menu-icons/donate-active.svg',
      iconInActive: './../assets/icon/menu-icons/donate-inactive.svg',
    },
    {
      title: 'Supporting productive families',
      url: '/tabs/support-productive-families',
      iconActive: './../assets/icon/menu-icons/families-inactive.svg',
      iconInActive: './../assets/icon/menu-icons/families-inactive.svg',
    },
    {
      title: 'share app',
      url: 'share',
      iconActive: './../assets/icon/menu-icons/share-active.svg',
      iconInActive: './../assets/icon/menu-icons/share-inactive.svg',
    },
    {
      title: 'our presence',
      url: '/tabs/our-presence',
      iconActive: './../assets/icon/menu-icons/presence-active.svg',
      iconInActive: './../assets/icon/menu-icons/news-inactive.svg',
    },
    {
      title: 'contact us',
      url: '/tabs/contact-with-us',
      iconActive: './../assets/icon/menu-icons/contact-active.svg',
      iconInActive: './../assets/icon/menu-icons/contact-inactive.svg',
    },
    {
      title: 'Suggestions and complaints',
      url: '/tabs/suggestions',
      iconActive: './../assets/icon/menu-icons/notices-active.svg',
      iconInActive: './../assets/icon/menu-icons/notices-inactive.svg',
    },
    {
      title: 'Terms and Conditions',
      url: '/tabs/rules',
      iconActive: './../assets/icon/menu-icons/rules-active.svg',
      iconInActive: './../assets/icon/menu-icons/rules-inactive.svg',
    },
  ];

  constructor(
    private platform: Platform,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private router: Router,
    private auth: AuthService,
    private sectionsService: SectionsProductsService
  ) {
    this.initializeApp();

    // this.auth.getLoginedObservable().subscribe((val) => {
    //   this.logined = val;
    // });

    this.languageService.getUpdatedLanguage().subscribe((val) => {
       console.log('language' + val);
      this.language = val;
    });
    

    console.log('current platform : ' + this.util.getCapacitorPlatform());
    this.currentPlatform = this.util.getCapacitorPlatform();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.languageService.setInitialAppLanguage();
      this.currentLanguage = this.languageService.getLanguage();
      console.log(`language is ${this.currentLanguage}`);
      this.util.getPlatformType();
      this.util.getDeviceID();

      // this.fcmService.initFcm();
      this.sectionsService.setCartCount();
      this.getLoginStatus();
      this.util.getUserLocation();
      console.log(this.util.userLocation.lat, this.util.userLocation.lng);
    });
  }

  async getLoginStatus() {
    const loginStatus = await Storage.get({ key: 'qesaa-activation-status' });

    if (loginStatus.value) {
      this.auth.isLogined();
      this.getUserNotifications();
      this.getStoredUserType();
    }

  }

  async getStoredUserType(){
    const userType = await Storage.get({ key: 'qesaa-UserType' });
    this.auth.userType.next(userType.value);
  }

  async getUserNotifications() {
    const userID = await Storage.get({ key: 'qesaa-UserID' });
    console.log('stored user id : ' + parseInt(userID.value));
    this.auth.setNoOfNotifications(parseInt(userID.value));
    this.auth.userID.next(parseInt(userID.value));
  }

  async shareApp() {
    await Share.share({
      title: 'kesa app',
      // text: 'Really awesome thing you need to see right meow',
      url: 'https://play.google.com/store/apps/details?id=com.efada.qesaa',
      // dialogTitle: 'Share with buddies',
    });
  }

  selectMenuItem(index, url) {
    this.selectedIndex = index;
    if (index == 7) {
      console.log('share app');
      this.shareApp();
    } else {
      this.router.navigateByUrl(url);
    }
  }
}
