import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-with-us',
  templateUrl: './contact-with-us.page.html',
  styleUrls: ['./contact-with-us.page.scss'],
})
export class ContactWithUsPage implements OnInit {

  public contactForm: FormGroup;
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
    this.contactForm = this.formBuilder.group({
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
    console.log('conatct form :'+JSON.stringify(this.contactForm.value))
  }

}
