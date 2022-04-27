import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  selectedTab = 'home';
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  noOfNotifications: number;
  isLogined: boolean = false;

  tabsData = [
    {
      tabName: 'home',
      tabActiveIcon: './../../../assets/icon/tabs-icons/home-active.svg',
      tabNotActiveIcon: './../../../assets/icon/tabs-icons/home-inactive.svg',
    },
    {
      tabName: 'notifications',
      tabActiveIcon:
        './../../../assets/icon/tabs-icons/notifications-active.svg',
      tabNotActiveIcon:
        './../../../assets/icon/tabs-icons/notifications-inactive.svg',
    },
    {
      tabName: 'Donation Order',
      tabActiveIcon: '',
      tabNotActiveIcon: '',
    },
    {
      tabName: 'my-orders',
      tabActiveIcon: './../../../assets/icon/tabs-icons/orders-active.svg',
      tabNotActiveIcon: './../../../assets/icon/tabs-icons/orders-inactive.svg',
    },
    {
      tabName: 'account',
      tabActiveIcon: './../../../assets/icon/tabs-icons/profile-active.svg',
      tabNotActiveIcon:
        './../../../assets/icon/tabs-icons/profile-inactive.svg',
    },
  ];

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isAuthenticated.value) {
      this.isLogined = this.auth.isAuthenticated.value;
      this.auth.getNoOfNotifications().subscribe((val) => {
        if (val != 0) {
          this.noOfNotifications = val;
        } else {
          this.noOfNotifications = 0;
        }
      });
    }
  }

  ngOnInit() {}

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
  }

  donate() {
    this.router.navigateByUrl('/tabs/donation-order');
  }
}
