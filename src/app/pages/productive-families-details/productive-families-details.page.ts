import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-productive-families-details',
  templateUrl: './productive-families-details.page.html',
  styleUrls: ['./productive-families-details.page.scss'],
})
export class ProductiveFamiliesDetailsPage implements OnInit {

  langauge:string;
  familyDetails:any={
    name:'محمد احمد',
    phone:'89263763732',
    instgram:'kesa.sa',
    twitter:'kesa.sa'
  }
  constructor(private languageService:LanguageService) {
    this.langauge=this.languageService.getLanguage();
   }

  ngOnInit() {
  }

}
