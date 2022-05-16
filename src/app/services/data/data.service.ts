import { StaticPageTitle } from './../../models/staticPage';
import { StaticPageResponse } from 'src/app/models/staticPage';
import { Injectable } from '@angular/core';
import { PageData } from 'src/app/models/pageData';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  pageData: PageData;
  constructor() {}

  setPageData(title: StaticPageTitle,image?:string,  content?: string) {
    this.pageData = { title: title, image: title, content: content };
  }

  getPageData() {
    return this.pageData;
  }
}
