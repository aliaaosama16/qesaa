import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  showChangePass: boolean;
  iconChangeName: string = 'eye-off-outline';
  inputChangeType: any = 'password';
  showChangeConfirmPass: boolean;
  iconChangeConfirmName: string = 'eye-off-outline';
  inputChangeConfirmType: any = 'password';
  currentLanguage: string;
  changePasswordForm: FormGroup;
  constructor(
    private languaService: LanguageService,
    private formBuilder: FormBuilder
  ) {
    this.currentLanguage = this.languaService.getLanguage();
  }

  ngOnInit() {
    this.buildForm();
  }

  changePassword(){}

  buildForm() {
    this.changePasswordForm = this.formBuilder.group({
    
      phoneNumber: [
        '',
        [
          Validators.required,
         // Validators.pattern(/^05/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],

    });
  }

  showChangePassword() {
    this.showChangePass = !this.showChangePass;
    this.iconChangeName = this.showChangePass
      ? 'eye-outline'
      : 'eye-off-outline';
    this.inputChangeType = this.showChangePass ? 'text' : 'password';
  }

  showChangeConfirmPassword() {
    this.showChangeConfirmPass = !this.showChangeConfirmPass;
    this.iconChangeConfirmName = this.showChangeConfirmPass
      ? 'eye-outline'
      : 'eye-off-outline';
    this.inputChangeConfirmType = this.showChangeConfirmPass
      ? 'text'
      : 'password';
  }
}
