import { FormActionType, FormAnamnesisType, FormPhysicalInspectionType, FormPrescriptionType, FormStatusType } from "./interface";

export const MEDICAL_FORM_STEPS = [
  "Anamnesis",
  "Pemeriksaan Fisik",
  "Diagnosis",
  "KIE & Tindakan",
  "Resep Obat",
  "Status",
  "Billing",
];

export const DEFAULT_STEP_1 = {
  main_complaint: '',
  medical_history_recent: '',
  medical_history_past: '',
  has_allergy_history: false,
  note_allergy_history: '',
  has_medical_treatment_history: false,
  note_medical_treatment_history: '',
} as FormAnamnesisType;

export const DEFAULT_STEP_2 = {
  senses_level: '',
  psychological_state: '',
  height: undefined,
  weight: undefined,
  bmi: undefined,
  blood_pressure_sistole: undefined,
  blood_pressure_diastole: undefined,
  spo2: undefined,
  temperature: undefined,
  pulse_rate: undefined,
  respiration_rate: undefined,
  support_note: '',
} as FormPhysicalInspectionType;


export const DEFAULT_STEP_4 = {
  kie: '',
  consent: false,
  officer_name: '',
  created_date: '',
  created_time: '',
  action_name: '',
  action_count: '',
  bmhp_name: '',
  bmhp_count: '',
  with_action: false,
} as FormActionType;

export const DEFAULT_STEP_5 = {
  medicines: [],
  qty: [],
  frequency_count: undefined,
  frequency_unit: '',
  time: [],
  time_note: '',
  span: [],
  span_note: '',
  method: '',
} as FormPrescriptionType;

export const DEFAULT_STEP_6 = {
  status: '',
} as FormStatusType;