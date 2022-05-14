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
  basicImage: any = '';
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

//  ----correct solution  for input file ----
  // attachBasicImage(event) {
  //   const file: File = event.target.files[0];

  //   const ext = file.name.split('.').pop();
  //   console.log('ex  '+ext);
  //   const formData = new FormData();
  //   formData.append('image', file, `myimage.${ext}`);
  //  formData.append('lang', this.languageService.getLanguage());
  //   this.uploadImage(formData);
    // this.api.uploadImageFile(file).subscribe((newImage: ApiImage) => {
    //   this.images.push(newImage);
    // });
  // }
   
    

   async attachBasicImage() {
   
    //  ----correct solution  for input file ----
  //   const file: File = event.target.files[0];

  //   const ext = file.name.split('.').pop();
  //   console.log('ex  '+ext);
  //   const formData = new FormData();
  //   formData.append('image', file, `myimage.${ext}`);
  //  formData.append('lang', this.languageService.getLanguage());
  //   this.uploadImage(formData);
    // this.api.uploadImageFile(file).subscribe((newImage: ApiImage) => {
    //   this.images.push(newImage);
    // });

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    // console.log('camera res +' + JSON.stringify(image));
    // //this.sanitizer.bypassSecurityTrustUrl(this.imgFile)
     this.basicImage = this.sanitizer.bypassSecurityTrustUrl(image.webPath);

    console.log('taken image :' + this.basicImage);

    // this.convertPhoto(image).then((res) => {
    //   console.log('image after converted  : ' + res);
    // });

    //this.uploadImage(formData);
    this.getData(image);
  }

  async getData(image) {
    console.log('====start read file ====');
    const  data  = await Filesystem.readFile({
      path: image.path,
    });
    let blob = this.b64toBlob(data.data);
    const file = new File([blob], 'image.jpg');
    console.log('file ----- :' + file);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('lang',this.languageService.getLanguage());
    this.uploadImage(formData);
    // .then(res=>{
    //   console.log('file read res :  '+JSON.stringify(res))
    // });

   // console.log('data:', JSON.stringify(data));
  }
  b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  private getBlob(
    b64Data: string,
    contentType: string,
    sliceSize: number = 512
  ) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  async convertPhoto(image: Photo) {
    let file = null;

    //if (isPlatform('hybrid')) {
    const { data } = await Filesystem.readFile({
      path: image.path,
      directory: Directory.Documents,
    });
    console.log('data:', JSON.stringify(data));

    file = await this.dataUrlToFile(data);
    console.log('file converted  hybrid:  ' + file);
    // } else {
    //   const blob = await fetch(image.webPath).then((r) => r.blob());
    //   file = new File([blob], 'myfile', { type: blob.type });
    //   console.log('file converted  not hybrid:  ' + file);
    // }

    const formData = new FormData();
    formData.append('file', file);
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
    const data={
      lang: this.languageService.getLanguage(),
      image: photo,
    };
    console.log('data :   '+JSON.stringify(data))
    this.generalService
      .uploadImage(photo)
      .subscribe((res: any) => {
        console.log('image upload res :' + JSON.stringify(res));
      });
  }

  attachProductImage() {}

  addProduct() {}
}
