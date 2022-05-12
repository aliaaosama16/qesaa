import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  currentLanguage: string;
  forgetForm: FormGroup;
  constructor(
    private languaService: LanguageService,
    private formBuilder: FormBuilder
  ) {
    this.currentLanguage = this.languaService.getLanguage();
  }

  ngOnInit() {
    this.buildForm();
  }

  forgetPassword(){}

  buildForm() {
    this.forgetForm = this.formBuilder.group({
    
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
}
