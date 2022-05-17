import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthDataResponse } from 'src/app/models/general';
import { DataService } from 'src/app/services/data/data.service';
import { StaticPageTitle } from 'src/app/models/staticPage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userData: AuthDataResponse;
  constructor(private router: Router,private data:DataService) {}

  ngOnInit() {
    this.userData = {
      name: 'اسلام محمد احمد',
      avatar: './../../../../assets/images/profile.svg',
      phone: '98823238323',
    };
  }

  helpPage() {
    this.staticPage(StaticPageTitle.support);
  }

  policyPage() {
    this.staticPage(StaticPageTitle.policy);
  }

  aboutPage()  {
    this.staticPage(StaticPageTitle.about);
  }

  staticPage(type:StaticPageTitle) {
    this.router.navigateByUrl('/tabs/account/static-help-policy');
    this.data.setPageData(type)
  }
}
