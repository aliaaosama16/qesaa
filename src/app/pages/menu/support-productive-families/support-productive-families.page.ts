import { LanguageService } from './../../../services/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { GeneralService } from 'src/app/services/general/general.service';
import { ImageInfo } from 'src/app/models/general';

@Component({
  selector: 'app-support-productive-families',
  templateUrl: './support-productive-families.page.html',
  styleUrls: ['./support-productive-families.page.scss'],
})
export class SupportProductiveFamiliesPage implements OnInit {
  public productAdditionForm: FormGroup;
  currentLanguage: string;
  basicImage: string = '';
  productImage: string = '';
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.currentLanguage = this.languageService.getLanguage();
    this.buildForm();
  }

  buildForm() {
    this.productAdditionForm = this.formBuilder.group({
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
      twitterLink: ['', [Validators.required, Validators.minLength(2)]],
      instgramLink: ['', [Validators.required, Validators.minLength(2)]],
      basicImage: this.basicImage,
      productImage: this.productImage,
    });
  }

  async attachBasicImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

   
    this.basicImage = image.webPath;

    console.log('taken image :' + this.basicImage);

    const imageData:ImageInfo={
      lang:this.languageService.getLanguage(),
      image:this.basicImage
    }
    

    this.generalService.uploadImage(imageData).subscribe((res:any)=>{
      console.log('image upload res :'+JSON.stringify(res))
    })
  }

  attachProductImage() {}

  addProduct() {}
}
