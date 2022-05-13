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
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
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
  basicImage: string = '';
  productImage: string = '';
  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private sanitizer: DomSanitizer,
    private plt: Platform
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

    //this.sanitizer.bypassSecurityTrustUrl(this.imgFile)
    this.basicImage = image.webPath;

    console.log('taken image :' + this.basicImage);

    this.convertPhoto(image);
    this.getData(image);
  }

  async getData(image) {
    const contents = await Filesystem.readFile({
      path: image,
    });

    console.log('data:', contents);
  }

  async convertPhoto(image: Photo) {
    let file = null;

    if (isPlatform('hybrid')) {
      const { data } = await Filesystem.readFile({
        path: image.path,
        directory: Directory.Documents,
      });
      file = await this.dataUrlToFile(data);
      console.log('file converted  hybrid:  ' + file);
    } else {
      const blob = await fetch(image.webPath).then((r) => r.blob());
      file = new File([blob], 'myfile', { type: blob.type });
      console.log('file converted  not hybrid:  ' + file);
    }

    const formData = new FormData();
    formData.append('file', file);
    this.uploadImage(formData);
  }

  private dataUrlToFile(
    dataUrl: string,
    fileName: string = 'myfile'
  ): Promise<File> {
    return fetch(`data:image/png;base64,${dataUrl}`)
      .then((res) => res.blob())
      .then((blob) => {
        return new File([blob], fileName, { type: 'image/png' });
      });
  }

  uploadImage(photo) {
    this.generalService
      .uploadImage({
        lang: this.languageService.getLanguage(),
        image: photo,
      })
      .subscribe((res: any) => {
        console.log('image upload res :' + JSON.stringify(res));
      });
  }

  attachProductImage() {}

  addProduct() {}
}
