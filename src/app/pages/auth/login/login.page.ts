import { AuthService } from './../../../services/auth/auth.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { AuthResponse, LoginData, Status } from 'src/app/models/auth';
import { Router } from '@angular/router';
import { UserType } from 'src/app/models/userType';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userTypes: any[] = [
    {
      id: UserType.client,
      type: UserType.client,
    },
    {
      id: UserType.provider,
      type: UserType.provider,
    },
    {
      id: UserType.market,
      type: UserType.market,
    },
  ];
  currentLanguage: string;
  otherLanguage: string;
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
    private auth: AuthService,
    private menuCtrl:MenuController
  ) {
    this.menuCtrl.enable(false, 'main');
    this.languaService.getUpdatedLanguage().subscribe((lang) => {
      console.log('current language :' + lang);
      this.otherLanguage = lang == 'ar' ? 'English' : 'عربي';
      this.currentLanguage=lang;
    });
    
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
        // user_type: this.loginForm.value.userType,
      };
      console.log('loginForm : ' + JSON.stringify(this.loginForm.value));

      this.util.showLoadingSpinner().then((__) => {
        this.auth.login(this.loginData).subscribe(
          (data: AuthResponse) => {
            if (data.key == 1) {
              console.log('login res :' + JSON.stringify(data));
              if (data.data.is_active) {
                this.router.navigateByUrl('/tabs/home');
                this.auth.storeStatusAfterLogin(data);
                this.auth.setUserID(data.data.id);
                this.auth.storeUserType(data.data.user_type);
                this.loginForm.reset();
              }
              // else if (data.status == Status.NonActive) {
              //   this.router.navigateByUrl(`/verification-code/${data.data.id}`);
              // } else if (data.status == Status.NonConfirm) {
              //   this.util.showMessage('waiting for admin approval');
              // }
              else if (!data.data.is_active) {
                this.router.navigateByUrl(`/verification-code/${data.data.id}`);
                // this.util.showMessage(
                //   'you are blocked.Contact with management'
                // );
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
      console.log('form not valid');
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
          //Validators.minLength(10),
          //Validators.maxLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: [''],
    });
  }

  // chooseUserType($event) {
  //   console.log('selected user type :' + $event.target.value);
  //   this.loginForm.value.userType = $event.target.value;
  // }

  get loginErrorControl() {
    return this.loginForm.controls;
  }

  showLoginPassword() {
    this.showLoginPass = !this.showLoginPass;
    this.iconLoginName = this.showLoginPass ? 'eye-outline' : 'eye-off-outline';
    this.inputLoginType = this.showLoginPass ? 'text' : 'password';
  }

  changeLanguage() {
    if (this.langaugeservice.getLanguage() == 'ar') {
      this.langaugeservice.language.next('en');
      document.documentElement.dir = 'ltr';
      this.langaugeservice.setLanguage('en');
    } else {
      this.langaugeservice.language.next('ar');
      document.documentElement.dir = 'rtl';
      this.langaugeservice.setLanguage('ar');
    }
    window.location.reload();
  }
}
