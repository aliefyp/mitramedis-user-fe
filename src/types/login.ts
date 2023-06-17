export interface LoginParam {
  email: string;
  password: string;
}

interface Data {
  user_id: string;
  clinic_id: any;
  access_token: string;
  expired_at: number;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: Data;
}