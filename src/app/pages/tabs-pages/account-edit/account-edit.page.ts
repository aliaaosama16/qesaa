import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthDataResponse, UserData } from 'src/app/models/general';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthResponse } from 'src/app/models/auth';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage implements OnInit {
  userDetails: AuthDataResponse;
  currentLanguage: string;
  editProfileForm: FormGroup;
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private util:UtilitiesService,
    private auth:AuthService
  ) {
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit() {
   this.getUserData()
    this.buildForm();
  }

  getUserData() {
    const userData:UserData={
      lang:this.languageService.getLanguage(),
      user_id:this.auth.userID.value
    }
    this.util.showLoadingSpinner().then((__) => {
      this.auth.userData(userData).subscribe(
        (data: AuthResponse) => {
          if (data.key == 1) {
            this.userDetails = data.data;
            console.log('user all data :' + JSON.stringify(this.userDetails));
            
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

  buildForm() {
    this.editProfileForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^05/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  editProfile() {}
}
