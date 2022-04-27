import { Component, OnInit } from '@angular/core';
import { AuthDataResponse } from 'src/app/models/general';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userData:AuthDataResponse;
  constructor() { }

  ngOnInit() {
    this.userData={
      name:'اسلام محمد احمد',
      avatar:'./../../../../assets/images/profile.svg',
      phone:'98823238323'
    }
  }

}
