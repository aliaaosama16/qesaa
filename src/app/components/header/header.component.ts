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

  constructor(
    private menuCtrl: MenuController,
    private platform: Platform,
    private location: Location
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.location.back();
    });
  }
  ngOnInit() {}

  openMenu() {
    this.menuCtrl.open();
  }

  goBack() {
    this.location.back();
  }
}
