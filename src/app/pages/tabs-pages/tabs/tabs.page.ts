import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, IonTabs } from '@ionic/angular';
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
 // @ViewChild('icon', { read: ElementRef }) icon: ElementRef;
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

  constructor(
    private auth: AuthService,
    private animationCtrl: AnimationController,
    private router: Router
  ) {
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

    //     const squareA = this.animationCtrl.create()
    //   .addElement(this.squareA.nativeElement)
    //   .fill('none')
    //   .duration(1000)
    //   .keyframes([
    //     { offset: 0, transform: 'scale(1) rotate(0)' },
    //     { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' },
    //     { offset: 1, transform: 'scale(1) rotate(0)' }
    //   ]);

    // const squareB = this.animationCtrl.create()
    //   .addElement(this.squareB.nativeElement)
    //   .fill('none')
    //   .duration(1000)
    //   .keyframes([
    //     { offset: 0, transform: 'scale(1)', opacity: '1' },
    //     { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
    //     { offset: 1, transform: 'scale(1)', opacity: '1' }
    //   ]);
  }

  ngOnInit() {
    // async
    // const squareC = this.animationCtrl
    //   .create()
    //   .addElement(this.icon.nativeElement)
    //   .fill('none')
    //   .duration(1000)
    //   .keyframes([
    //     { offset: 0, transform: 'scale(1)', opacity: '1' },
    // { offset: 0.5, transform: 'scale(1.2)', opacity: '0.3' },
    // { offset: 1, transform: 'scale(1)', opacity: '1' }
    //   ]);

    // // await squareA.play();
    // // await squareB.play();
    // await squareC.play();
  }

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
  }

  donate() {
    this.router.navigateByUrl('/tabs/donation-order');
  }
}
