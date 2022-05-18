import { GeneralResponse, GeneralSectionResponse, UserData } from './general';

export interface SectionResponse extends GeneralResponse {
  data: GeneralSectionResponse[];
}

export interface SectionProductsData extends UserData {
  section_id: number;
  title?: string;
}

export interface SectionProductsResponse extends GeneralResponse {
  data: GeneralSectionResponse[];
}

export interface ProductData extends UserData {
  service_id: number;
}

export interface ProductResponse extends GeneralResponse {
  data: GeneralSectionResponse;
}

export interface CartData extends UserData {
  cart_id: number;
  count: number;
}
