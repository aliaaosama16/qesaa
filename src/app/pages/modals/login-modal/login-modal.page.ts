import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.page.html',
  styleUrls: ['./login-modal.page.scss'],
})
export class LoginModalPage implements OnInit {

  constructor(private router:Router,public modal:ModalController) { }

  ngOnInit() {
  }


  goLogin(){
    this.modal.dismiss().then((_)=>{

      this.router.navigateByUrl('/login')
    })
    
  }
}
