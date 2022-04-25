import { AuthDataResponse, GeneralResponse, UserData } from './general';

export interface AuthData extends UserData {
  phone?: number;
  password?: string;
  device_id: string;
}

export interface AuthResponse extends GeneralResponse {
  status?: string;
  data?: AuthDataResponse;
}

export enum Status {
  Active = 'active',
  NonActive = 'non-active',
  Blocked = 'blocked',
}