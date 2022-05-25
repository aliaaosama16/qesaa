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
import { CitysData, CitysResponse, GeneralSectionResponse, UserData } from 'src/app/models/general';
import { AppData } from 'src/app/models/data';
import { DataService } from 'src/app/services/data/data.service';
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
  cities: GeneralSectionResponse[];
  neighborhoods: GeneralSectionResponse[];
  showProviderOptions:boolean=false;
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private platform: Platform,
    private location: Location,
    private util:UtilitiesService,
    private langaugeservice: LanguageService,
    private auth:AuthService,
    private router:Router,
    private translate:TranslateService,
    private dataService:DataService
  ) {
    this.currentLanguage = this.languageService.getLanguage();
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
          city_id: this.registerForm.value.city,
          neighborhood_id:this.registerForm.value.neighborhood
        };
        this.util.showLoadingSpinner().then((__) => {
          this.auth.register(this.registerData).subscribe(
            (data: AuthResponse) => {
              if (data.key == 1) {
                console.log('register res :' + JSON.stringify(data));
                this.util.showMessage(data.msg);
                this.auth.userID.next(data.data.id);
                this.auth.storeStatusAfterRegisteration(data);
                this.router.navigateByUrl(`/verification-code/${data.data.id}`);
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
          //Validators.minLength(10),
          //Validators.maxLength(10),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      rulesAcception:[false,[Validators.required]],
      city:[''],
      neighborhood:['']
    });
  }

  getAllCities() {
    const userData: UserData = {
      lang: this.languageService.getLanguage(),
     // user_id: this.auth.userID.value,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.appData(userData).subscribe(
        (data: AppData) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            this.cities = data.data.cities;
          } else {
            this.util.showMessage(data.msg);
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  chooseCity($event) {
    const cityData: CitysData = {
      lang: this.languageService.getLanguage(),
      user_id: this.auth.userID.value,
      city_id: $event.target.value,
    };
    this.util.showLoadingSpinner().then((__) => {
      this.dataService.getNeighborhoods(cityData).subscribe(
        (data: CitysResponse) => {
          this.util.dismissLoading();
          if (data.key == 1) {
            this.neighborhoods = data.data;
          } else {
            this.util.showMessage(data.msg);
          }
        },
        (err) => {
          this.util.dismissLoading();
        }
      );
    });
  }

  chooseNeighborhood($event) {
    console.log('Neighborhood : ' + $event.target.value);
    
  }

  chooseUserType($event) {
    console.log('selected user type :' + $event.target.value);
    if( $event.target.value=='provider'){
      console.log('choosen user type');
      this.showProviderOptions=true;
      this.getAllCities();
    }
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
