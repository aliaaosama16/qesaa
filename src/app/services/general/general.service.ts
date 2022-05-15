import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralResponse, ImageInfo } from 'src/app/models/general';
import { LanguageService } from '../language/language.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { UtilitiesService } from '../utilities/utilities.service';
import { Intro } from 'src/app/models/intro';
import { StaticPageData, StaticPageResponse } from 'src/app/models/staticPage';
import { ContactUsData } from 'src/app/models/contactUs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  uploadedImage: string;
  constructor(
    private httpclient: HttpClient,
    private languageService: LanguageService,
    private util: UtilitiesService
  ) {}

  intro(): Observable<Intro> {
    return this.httpclient.get<Intro>(`${environment.BASE_URL}intro`);
  }

  staticPages(data: StaticPageData): Observable<StaticPageResponse> {
    return this.httpclient.post<StaticPageResponse>(
      `${environment.BASE_URL}page`,
      data
    );
  }

  contactUs(data: ContactUsData): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}contact-us`,
      data
    );
  }

  // read taken image then convert it to file ready to upload
  async getImageConverted(image) {
    const data = await Filesystem.readFile({
      path: image.path,
    });
    let blob = this.b64toBlob(data.data);
    const file = new File([blob], 'image.jpg');
    const formData = new FormData();
    formData.append('image', file);
    formData.append('lang', this.languageService.getLanguage());
    console.log('uploaded TakenImage : ' + this.uploadTakenImage(formData));
    this.uploadTakenImage(formData);
  }

  uploadTakenImage(photo) {
    this.uploadedImage = '';
    const data = {
      lang: this.languageService.getLanguage(),
      image: photo,
    };
    console.log('data :   ' + JSON.stringify(data));
    this.util.showLoadingSpinner().then((__) => {
      this.uploadImage(photo).subscribe(
        (data: GeneralResponse) => {
          if (data.key == 1) {
            this.uploadedImage = data.app_url;
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

  // convert base64 image to blob file
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

  uploadImage(data): Observable<GeneralResponse> {
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}upload-image`,
      data
    );
  }
}
