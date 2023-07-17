

export interface PatientType {
  patient_name: string;
  mr_number: string;
  id_card_number: number | null;
  id_card_number_2: number | null;
  mother_name: string;
  birth_place: string;
  birth_date: Date | string | null;
  birth_hour?: string;
  birth_minute?: string;
  gender: number | null;
  address_1: string;
  address_1_province: string;
  address_1_city: string;
  address_1_district: string;
  address_1_zip: string;
  address_1_subdistrict: string;
  address_1_rt: string;
  address_1_rw: string;
  address_2: string;
  address_2_province: string;
  address_2_city: string;
  address_2_district: string;
  address_2_zip: string;
  address_2_subdistrict: string;
  address_2_rt: string;
  address_2_rw: string;
  phone_1: number;
  phone_2: number;
  education: string;
  occupation: string;
  marital_status: string;
  payment_method: string;
  payment_method_other: string;
  consent: boolean;
}