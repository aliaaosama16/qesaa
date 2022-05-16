import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticalsData, ArticalsDataResponse } from 'src/app/models/articals';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private httpclient: HttpClient) {}

  articals(data: ArticalsData): Observable<ArticalsDataResponse> {
    return this.httpclient.post<ArticalsDataResponse>(
      `${environment.BASE_URL}articals`,
      data
    );
  }
}
