import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CitysData,
  CountryData,
  GeneralResponse,
  GeneralSectionResponse,
  ImageInfo,
  UserData,
} from 'src/app/models/general';
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

  // data(data: UserData): Observable<SectionsResponse> {
  //   return this.httpclient.post<SectionsResponse>(
  //     `${environment.BASE_URL}sections`,
  //     data
  //   );
  // }

  getCitiesByCountryID(data: CountryData): Observable<GeneralSectionResponse> {
    return this.httpclient.post<GeneralSectionResponse>(
      `${environment.BASE_URL}cities`,
      data
    );
  }

  // getNeighborhoodsByCityID(data: CitysData): Observable<CountryResponse> {
  //   return this.httpclient.post<CountryResponse>(
  //     `${environment.BASE_URL}neighborhoods`,
  //     data
  //   );
  // }
}
