import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

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
  constructor(
    private languaService: LanguageService,
    private formBuilder: FormBuilder
  ) {
    this.currentLanguage = this.languaService.getLanguage();
  }

  ngOnInit() {
    this.buildForm();
  }

  login() {}

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

  showLoginPassword(){
    this.showLoginPass = !this.showLoginPass ;
    this.iconLoginName = this.showLoginPass
      ? 'eye-outline'
      : 'eye-off-outline';
    this.inputLoginType = this.showLoginPass ? 'text' : 'password';
  }
}
