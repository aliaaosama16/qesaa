import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthResponse, RegisterData } from './../../../models/auth';
import { MenuController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { Location } from '@angular/common';
import { UserType, UserTypeData } from './../../../models/userType';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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
  showRegisterPass: boolean;
  iconRegisterName: string = 'eye-off-outline';
  inputRegisterType: any = 'password';
  showRegisterConfirmPass: boolean;
  iconRegisterConfirmName: string = 'eye-off-outline';
  inputRegisterConfirmType: any = 'password';
  currentLanguage: string;
  registerData:RegisterData;
  public registerForm: FormGroup;
  isRegisterSubmitted = false;
  isRulesChecked:boolean=false;
  constructor(
    private languaService: LanguageService,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private platform: Platform,
    private location: Location,
    private util:UtilitiesService,
    private langaugeservice: LanguageService,
    private auth:AuthService,
    private router:Router,
    private translate:TranslateService
  ) {
    this.currentLanguage = this.languaService.getLanguage();
  }

  ngOnInit() {
    this.buildForm();
    this.menuCtrl.enable(false, 'main');
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.location.back();
    });
  }

  register() {
    console.log(this.registerForm.value);
    this.isRegisterSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.password ==
        this.registerForm.value.confirmPassword
      ) {
        console.log('registerForm valid');
        this.registerData = {
          user_type:this.registerForm.value.userType,
          lang: this.langaugeservice.getLanguage(),
          first_name: this.registerForm.value.userName,
         
          phone: this.registerForm.value.phoneNumber,
          password: this.registerForm.value.password,
        };
        this.util.showLoadingSpinner().then((__) => {
          this.auth.register(this.registerData).subscribe(
            (data: AuthResponse) => {
              if (data.key == 1) {
                console.log('register res :' + JSON.stringify(data));
                this.util.showMessage(data.msg);
                this.auth.userID.next(data.data.id);
                this.auth.storeStatusAfterRegisteration(data);
                this.router.navigateByUrl('/code');
                this.registerForm.reset();
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
        this.translate.instant(
          'both password and confirm password should be equal'
        );
      }
    } else {
      console.log(this.registerForm.value);
      return false;
    }
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      userType: ['', [Validators.required]],
      userName: ['', [Validators.required]],
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
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      rulesAcception:[false,[Validators.required]]
    });
  }

  chooseUserType($event) {
    console.log('selected user type :' + $event.target.value);
  }

  get registerErrorControl() {
    return this.registerForm.controls;
  }

  showRegisterPassword() {
    this.showRegisterPass = !this.showRegisterPass;
    this.iconRegisterName = this.showRegisterPass
      ? 'eye-outline'
      : 'eye-off-outline';
    this.inputRegisterType = this.showRegisterPass ? 'text' : 'password';
  }

  showRegisterConfirmPassword() {
    this.showRegisterConfirmPass = !this.showRegisterConfirmPass;
    this.iconRegisterConfirmName = this.showRegisterConfirmPass
      ? 'eye-outline'
      : 'eye-off-outline';
    this.inputRegisterConfirmType = this.showRegisterConfirmPass
      ? 'text'
      : 'password';
  }
}
