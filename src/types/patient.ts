

export interface PatientType {
  patient_id: string
  medical_record_number: string;
  is_baby: number
  name_prefix: number
  patient_name: string
  birthdate: string
  birthplace: string
  birth_time: string
  gender: number
  id_card_number: string
  blood_group: string
  job: string
  mother_name: string
  phone_number: string
  other_phone_number: string
  education: number
  marital: number
  other_id_card_number: string
  address: string
  province_code: number
  city_code: number
  district_code: number
  zip_code: number
  village_code: number
  rt: string
  rw: string
  is_same_domicile: string
  domicile_address: string
  domicile_province_code: number
  domicile_city_code: number
  domicile_district_code: number
  domicile_zip_code: number
  domicile_village_code: number
  domicile_rt: string
  domicile_rw: string
  payment_method: number
  payment_method_other: string
  general_consent: number
}
export interface PatientTypeForm extends PatientType {
  province_string: string;
  city_string: string;
  district_string: string;
  village_string: string;
  domicile_province_string: string;
  domicile_city_string: string;
  domicile_district_string: string;
  domicile_village_string: string;
  gender_string: string;
  education_string: string;
  marital_string: string;
  payment_method_string: string;
}