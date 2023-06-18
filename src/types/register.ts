export interface RegisterParam {
  email: string;
  password: string;
  phone_number: string;
  full_name: string;
}

interface Data {
  user_id: string;
  clinic_id: any;
  access_token: string;
  expired_at: number;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: Data;
}