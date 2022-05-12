export interface GeneralResponse {
  key: number;
  msg: string;
  show_image?: boolean;
  notification_count?: number;

  whatsapp?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;

  maroof?: string;
  status?: string;
  image?: string;
  app_url?: string;
}

export interface Language {
  lang?: string;
}

export interface UserLocation extends UserData {
  lat: number;
  lng: number;
}

export interface UserData extends Language {
  user_id?: number;
}

export interface GeneralSectionResponse {
  id: string;
  title: string;
  image?: string;
  checked?: boolean;
  url?: string;
  desc?: string;
  lat?: string;
  lng?: string;
}

export interface AuthDataResponse {
  id?: number;
  user_type?: string;
  name: string;
  email?: string;
  phone: string;
  api_token?: string;
  is_active?: boolean;
  is_blocked?: boolean;
  is_confirmed?: boolean;
  lang?: string;
  avatar: string;
}

export interface ImageInfo extends Language {
  image: string;
}
