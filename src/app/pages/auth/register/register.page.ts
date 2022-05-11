import { MenuController, Platform } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userTypes: any = [
    {
      id: 1,
      text: 'client',
    },
    {
      id: 2,
      text: 'admin',
    },
  ];
  currentLanguage: string;
  public registerForm: FormGroup;
  isRegisterSubmitted = false;
  constructor(
    private languaService: LanguageService,
    private formBuilder: FormBuilder,
    private menuCtrl:MenuController,
    private platform:Platform,
    private location: Location,
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

  register() {}

  buildForm() {
    this.registerForm = this.formBuilder.group({
      userType:['', [Validators.required]],
      userName:['',[Validators.required]],
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
    })
  }

  chooseUserType($event) {
    console.log( 'selected user type :'+$event.target.value);
  }

  get registerErrorControl() {
    return this.registerForm.controls;
  }

}
