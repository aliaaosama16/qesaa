import { UserData, GeneralResponse } from './general';

export interface ArticalsData extends UserData {
  type: ArticalType;
}

export interface ArticalsDataResponse extends GeneralResponse {
  data: Artical[];
}

export interface Artical {
  id: number;
  title: string;
  short_desc: string;
  desc: string;
  date: string;
  image: string;
  video: string;
}

export enum ArticalType {
  services = 'services',
  news = 'news ',
  projects = 'projects',
  photos = 'photos',
  videos = 'videos',
}
