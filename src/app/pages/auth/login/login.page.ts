import { AuthService } from './../../../services/auth/auth.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthResponse, LoginData, Status } from 'src/app/models/auth';
import { Router } from '@angular/router';
import { UserType } from 'src/app/models/userType';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  currentLanguage: string;
  loginForm: FormGroup;
  isSignInSubmitted = false;
  iconLoginName: string = 'eye-off-outline';
  inputLoginType: any = 'password';
  showLoginPass: boolean;
  loginData: LoginData;
  constructor(
    private languaService: LanguageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private util: UtilitiesService,
    private langaugeservice: LanguageService,
    private auth: AuthService
  ) {
    this.currentLanguage = this.languaService.getLanguage();
  }

  ngOnInit() {
    this.buildForm();
  }

  login() {
    this.isSignInSubmitted = true;

    console.log('loginForm : ' + JSON.stringify(this.loginForm.value));
    if (this.loginForm.valid) {
      this.loginData = {
        lang: this.langaugeservice.getLanguage(),
        phone: this.loginForm.value.phoneNumber,
        password: this.loginForm.value.password,
        device_id: this.util.deviceID,
        user_type:  UserType.client
      };
      this.util.showLoadingSpinner().then((__) => {
        this.auth.login(this.loginData).subscribe(
          (data: AuthResponse) => {
            if (data.key == 1) {
              console.log('login res :' + JSON.stringify(data));
              if (data.status == Status.Active) {
                this.router.navigateByUrl('/tabs/home');

                this.auth.storeStatusAfterLogin(data);
                this.auth.setUserID(data.data.id);
                this.loginForm.reset();
              } else if (data.status == Status.NonActive) {
                this.router.navigateByUrl('/verification-code');
              } else if (data.status == Status.Blocked) {
                this.util.showMessage(
                  'you are blocked.Contact with management'
                );
              }
            } else {
              this.util.showMessage(data.msg);
            }
            this.util.dismissLoading();
          },
          (err) => {
            this.util.dismissLoading();
          }
        );
      });
    } else {
      return false;
    }
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          // Validators.pattern(/^05/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get loginErrorControl() {
    return this.loginForm.controls;
  }

  showLoginPassword() {
    this.showLoginPass = !this.showLoginPass;
    this.iconLoginName = this.showLoginPass ? 'eye-outline' : 'eye-off-outline';
    this.inputLoginType = this.showLoginPass ? 'text' : 'password';
  }
}
