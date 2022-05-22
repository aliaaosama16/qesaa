import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthDataResponse } from 'src/app/models/general';
import { DataService } from 'src/app/services/data/data.service';
import { StaticPageTitle } from 'src/app/models/staticPage';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthResponse } from 'src/app/models/auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userData: AuthDataResponse;
  constructor(
    private router: Router,
    private util: UtilitiesService,
    private auth: AuthService,
    private data: DataService
  ) {}

  ngOnInit() {
   
    this.getUserData();
  }

  getUserData() {
    this.util.showLoadingSpinner().then((__) => {
      this.auth.userData(this.userData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            this.userData = data.data;
            console.log('user all data :' + JSON.stringify(this.userData));
            
          } else {
            //  this.util.showMessage(data.msg);
          }
          this.util.dismissLoading();
        },
        (err) => {
          this.util.dismissLoading();
          //this.getData = false;
        }
      );
    });
  }

  helpPage() {
    this.staticPage(StaticPageTitle.support);
  }

  policyPage() {
    this.staticPage(StaticPageTitle.policy);
  }

  aboutPage() {
    this.staticPage(StaticPageTitle.about);
  }

  staticPage(type: StaticPageTitle) {
    this.router.navigateByUrl('/tabs/account/static-help-policy');
    this.data.setPageData(type);
  }
}
