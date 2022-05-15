import { GeneralResponse, UserData } from './general';

export interface StaticPageData extends UserData {
  title: string;
}

export interface StaticPageResponse extends GeneralResponse {
  notification_count: number;
  data: StaticPageDataResponse;
}

export interface StaticPageDataResponse {
  id: string;
  title: string;
  desc: string;
  image: string;
}
