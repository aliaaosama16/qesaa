import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralResponse, ImageInfo } from 'src/app/models/general';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private httpclient: HttpClient) {}

  uploadImage(data: ImageInfo): Observable<GeneralResponse> {
    // upload-image
console.log('upload :    '+  JSON.stringify(data))
    return this.httpclient.post<GeneralResponse>(
      `${environment.BASE_URL}upload-image`,
      data
    );
  }
}
