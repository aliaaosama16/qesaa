import { UserData } from './../../models/general';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ProductData,
  ProductResponse,
  SectionProductsData,
  SectionProductsResponse,
  SectionResponse,
} from 'src/app/models/sections';

@Injectable({
  providedIn: 'root',
})
export class SectionsProductsService {
  constructor(private httpclient: HttpClient) {}

  getAllSections(data: UserData): Observable<SectionResponse> {
    return this.httpclient.post<SectionResponse>(
      `${environment.BASE_URL}sections`,
      data
    );
  }

  getSectionByID(
    data: SectionProductsData
  ): Observable<SectionProductsResponse> {
    return this.httpclient.post<SectionProductsResponse>(
      `${environment.BASE_URL}services`,
      data
    );
  }

  showService(data: ProductData): Observable<ProductResponse> {
    return this.httpclient.post<ProductResponse>(
      `${environment.BASE_URL}show-service`,
      data
    );
  }
}
