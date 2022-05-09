import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthDataResponse } from 'src/app/models/general';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.page.html',
  styleUrls: ['./account-edit.page.scss'],
})
export class AccountEditPage implements OnInit {
  userData: AuthDataResponse;
  currentLanguage: string;
  editProfileForm: FormGroup;
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder
  ) {
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.userData = {
      name: 'اسلام محمد احمد',
      avatar: './../../../../assets/images/profile.svg',
      phone: '98823238323',
    };
    this.buildForm();
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
