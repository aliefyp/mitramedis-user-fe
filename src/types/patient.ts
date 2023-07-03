

export interface PatientType {
  patient_name: string;
  mr_number: string;
  id_card_number: number | null;
  mother_name: string;
  birth_place: string;
  birth_date: Date | string | null;
  birth_hour?: string;
  birth_minute?: string;
  gender: number | null;
  religion: string;
  tribe: string;
  address_1: string;
  address_2: string;
  phone_1: number;
  phone_2: number;
  education: string;
  occupation: string;
  marital_status: string;
}