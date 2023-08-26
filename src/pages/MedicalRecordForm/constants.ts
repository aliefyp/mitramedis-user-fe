import moment from "moment";
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
  created_date: moment().format('YYYY-MM-DD'),
  created_time: moment().format('HH:mm'),
  with_action: false,
  actions: [],
  bmhp: [],
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

export const OPTIONS_SENSES_LEVEL = [
  { key: 1, label: "Sadar Baik / Alert" },
  { key: 2, label: "Verbal" },
  { key: 3, label: "Pain" },
  { key: 4, label: "Unresponsive" },
  { key: 5, label: "Apatis" },
]

export const OPTIONS_PHYSCOLOGYCAL_STATUS = [
  { key: 1, label: "Tidak ada kelainan" },
  { key: 2, label: "Cemas" },
  { key: 3, label: "Marah" },
  { key: 4, label: "Sedih" },
  { key: 5, label: "Lain-lain" },
]

export const DIAGNOSE_OPTION = [
  { key: 1, label: "Diagnosis Utama / Primer" },
  { key: 2, label: "Diagnosis Tambahan / Sekunder" },
];