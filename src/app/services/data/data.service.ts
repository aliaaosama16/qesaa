import { Injectable } from '@angular/core';
import { PageData } from 'src/app/models/pageData';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  pageData: PageData;
  constructor() {}

  setPageData(title: string,image?:string,  content?: string) {
    this.pageData = { title: title, image: title, content: content };
  }

  getPageData() {
    return this.pageData;
  }
}
