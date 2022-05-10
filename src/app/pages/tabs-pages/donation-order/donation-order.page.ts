import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-donation-order',
  templateUrl: './donation-order.page.html',
  styleUrls: ['./donation-order.page.scss'],
})
export class DonationOrderPage implements OnInit {
  //@ViewChild('item', {static: false}) myItem:ElementRef;
  currentLanguage: string;
  donationForm: FormGroup;
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder
  ) {
    this.currentLanguage = this.languageService.getLanguage();
    //console.log(this.myItem.nativeElement)
    var elem=document.getElementById('item1')
    console.log(elem.classList.value)
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.donationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^05/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      city: ['', [Validators.required, Validators.minLength(2)]],
      neighborhood: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  donate() {}
}
