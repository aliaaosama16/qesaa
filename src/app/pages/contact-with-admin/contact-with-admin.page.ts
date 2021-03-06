import { LanguageService } from 'src/app/services/language/language.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactType, ContactUsData } from 'src/app/models/contactUs';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { GeneralResponse, UserData } from 'src/app/models/general';
import { AppData } from 'src/app/models/data';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-contact-with-admin',
  templateUrl: './contact-with-admin.page.html',
  styleUrls: ['./contact-with-admin.page.scss'],
})
export class ContactWithAdminPage implements OnInit {

  
  public contactWithAdminForm: FormGroup;
  currentLanguage: string;
  contactData: ContactUsData;

  constructor(
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private util: UtilitiesService,
    private general: GeneralService,
    private dataService:DataService
  ) {
    this.currentLanguage = this.languageService.getLanguage();
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.contactWithAdminForm = this.formBuilder.group({
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
      messageTitle: ['', [Validators.required, Validators.minLength(2)],],
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

  contactWithAdmin() {
    console.log('conatct form :' + JSON.stringify(this.contactWithAdminForm.value));

    this.contactData = {
      lang: this.languageService.getLanguage(),
      name: this.contactWithAdminForm.value.userName,
      phone: this.contactWithAdminForm.value.phoneNumber,
      message: this.contactWithAdminForm.value.message,
      type: ContactType.suggest,
    };
    // this.util.showLoadingSpinner().then((__) => {
    //   this.general.contactUs(this.contactData).subscribe(
    //     (data: GeneralResponse) => {
    //       if (data.key == 1) {
    //         this.util.showMessage(data.msg);
    //       } else {
    //         this.util.showMessage(data.msg);
    //       }
    //       this.util.dismissLoading();
    //     },
    //     (err) => {
    //       this.util.dismissLoading();
    //     }
    //   );
    // });
  }

  openWhatsapp(){
  
      const userData: UserData = {
        lang: this.languageService.getLanguage(),
      };
      this.util.showLoadingSpinner().then((__) => {
        this.dataService.appData(userData).subscribe(
          (data: AppData) => {
            if (data.key == 1) {
             
              window.open(`https://api.whatsapp.com/send?phone=${data.whatsapp}`);

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
    }
  
    inputHaveFocused(inputFocusStatus) {
      this.util.inputStatus(inputFocusStatus);
    }
  
}
