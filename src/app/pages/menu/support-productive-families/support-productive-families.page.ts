import { LanguageService } from './../../../services/language/language.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { GeneralService } from 'src/app/services/general/general.service';
import { ImageInfo } from 'src/app/models/general';
import { DomSanitizer } from '@angular/platform-browser';
import { isPlatform, Platform } from '@ionic/angular';
const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-support-productive-families',
  templateUrl: './support-productive-families.page.html',
  styleUrls: ['./support-productive-families.page.scss'],
})
export class SupportProductiveFamiliesPage implements OnInit {
  public productAdditionForm: FormGroup;
  currentLanguage: string;
  basicImage: any = '';
  productImage: string = '';
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private sanitizer: DomSanitizer,
    private plt: Platform,
    private general: GeneralService
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
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
    this.basicImage = this.sanitizer.bypassSecurityTrustUrl(image.webPath);
    console.log('taken image :' + this.basicImage);
    await this.general.getImageConverted(image);
    this.productAdditionForm.value.basicImage = this.general.uploadedImage;
  }

  attachProductImage() {}

  addProduct() {}
}
