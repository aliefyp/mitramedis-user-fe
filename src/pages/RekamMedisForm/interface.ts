export type PhysicalOrgans =
  "note_skin" |
   "note_nails" |
   "note_head" |
   "note_face" |
   "note_eyes" |
   "note_ears" |
   "note_nose" |
   "note_mouth" |
   "note_tooth" |
   "note_neck" |
   "note_throat" |
   "note_tonsils" |
   "note_chest" |
   "note_breast" |
   "note_back" |
   "note_stomach" |
   "note_genital" |
   "note_anus" |
   "note_arms" |
   "note_hands" |
   "note_fingers" |
   "note_hand_nail" |
   "note_hand_joints" |
   "note_upper_limbs" |
   "note_lower_limbs" |
   "note_toes" |
   "note_toe_nails" |
   "note_leg_joints" |
   "note_other";


export type PhysicalConditionNotesType = Record<PhysicalOrgans, string>;

export interface FormAnamnesisType {
  main_complaint: string;
  medical_history_recent: string;
  medical_history_past: string;
  has_allergy_history: boolean;
  note_allergy_history: string;
  has_medical_treatment_history: boolean;
  note_medical_treatment_history: string;
}

export interface FormPhysicalInspectionType extends PhysicalConditionNotesType {
  senses_level: string;
  psychological_state: string;
  height: number;
  weight: number;
  bmi: number;
  blood_pressure_sistole: number;
  blood_pressure_diastole: number;
  spo2: number;
  temperature: number;
  pulse_rate: number;
  respiration_rate: number;
  support_note: string;
}

export interface FormDiagnoseType {
  icd_code: string;
  type: string;
}

export interface FormActionType {
  kie: string;
  consent: boolean;
  officer_name: string;
  created_date: string;
  created_time: string;
  action_name: string;
  action_count: string;
  bmhp_name: string;
  bmhp_count: string;
  with_action: boolean;
}

export interface MedicineType {
  name: string;
  quantity: number;
}

export interface FormPrescriptionType {
  type?: string;
  medicines: MedicineType[];
  qty: string[];
  frequency_count: number;
  frequency_unit: string;
  time: string[];
  time_note: string;
  span: string[];
  span_note: string;
  method: string;
}

export interface FormStatusType {
  status: string;
}

export interface AllFormType {
  1: FormAnamnesisType;
  2: FormPhysicalInspectionType;
  3: FormDiagnoseType[];
  4: FormActionType;
  5: FormPrescriptionType;
  6: FormStatusType;
}