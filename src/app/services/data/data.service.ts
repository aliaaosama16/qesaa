import { StaticPageTitle } from './../../models/staticPage';
import { StaticPageResponse } from 'src/app/models/staticPage';
import { Injectable } from '@angular/core';
import { PageData } from 'src/app/models/pageData';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserData } from 'src/app/models/general';
import { Observable } from 'rxjs';
import { AppData,  } from '../../models/data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  pageData: PageData;
  constructor(private httpclient:HttpClient) {}

  setPageData(title: StaticPageTitle,image?:string,  content?: string) {
    this.pageData = { title: title, image: title, content: content };
  }

  getPageData() {
    return this.pageData;
  }

  appData(data: UserData): Observable<AppData> {
    return this.httpclient.post<AppData>(
      `${environment.BASE_URL}app-data`,
      data
    );
  }
}
