import {
  GeneralResponse,
  GeneralSectionResponse,
} from 'src/app/models/general';
export interface AppDataResponse extends GeneralResponse {
  data: GeneralSectionResponse[];
  order_times: GeneralSectionResponse[];
  our_location: GeneralSectionResponse[];
}
