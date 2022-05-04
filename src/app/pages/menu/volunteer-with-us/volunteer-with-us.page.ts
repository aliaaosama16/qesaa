import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-volunteer-with-us',
  templateUrl: './volunteer-with-us.page.html',
  styleUrls: ['./volunteer-with-us.page.scss'],
})
export class VolunteerWithUsPage implements OnInit {
  public volunteerForm: FormGroup;
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
    this.volunteerForm = this.formBuilder.group({
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

  volunteer() {
    console.log('volunteer form :'+JSON.stringify(this.volunteerForm.value))
  }
}
