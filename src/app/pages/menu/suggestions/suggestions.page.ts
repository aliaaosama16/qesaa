import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.page.html',
  styleUrls: ['./suggestions.page.scss'],
})
export class SuggestionsPage implements OnInit {

 
  public suggestionsForm: FormGroup;
  currentLanguage: string;
 
  constructor(
    private formBuilder: FormBuilder,
    private languageService: LanguageService
  ) {
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.suggestionsForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^05/),
          Validators.minLength(10),
          Validators.maxLength(10),
          //10
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  contactUs() {
    console.log('suggestions Form :'+JSON.stringify(this.suggestionsForm.value))
  }
}
