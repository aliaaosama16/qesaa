import { UtilitiesService } from './../../services/utilities/utilities.service';
import { MenuController, Platform } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() isHome: boolean;
  @Input() haveBeforeHeader:boolean;
  currentPlatform: string;

  constructor(
    private menuCtrl: MenuController,
    private platform: Platform,
    private location: Location,
    private util: UtilitiesService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.location.back();
    });
  }

  ngOnInit() {
    console.log('current platform : ' + this.util.getCapacitorPlatform());
    this.currentPlatform = this.util.getCapacitorPlatform();
  }

  openMenu() {
    this.menuCtrl.open();
  }

  goBack() {
    this.location.back();
  }
}
