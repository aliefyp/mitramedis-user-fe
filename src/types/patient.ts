

export interface PatientType {
  is_baby: boolean;
  name_prefix: boolean;
  patient_name: string;
  birthdate: string;
  birthplace: string;
  birth_time: string;
  gender: number;
  id_card_number: string;
  blood_group: string;
  job: string;
  mother_name: string;
  phone_number: string;
  education: number;
  marital: number;
  other_id_card_number: string;
  address: string;
  province_code: number;
  city_code: number;
  district_code: number;
  zip_code: number;
  village_code: number;
  rt: string;
  rw: string;
  is_same_domicile: string;
  domicile_address: string;
  domicile_province_code: number;
  domicile_city_code: number;
  domicile_district_code: number;
  domicile_zip_code: number;
  domicile_village_code: number;
  domicile_rt: string;
  domicile_rw: string;
  payment_method : number;
  payment_method_other : string;
  general_consent: number;
}