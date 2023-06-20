export interface UserParam {
  userId: string;
  clinicId: string;
  token: string;
}

export interface UserType {
  user_id: string;
  phone_number: number;
  email: string;
  full_name: string;
  id_card_number: number | null;
  gender: number | null;
  image: string | null;
  birth_date: Date | string | null;
  address: string;
  status: number | null;
  type: string | null;
  clinic_id: string;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at: Date | string | null;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: UserType;
}
