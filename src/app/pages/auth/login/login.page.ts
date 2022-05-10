import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  currentLanguage:string;
  loginForm:FormGroup;
  constructor(private languaService:LanguageService) { 
    this.currentLanguage=this.languaService.getLanguage()
  }

  ngOnInit() {
  }

  login(){}
}
