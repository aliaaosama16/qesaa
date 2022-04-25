export interface GeneralResponse {
    key: number;
    msg: string;
    show_image: boolean;
    notification_count?: number;
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
  
  export interface AuthDataResponse {
    id: number;
    user_type: string;
    first_name: string;
    email: string;
    phone: string;
    api_token: string;
    is_active: boolean;
    is_blocked: boolean;
    is_confirmed: boolean;
    lang: string;
    avatar: string;
  }